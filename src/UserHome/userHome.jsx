/* eslint-disable array-callback-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-template */
/* eslint-disable quote-props */
/* eslint-disable no-undef */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-case-declarations */
/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Avatar,
  IconButton,
  FormControl,
  MenuItem,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import Select from '@mui/material/Select';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LabelRoundedIcon from '@mui/icons-material/LabelRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AirportShuttleRoundedIcon from '@mui/icons-material/AirportShuttleRounded';
import { blueGrey, grey } from '@mui/material/colors';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TailSpin } from 'react-loader-spinner';
import { getMessaging } from 'firebase/messaging';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import { userDataService } from '../service/userData.js';
import { servicesData } from '../service/servicesData.js';
import 'react-toastify/dist/ReactToastify.css';
import { getTokenFn, onMessageListener } from '../firebase.js';
import ToasterNotification from '../Notifications/toasterNotification.jsx';
import SidebarMenu from '../Menu/menu.jsx';
import './userHome.scss';

const LoaderComponent = () => {
  return (
    <div className="loader">
      <TailSpin
        color="#8f0f1e"
        height={50}
        width={100}
        ariaLabel="loading"
      />
    </div>
  );
};

function UserHome() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userDataServObj, getUser, servicesArr, sendNotification, getAllServicesAdmin, loading, getMyNotifications, userNotifList, getTodaysServices, todays } =
    userDataService();
  const { updateServicePropHandler } = servicesData();
  const [userIDLocal, setUserIDLocal] = useState({});

  const [options, setOptions] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [serviceForNotif, setServiceForNotif] = useState('');
  const [servicesRegistered, setServicesRegistered] = useState([]);
  const [optionShow, setOptionShow] = useState('todos');
  const [optionShowCases, setOptionShowCases] = useState('');

  const userLog = Boolean(localStorage.getItem('userLoged'));

  // useEffect(() => {
  //   getUser();
  //   getMyNotifications();
  //   // setOpenToast(true);
  // }, []);

  useEffect(() => {
    console.log('user loged? ', localStorage.getItem('userLoged'));
    if (userLog) {
      getUser();
      getMyNotifications();
    } else {
      navigate('/', { replace: true });
    }
  }, []);

  useEffect(() => {
    if (userDataServObj !== {}) {
      setUserIDLocal(userDataServObj);
    }
  }, [getUser]);

  useEffect(() => {
    getAllServicesAdmin(userIDLocal);
  }, [userIDLocal]);

  useEffect(() => {
    localStorage.setItem('servList', JSON.stringify(servicesArr));
  }, [servicesArr]);

  useEffect(() => {
    getTodaysServices(servicesArr);
  }, [servicesRegistered]);

  useEffect(() => {
    console.log('today services: ', todays);
    if (todays !== []) {
      todays.map((item) => {
        const newUpdate = {
          status: 'recoger_hoy',
        };
        const notificationObj = {
          title: 'Recoger hoy en funeraria',
          body: `NIP de servicio ${item.nip_rastreo}`,
          for: item.user_id,
          service_id: item.id,
          track_id: item.nip_rastreo,
          createdAt: moment().format('LT'),
          dateCreated: moment().format('L'),
          timestamp: new Date().setMilliseconds(100),
        };
        sendNotification(notificationObj);
        switch (item.service) {
          case 'e-ruta':
            return setServiceForNotif('En ruta');
          case 'e-punta':
            return setServiceForNotif('De punta A a punta B');
          case 't-tramites':
            return setServiceForNotif('Con trámites y preparación');
          case 't-translado':
            return setServiceForNotif('Solo traslado');
          default:
            break;
        }
        // Emails for users
        emailjs.send('service_g39knwe', 'template_egqe8zg', {
          direcion_entrega: `${item.direccion_alterna} / ${item.sucursal.direccion_sucursal}`,
          origen: item.origen,
          destino: item.destino,
          servicio: serviceForNotif,
          remitente: item.user_email,
          fecha: item.fecha,
          nip: item.nip_rastreo,
        }, 'PBj_zOlr2lgy2b9sE')
        .then((result) => {
          navigate('/userHome', { replace: true });
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
        // Email for admins
        emailjs.send('service_g39knwe', 'template_d2n14v3', {
          funeraria: item.mortuary_name,
          direcion_entrega: `${item.direccion_alterna} / ${item.sucursal.direccion_sucursal}`,
          origen: item.origen,
          destino: item.destino,
          servicio: serviceForNotif,
          nip: item.nip_rastreo,
        }, 'PBj_zOlr2lgy2b9sE')
        .then((result) => {
          navigate('/userHome', { replace: true });
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
        updateServicePropHandler(newUpdate, item.id);
      });
    }
  }, [loading, servicesArr]);

  useEffect(() => {
    if (optionShow === 'todos') {
      setTimeout(() => {
        if (servicesArr !== []) {
          const filterApply = servicesArr.filter((i) => i.status !== 'entregado');
          setServicesRegistered(filterApply);
        }
      }, 100);
    }
  }, [servicesArr]);

  // useEffect(() => {
    // const d1 = Date.now();
    // const d2 = new Date(d1);
    // const year = d2.getFullYear();
    // const month = String(d2.getMonth() + 1).padStart(2, '0');
    // const day = String(d2.getDate()).padStart(2, '0');
    // const joined = [month, day, year].join('/');
    // console.log('today:', joined);
    // const service_today = servicesRegistered.find(
    //   (i: any) => i.fecha === joined,
    // );
    // if (service_today) {
    //   updateDoc(doc(db, 'services', service_today.id), {
    //     ...service_today,
    //     status: 'recoger_hoy',
    //   });
    //   navigate('/userHome', { replace: true });
    // }
    // console.log('found_today', service_today);
  // }, []);

  useEffect(() => {
    switch (optionShow) {
      case 'todos':
        const filterApply = servicesArr.filter((i) => i.status !== 'entregado');
        return (setServicesRegistered(filterApply), setOptionShowCases('ServiciosRecientes'));
      case 'pendiente_cotizar':
        const filterApply1 = servicesArr.filter(
          (i) => i.status === 'pendiente_cotizar',
          );
        const label = userIDLocal.role !== 'Admin' ? 'EsperandoCotizacion' : 'LBLStatusPendienteCotizar';
        return (setServicesRegistered(filterApply1), setOptionShowCases(label));

      case 'cotizado':
        const filterApply2 = servicesArr.filter(
          (i) => i.status === 'cotizado',
        );
        const label2 = userIDLocal.role !== 'Admin' ? 'SolicitaTuTranslado' : 'LBLStatusCotizado';
        return (setServicesRegistered(filterApply2), setOptionShowCases(label2));

      case 'pendiente_confirmar':
        const filterApply4 = servicesArr.filter(
          (i) => i.status === 'pendiente_confirmar',
        );
        const label4 = userIDLocal.role !== 'Admin' ? 'EsperandoConfirmacion' : 'LBLPteConfirmar';
        return (setServicesRegistered(filterApply4), setOptionShowCases(label4));

      case 'confirmado':
        const filterApply5 = servicesArr.filter(
          (i) => i.status === 'confirmado',
        );
        const label5 = userIDLocal.role !== 'Admin' ? 'LBLStatusConfirmado' : 'LBLStatusConfirmado';
        return (setServicesRegistered(filterApply5), setOptionShowCases(label5));

      case 'recoger_hoy':
        const filterApply6 = servicesArr.filter(
          (i) => i.status === 'recoger_hoy',
        );
        const label6 = userIDLocal.role !== 'Admin' ? 'LBLStatusRecogerHoy' : 'LBLStatusRecogerHoy';
        return (setServicesRegistered(filterApply6), setOptionShowCases(label6));

      case 'transito_usa':
        const filterApply7 = servicesArr.filter(
          (i) => i.status === 'transito_usa',
        );
        const label7 = userIDLocal.role !== 'Admin' ? 'LBLStatusEnTransitoUSA' : 'LBLStatusEnTransitoUSA';
        return (setServicesRegistered(filterApply7), setOptionShowCases(label7));

      case 'transito_mx':
        const filterApply72 = servicesArr.filter(
          (i) => i.status === 'transito_mx',
        );
        const label72 = userIDLocal.role !== 'Admin' ? 'LBLStatusEnTransitoMX' : 'LBLStatusEnTransitoMX';
        return (setServicesRegistered(filterApply72), setOptionShowCases(label72));

      // case 'entregado':
      //   const filterApply8 = servicesArr.filter(
      //     (i) => i.status === 'entregado',
      //   );
      //   const label8 = userIDLocal.role !== 'Admin' ? 'StatusOpt5' : 'StatusOpt5';
      //   return (setServicesRegistered(filterApply8), setOptionShowCases(label8));

      default:
        break;
    }
  }, [optionShow]);

  const Label = (itemService, userRole, cotizacion, cotizacion_ruta, id) => {
    switch (itemService) {
      case 'pendiente_cotizar':
        return (
          <>
            {userRole !== 'Admin' ? (
              <Button
                component={Link}
                to={`/transport/${id}`}
                className="labelNotification n-red"
                state={{ data: servicesArr }}
              >
                {t('EsperandoCotizacion')}
              </Button>
            ) : (
              <p className="labelNotification n-red">
                {t('LBLStatusPendienteCotizar')}
              </p>
            )}
          </>
        );
      case 'cotizado':
        return (
          <>
            {(cotizacion !== '' && userRole === 'Cliente') ||
            (cotizacion_ruta !== '' && userRole === 'Cliente') ? (
              <Button
                component={Link}
                to={`/transport/${id}`}
                className="labelNotification n-blue"
                state={{ data: servicesArr }}
              >
                {t('StatusLBLSolicitarTransporte')}
              </Button>
            ) : (
              <p className="labelNotification n-blue">
                {t('LBLStatusCotizado')}
              </p>
            )}
          </>
        );
      case 'translado_solicitado':
        return (
          <p className="labelNotification n-orange">
            {t('LBLStatusTransladoSolicitado')}
          </p>
        );

      case 'pendiente_confirmar':
        return (
          <>
            {userRole === 'Admin' ? (
              <p className="labelNotification n-orange">
                {t('LBLPteConfirmar')}
              </p>
            ) : (
              <p className="labelNotification n-orange">
                {t('LBLStatusPendienteConfirmar')}
              </p>
            )}
          </>
        );
      case 'confirmado':
        return (
          <p className="labelNotification n-red-custom">
            {t('LBLStatusConfirmado')}
          </p>
        );
      case 'recoger_hoy':
        return (
          <p className="labelNotification n-yellow">
            {t('LBLStatusRecogerHoy')}
          </p>
        );
      case 'transito_usa':
        return (
          <p className="labelNotification n-green-light">
            {t('LBLStatusEnTransito')} USA
          </p>
        );
      case 'transito_mx':
        return (
          <p className="labelNotification n-green">
            {t('LBLStatusEnTransito')} MX
          </p>
        );

      default:
        break;
    }
  };

  const handleChange = (event) => {
    setOptionShow(event.target.value);
    setOptions(!options);
  };

  const handleServiceToShow = (serviceValue) => {
    switch (serviceValue) {
      case 'e-ruta':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <AirportShuttleRoundedIcon className="transitionIcon" />{' '}
            {t('MOption22')}{' '}
          </p>
        );
      case 'e-punta':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <AirportShuttleRoundedIcon className="transitionIcon" />{' '}
            {t('MOption21')}{' '}
          </p>
        );
      case 't-tramites':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <AirportShuttleRoundedIcon className="transitionIcon" />{' '}
            {t('MOption2')}{' '}
          </p>
        );
      case 't-translado':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <AirportShuttleRoundedIcon className="transitionIcon" />{' '}
            {t('MOption1')}{' '}
          </p>
        );

      default:
        break;
    }
  };

  const handleClose = () => {
    setOptions(false);
  };

  const handleOpen = () => {
    setOptions(true);
  };
  const [isTokenFound, setTokenFound] = useState(false);
  const [tokenMessaging, setTokenMessaging] = useState('');
  const [notification, setNotification] = useState({ title: '', body: '' });
  // console.log('token: ', tokenMessaging);

  // const displayMsg = () => {
    //   toast(<div><h3>{notification.title}</h3> <p>{notification.body}</p></div>);
    //   // toast(Msg) would also work
    // };

  // onMessageListener().then((payload) => {
  //   setNotification({ title: payload.notification.title, body: payload.notification.body });
  //   console.log(payload);
  //   // displayMsg();
  // }).catch((err) => console.log('failed: ', err));

  // useEffect(() => {
  //   console.log('notis: ', userNotifList);
  // }, [userNotifList]);

  return (
    <div style={{ background: grey[300] }}>
      <SidebarMenu />
      <div className="mainContainerHome">
        {openToast ? (<ToasterNotification />) : ''}
        <Button
          variant="text"
          style={{
            color: blueGrey[700],
            fontSize: '1.1rem',
            padding: '0 8px',
            marginTop: '0.5rem',
          }}
          onClick={() => setOptions(!options)}
        >
          <h2
            style={{
              margin: 0,
              fontSize: '1.3rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {t(`${optionShowCases}`)} <KeyboardArrowDownRoundedIcon />
          </h2>
        </Button>
        {userIDLocal.role !== 'Admin' ? (
          <FormControl fullWidth>
            <Select
              value={t(`${optionShowCases}`)}
              onChange={handleChange}
              open={options}
              onClose={handleClose}
              onOpen={handleOpen}
              style={{ zIndex: '-1', position: 'relative', top: '-50px' }}
            >
              <MenuItem value="todos">
                {t('ServiciosRecientes')}
              </MenuItem>
              <MenuItem value="pendiente_cotizar">
                {t('EsperandoCotizacion')}
              </MenuItem>
              <MenuItem value="cotizado">
                {t('SolicitaTuTranslado')}
              </MenuItem>
              <MenuItem value="pendiente_confirmar">
                {t('EsperandoConfirmacion')}
              </MenuItem>
              <MenuItem value="confirmado">
                {t('LBLStatusConfirmado')}
              </MenuItem>
              <MenuItem value="recoger_hoy">
                {t('LBLStatusRecogerHoy')}
              </MenuItem>
              <MenuItem value="transito_usa">
                {t('LBLStatusEnTransitoUSA')}
              </MenuItem>
              <MenuItem value="transito_mx">
                {t('LBLStatusEnTransitoMX')}
              </MenuItem>
              {/* <MenuItem value="entregado">{t('StatusOpt5')}</MenuItem> */}
            </Select>
          </FormControl>
        ) : (
          <FormControl fullWidth>
            <Select
              value={t(`${optionShowCases}`)}
              onChange={handleChange}
              open={options}
              onClose={handleClose}
              onOpen={handleOpen}
              style={{ zIndex: '-1', position: 'relative', top: '-50px' }}
            >
              <MenuItem value="todos">
                {t('ServiciosRecientes')}
              </MenuItem>
              <MenuItem value="pendiente_cotizar">
                {t('LBLStatusPendienteCotizar')}
              </MenuItem>
              <MenuItem value="cotizado">
                {t('LBLStatusCotizado')}
              </MenuItem>
              <MenuItem value="pendiente_confirmar">
                {t('LBLPteConfirmar')}
              </MenuItem>
              <MenuItem value="confirmado">
                {t('LBLStatusConfirmado')}
              </MenuItem>
              <MenuItem value="recoger_hoy">
                {t('LBLStatusRecogerHoy')}
              </MenuItem>
              <MenuItem value="transito_usa">
                {t('LBLStatusEnTransitoUSA')}
              </MenuItem>
              <MenuItem value="transito_mx">
                {t('LBLStatusEnTransitoMX')}
              </MenuItem>
              {/* <MenuItem value="entregado">{t('StatusOpt5')}</MenuItem> */}
            </Select>
          </FormControl>
        )}
        {/* <p>No hay servicios agregados recientemente</p> */}
        {/* Agregar la etiqueta del "estatus de la papelería" hasta el Paso 3. Pendiente de confirmar (user) y el Paso 3. Transporte solicitado (admin) */}
        {loading ?
          <LoaderComponent /> : (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} className="listCardsDesktop">
                  {servicesArr === []
              ? 'No services yet'
              : servicesRegistered.map((item) => {
                  return (
                    <Card
                      style={{ display: 'flex' }}
                      className="customCardHome"
                    >
                      {userIDLocal.role !== 'Admin' ? (
                        item.status === 'translado_solicitado' ||
                        item.status === 'pendiente_confirmar' ||
                        item.status === 'confirmado' ||
                        item.status === 'recoger_hoy' ||
                        item.status === 'transito_usa' ||
                        item.status === 'transito_mx' ? (
                          <CardContent
                            className="container"
                            component={Link}
                            to={`/userDetails/${item.id}`}
                            state={{ data: servicesArr }}
                            style={{ color: 'black' }}
                          >
                            <p className="titleCard">
                              {item.origen} - {item.destino}
                            </p>

                            <p>{handleServiceToShow(item.service)}</p>
                            <div className="details">
                              {item.cotizacion !== '' ||
                              item.cotizacion_ruta !== '' ? (
                                <>
                                  <p className="subtitle">
                                    ${item.cotizacion || item.cotizacion_ruta}
                                  </p>
                                  <p>{item.fecha}</p>
                                </>
                              ) : (
                                ''
                              )}
                            </div>
                            {userIDLocal.role !== 'Admin' ? (
                              // Create label component to pass status by props and make it a button only if price is updated
                              Label(
                                item.status,
                                userIDLocal.role,
                                item.cotizacion_ruta,
                                item.cotizacion,
                                item.id,
                              )
                            ) : (
                              <p className="labelNotification n-blue">
                                {item.user_name}
                              </p>
                            )}
                          </CardContent>
                        ) : (
                          <CardContent
                            className="container"
                            component={Link}
                            to={
                              item.nombre_finado === undefined
                                ? `/transport/${item.id}`
                                : `/userDetails/${item.id}`
                              }
                            state={{ data: servicesArr }}
                            style={{ color: 'black' }}
                          >
                            <p className="titleCard">
                              {item.origen} - {item.destino}
                            </p>
                            <p>{handleServiceToShow(item.service)}</p>
                            <div className="details">
                              {item.cotizacion !== '' ||
                              item.cotizacion_ruta !== '' ? (
                                <>
                                  <p className="subtitle">
                                    ${item.cotizacion || item.cotizacion_ruta}
                                  </p>
                                  <p>{item.fecha}</p>
                                </>
                              ) : (
                                ''
                              )}
                            </div>
                            {userIDLocal.role !== 'Admin' ? (
                              // Create label component to pass status by props and make it a button only if price is updated
                              Label(
                                item.status,
                                userIDLocal.role,
                                item.cotizacion_ruta,
                                item.cotizacion,
                                item.id,
                              )
                            ) : (
                              <p className="labelNotification n-blue">
                                {item.user_name}
                              </p>
                            )}
                          </CardContent>
                        )
                      ) : (
                        <CardContent
                          className="container"
                          component={Link}
                          to={`/details/${item.id}`}
                          state={{ data: servicesArr }}
                          style={{ color: 'black' }}
                        >
                          <p className="titleCard">
                            {item.origen} - {item.destino}
                          </p>
                          <p>{handleServiceToShow(item.service)}</p>
                          <p
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              color: '#000',
                            }}
                          >
                            <BusinessRoundedIcon
                              style={{
                                marginRight: '0.3rem',
                                fontSize: '1rem',
                              }}
                            />{' '}
                            {item.mortuary_name}
                          </p>
                          <div className="details">
                            {item.cotizacion !== '' ||
                            item.cotizacion_ruta !== '' ? (
                              <>
                                <p>{item.fecha}</p>
                                <p className="subtitle">
                                  ${item.cotizacion || item.cotizacion_ruta}
                                </p>
                              </>
                            ) : (
                              <i style={{ marginLeft: '0.5rem' }}>
                                Pendiente de cotizar
                              </i>
                            )}
                          </div>
                          {Label(
                            item.status,
                            userIDLocal.role,
                            item.cotizacion_ruta,
                            item.cotizacion,
                            item.id,
                          )}
                          {/* {
                            userIDLocal.role !== 'Admin'
                              ? // Create label component to pass status by props and make it a button only if price is updated
                              : Label(item.status)
                            // <p className="labelNotification n-blue">
                            //   {item.mortuary_name}
                            // </p>
                          } */}
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
                </Grid>
              </Grid>

              {userIDLocal.role !== 'Admin' ? (
                <Avatar variant="square" className="btnAddService">
                  <IconButton component={Link} to={`/addService/${servicesArr.length}`}>
                    <AddRoundedIcon fontSize="large" />
                  </IconButton>
                </Avatar>
              ) : (
                ''
              )}
            </>
          )}
      </div>
    </div>
  );
}
export default UserHome;

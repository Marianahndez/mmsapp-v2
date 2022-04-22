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
import React, { useState, useEffect, useContext } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Avatar,
  IconButton,
  FormControl,
  MenuItem,
  Button,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LabelRoundedIcon from '@mui/icons-material/LabelRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import AirplaneTicketRoundedIcon from '@mui/icons-material/AirplaneTicketRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';
import { blueGrey, grey, lightBlue } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { query, where, onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase.js';
import { userDataContext } from '../context/userData-context.js';
import SidebarMenu from '../Menu/menu';
import './userHome.scss';

function UserHome() {
  const { t } = useTranslation();
  const servicesRef = collection(db, 'services');

  const auxArray = localStorage.getItem('arrServices')!;

  const userLocalS = localStorage.getItem('userData')!;
  const userIDLocal = JSON.parse(userLocalS);

  const [options, setOptions] = useState(false);
  const [value, setValue] = useState('');
  const [servicesRegistered, setServicesRegistered] = useState<any>([]);
  const [optionShow, setOptionShow] = useState('Servicios Recientes');

  console.log('ser: ', JSON.parse(auxArray));
  useEffect(() => {
    if (userIDLocal.role !== 'Admin') {
      const q2 = query(servicesRef, where('user_id', '==', userIDLocal.id));
      const unsub = onSnapshot(q2, (querySnapshot2: any) => {
        const servArr: Array<any> = [];
        querySnapshot2.forEach((docx: any) => {
          const userServices = {
            id: docx.id,
            ...docx.data(),
          };
          servArr.push(userServices);
        });
        localStorage.setItem('arrServices', JSON.stringify(servArr));
        // console.log('services we', servArr);
        // console.log('data we', userData);
      });
    } else if (userIDLocal.role === 'Admin') {
      const q3 = query(servicesRef);
      const unsub = onSnapshot(q3, (querySnapshot3: any) => {
        const servArr: Array<any> = [];
        querySnapshot3.forEach((docx: any) => {
          const userServices = {
            id: docx.id,
            ...docx.data(),
          };
          servArr.push(userServices);
        });
        localStorage.setItem('arrServices', JSON.stringify(servArr));
        console.log('ser we: ', servArr);
      });
    }
    console.log('user: ', userIDLocal);
    if (auxArray !== undefined) {
      setServicesRegistered(JSON.parse(auxArray));
    }
    if (userIDLocal.role !== 'Admin') {
      const q2 = query(servicesRef, where('user_id', '==', userIDLocal.id));
      const unsub = onSnapshot(q2, (querySnapshot2: any) => {
        const servArr: Array<any> = [];
        querySnapshot2.forEach((docx: any) => {
          const userServices = {
            id: docx.id,
            ...docx.data(),
          };
          servArr.push(userServices);
        });
        localStorage.setItem('arrServices', JSON.stringify(servArr));
        setServicesRegistered(servArr);
        // console.log('services we', servArr);
        // console.log('data we', userIDLocal);
      });
    } else if (userIDLocal.role === 'Admin') {
      const q3 = query(servicesRef);
      const unsub = onSnapshot(q3, (querySnapshot3: any) => {
        const servArr: Array<any> = [];
        querySnapshot3.forEach((docx: any) => {
          const userServices = {
            id: docx.id,
            ...docx.data(),
          };
          servArr.push(userServices);
        });
        localStorage.setItem('arrServices', JSON.stringify(servArr));
        setServicesRegistered(servArr);
      });
    }
  }, []);

  useEffect(() => {
    switch (optionShow) {
      case 'Servicios Recientes' || 'Recent Services':
        return setServicesRegistered(JSON.parse(auxArray));
        break;

      case 'Pendiente de cotizar':
        const filterApply1 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'pendiente_cotizar',
        );
        return setServicesRegistered(filterApply1);
        break;
      case 'Pending listing':
        const filterApply11 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'pendiente_cotizar',
        );
        return setServicesRegistered(filterApply11);
        break;

      case 'Esperando cotización':
        const filterApply112 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'pendiente_cotizar',
        );
        return setServicesRegistered(filterApply112);
        break;
      case 'Waiting for quote':
        const filterApply113 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'pendiente_cotizar',
        );
        return setServicesRegistered(filterApply113);
        break;

      case 'Cotizado':
        const filterApply2 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'cotizado',
        );
        return setServicesRegistered(filterApply2);
        break;
      case 'Valued':
        const filterApply21 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'cotizado',
        );
        return setServicesRegistered(filterApply21);
        break;

      case 'Solicita tu traslado':
        const filterApply221 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'cotizado',
        );
        return setServicesRegistered(filterApply221);
        break;
      case 'Request your transfer':
        const filterApply212 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'cotizado',
        );
        return setServicesRegistered(filterApply212);
        break;

      case 'Translado solicitado':
        const filterApply3 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'translado_solicitado',
        );
        return setServicesRegistered(filterApply3);
        break;
      case 'Requested transfer':
        const filterApply31 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'translado_solicitado',
        );
        return setServicesRegistered(filterApply31);
        break;

      case 'Pendiente de confirmar':
        const filterApply4 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'pendiente_confirmar',
        );
        return setServicesRegistered(filterApply4);
        break;
      case 'Pending confirmation':
        const filterApply41 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'pendiente_confirmar',
        );
        return setServicesRegistered(filterApply41);
        break;

      case 'Esperando confirmación':
        const filterApply411 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'pendiente_confirmar',
        );
        return setServicesRegistered(filterApply411);
        break;
      case 'Waiting confirmation':
        const filterApply412 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'pendiente_confirmar',
        );
        return setServicesRegistered(filterApply412);
        break;

      case 'Confirmado':
        const filterApply5 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'confirmado',
        );
        return setServicesRegistered(filterApply5);
        break;
      case 'Confirmed':
        const filterApply51 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'confirmado',
        );
        return setServicesRegistered(filterApply51);
        break;

      case 'Recoger hoy':
        const filterApply6 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'recoger_hoy',
        );
        return setServicesRegistered(filterApply6);
        break;
      case 'Pick up today':
        const filterApply61 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'recoger_hoy',
        );
        return setServicesRegistered(filterApply61);
        break;

      case 'En tránsito':
        const filterApply7 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'transito',
        );
        return setServicesRegistered(filterApply7);
        break;
      case 'In transit':
        const filterApply71 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'transito',
        );
        return setServicesRegistered(filterApply71);
        break;

      case 'Entregado':
        const filterApply8 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'entregado',
        );
        return setServicesRegistered(filterApply8);
        break;
      case 'Delivered':
        const filterApply81 = JSON.parse(auxArray).filter(
          (i: any) => i.status === 'entregado',
        );
        return setServicesRegistered(filterApply81);
        break;

      default:
        return setServicesRegistered(JSON.parse(auxArray));
        break;
    }
  }, [optionShow]);

  const Label = (
    itemService: any,
    userRole: any,
    cotizacion: any,
    cotizacion_ruta: any,
    id: any,
  ) => {
    console.log('user role: ', userRole);
    switch (itemService) {
      case 'pendiente_cotizar':
        return (
          <>
            {userRole !== 'Admin' ? (
              <p className="labelNotification n-red">
                {t('EsperandoCotizacion')}
              </p>
            ) : (
              <p className="labelNotification n-red">
                {t('LBLStatusPendienteCotizar')}
              </p>
            )}
          </>
        );
        break;
      case 'cotizado':
        return (
          <>
            {(cotizacion !== '' && userRole === 'Cliente') ||
            (cotizacion_ruta !== '' && userRole === 'Cliente') ? (
              <Button
                component={Link}
                to={`/transport/${id}`}
                className="labelNotification n-blue"
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
        break;
      case 'translado_solicitado':
        return (
          <p className="labelNotification n-orange">
            {t('LBLStatusTransladoSolicitado')}
          </p>
        );

        break;
      case 'pendiente_confirmar':
        return (
          <p className="labelNotification n-orange">
            {t('LBLStatusPendienteConfirmar')}
          </p>
        );
        break;
      case 'confirmado':
        return (
          <p className="labelNotification n-red-custom">
            {t('LBLStatusConfirmado')}
          </p>
        );
        break;
      case 'recoger_hoy':
        return (
          <p className="labelNotification n-yellow">
            {t('LBLStatusRecogerHoy')}
          </p>
        );
        break;
      case 'transito':
        return (
          <p className="labelNotification n-green">
            {t('LBLStatusEnTransito')}
          </p>
        );
        break;
      case 'entregado':
        return (
          <p className="labelNotification n-purple">
            {t('LBLStatusEntregado')}
          </p>
        );
        break;

      default:
        break;
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setOptionShow(event.target.value);
    setOptions(!options);
  };

  const handleServiceToShow = (serviceValue: any) => {
    switch (serviceValue) {
      case 'e-ruta':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <FlightRoundedIcon className="transitionIcon" /> {t('MOption22')}{' '}
          </p>
        );
        break;
      case 'e-punta':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <FlightRoundedIcon className="transitionIcon" /> {t('MOption21')}{' '}
          </p>
        );
        break;
      case 't-tramites':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <FlightRoundedIcon className="transitionIcon" /> {t('MOption2')}{' '}
          </p>
        );
        break;
      case 't-translado':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <FlightRoundedIcon className="transitionIcon" /> {t('MOption1')}{' '}
          </p>
        );
        break;

      default:
        break;
    }
  };
  const handleStatus = (status: any) => {
    switch (status) {
      case 'pendiente_cotizar':
        return (
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '0.5rem',
              color: '#591919',
            }}
          >
            <LabelRoundedIcon
              style={{ marginRight: '0.3rem', fontSize: '1rem' }}
            />{' '}
            {t('LBLStatusPendienteCotizar')}
          </p>
        );
        break;
      case 'cotizado':
        return (
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '0.5rem',
              color: '#001e3c',
            }}
          >
            <LabelRoundedIcon
              style={{ marginRight: '0.3rem', fontSize: '1rem' }}
            />{' '}
            {t('LBLStatusCotizado')}
          </p>
        );
        break;
      case 'translado_solicitado':
        return (
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '0.5rem',
              color: '#f57c00',
            }}
          >
            <LabelRoundedIcon
              style={{ marginRight: '0.3rem', fontSize: '1rem' }}
            />{' '}
            {t('LBLStatusTransladoSolicitado')}
          </p>
        );
        break;
      case 'pendiente_confirmar':
        return (
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '0.5rem',
              color: '#565656',
            }}
          >
            <LabelRoundedIcon
              style={{ marginRight: '0.3rem', fontSize: '1rem' }}
            />{' '}
            {t('LBLStatusPendienteConfirmar')}
          </p>
        );
        break;
      case 'confirmado':
        return (
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '0.5rem',
              color: '#c62828',
            }}
          >
            <LabelRoundedIcon
              style={{ marginRight: '0.3rem', fontSize: '1rem' }}
            />{' '}
            {t('LBLStatusConfirmado')}
          </p>
        );
        break;
      case 'recoger_hoy':
        return (
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '0.5rem',
              color: '#ffc107',
            }}
          >
            <LabelRoundedIcon
              style={{ marginRight: '0.3rem', fontSize: '1rem' }}
            />{' '}
            {t('LBLStatusRecogerHoy')}
          </p>
        );
        break;
      case 'transito':
        return (
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '0.5rem',
              color: '#4caf50',
            }}
          >
            <LabelRoundedIcon
              style={{ marginRight: '0.3rem', fontSize: '1rem' }}
            />{' '}
            {t('LBLStatusEnTransito')}
          </p>
        );
        break;
      case 'entregado':
        return (
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '0.5rem',
              color: '#512da8',
            }}
          >
            <LabelRoundedIcon
              style={{ marginRight: '0.3rem', fontSize: '1rem' }}
            />{' '}
            {t('LBLStatusEntregado')}
          </p>
        );
        break;
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

  return (
    <div style={{ background: grey[300] }}>
      <SidebarMenu />
      <div className="mainContainer">
        <Button
          variant="text"
          style={{
            color: blueGrey[700],
            fontSize: '1.1rem',
            padding: '0 8px',
            marginTop: '1rem',
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
            {optionShow} <KeyboardArrowDownRoundedIcon />
          </h2>
        </Button>
        {userIDLocal.role !== 'Admin' ? (
          <FormControl fullWidth>
            <Select
              value={optionShow}
              onChange={handleChange}
              open={options}
              onClose={handleClose}
              onOpen={handleOpen}
              style={{ zIndex: '-1', position: 'relative', top: '-50px' }}
            >
              <MenuItem value={t('ServiciosRecientes')}>
                {t('ServiciosRecientes')}
              </MenuItem>
              <MenuItem value={t('EsperandoCotizacion')}>
                {t('EsperandoCotizacion')}
              </MenuItem>
              <MenuItem value={t('SolicitaTuTranslado')}>
                {t('SolicitaTuTranslado')}
              </MenuItem>
              <MenuItem value={t('EsperandoConfirmacion')}>
                {t('EsperandoConfirmacion')}
              </MenuItem>
              <MenuItem value={t('LBLStatusConfirmado')}>
                {t('LBLStatusConfirmado')}
              </MenuItem>
              <MenuItem value={t('LBLStatusRecogerHoy')}>
                {t('LBLStatusRecogerHoy')}
              </MenuItem>
              <MenuItem value={t('LBLStatusEnTransito')}>
                {t('LBLStatusEnTransito')}
              </MenuItem>
              <MenuItem value={t('StatusOpt5')}>{t('StatusOpt5')}</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <FormControl fullWidth>
            <Select
              value={optionShow}
              onChange={handleChange}
              open={options}
              onClose={handleClose}
              onOpen={handleOpen}
              style={{ zIndex: '-1', position: 'relative', top: '-50px' }}
            >
              <MenuItem value={t('ServiciosRecientes')}>
                {t('ServiciosRecientes')}
              </MenuItem>
              <MenuItem value={t('LBLStatusPendienteCotizar')}>
                {t('LBLStatusPendienteCotizar')}
              </MenuItem>
              <MenuItem value={t('LBLStatusCotizado')}>
                {t('LBLStatusCotizado')}
              </MenuItem>
              <MenuItem value={t('LBLStatusPendienteConfirmar')}>
                {t('LBLStatusPendienteConfirmar')}
              </MenuItem>
              <MenuItem value={t('LBLStatusConfirmado')}>
                {t('LBLStatusConfirmado')}
              </MenuItem>
              <MenuItem value={t('LBLStatusRecogerHoy')}>
                {t('LBLStatusRecogerHoy')}
              </MenuItem>
              <MenuItem value={t('LBLStatusEnTransito')}>
                {t('LBLStatusEnTransito')}
              </MenuItem>
              <MenuItem value={t('StatusOpt5')}>{t('StatusOpt5')}</MenuItem>
            </Select>
          </FormControl>
        )}
        {/* <p>No hay servicios agregados recientemente</p> */}

        {/* Agregar la etiqueta del "estatus de la papelería" hasta el Paso 3. Pendiente de confirmar (user) y el Paso 3. Transporte solicitado (admin) */}
        <Grid container spacing={2}>
          <Grid item xs={12} className="listCardsDesktop">
            {servicesRegistered === []
              ? 'No services yet'
              : servicesRegistered.map((item: any) => {
                  return (
                    <Card
                      style={{ display: 'flex' }}
                      className="customCardHome"
                    >
                      {userIDLocal.role !== 'Admin' ? (
                        item.status === 'translado_solicitado' ||
                        item.status === 'pendiente_cotizar' ||
                        item.status === 'pendiente_confirmar' ||
                        item.status === 'confirmado' ||
                        item.status === 'recoger_hoy' ||
                        item.status === 'transito' ||
                        item.status === 'entregado' ? (
                          <CardContent
                            className="container"
                            component={Link}
                            to={`/userDetails/${item.id}`}
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
                              {/* {handleStatus(item.status)} */}
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
                              item.cotizacion !== '' ||
                              item.cotizacion_ruta !== ''
                                ? `/transport/${item.id}`
                                : `/userDetails/${item.id}`
                            }
                            style={{ color: 'black' }}
                          >
                            <p className="titleCard">
                              {item.origen} - {item.destino}
                            </p>
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
                              {/* {handleStatus(item.status)} */}
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
                            {/* {handleStatus(item.status)} */}
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
            <IconButton component={Link} to="/addService">
              <AddRoundedIcon fontSize="large" />
            </IconButton>
          </Avatar>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
export default UserHome;

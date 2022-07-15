/* eslint-disable no-lonely-if */
/* eslint-disable array-callback-return */
/* eslint-disable object-curly-newline */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable operator-linebreak */
/* eslint-disable react/no-array-index-key */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import * as emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { blueGrey, grey } from '@mui/material/colors';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import AirportShuttleRoundedIcon from '@mui/icons-material/AirportShuttleRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import DifferenceRoundedIcon from '@mui/icons-material/DifferenceRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SendIcon from '@mui/icons-material/Send';
import {
 TextField,
 Button,
 Avatar,
 IconButton,
 Dialog,
 DialogActions,
 DialogContent,
 DialogTitle,
 RadioGroup,
 FormLabel,
 FormControlLabel,
 Radio,
 InputLabel,
 Select,
 MenuItem,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import SidebarMenu from '../Menu/menu.jsx';
import { userDataService } from '../service/userData.js';
import { servicesData } from '../service/servicesData.js';
import './tracking.scss';

function Tracking() {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { getUser, userDataServObj, sendNotification } = userDataService();
  const { updateServicePropHandler } = servicesData();
  const [editInfo, setEditInfo] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState({});
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState('correo');
  const [lada, setLada] = useState('usa');
  const [authlistEmail, setAuthListEmail] = useState([]);
  const [familyEmails, setFamilyEmails] = useState([]);
  const [authlistPhone, setAuthListPhone] = useState([]);
  const [serviceForNotif, setServiceForNotif] = useState('');
  // Send sms config
  const [toNum, setTo] = React.useState('');
  const [msg, setMsg] = React.useState('');
  // Send sms config

  const [to, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [html, setHtml] = useState('');
  const [date, setDate] = useState();
  const [showEditDate, setEditDate] = useState(false);

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const onSubmit = (data) => {
    const dateObj = {
      ...data,
    };
    updateServicePropHandler(dateObj, params.id);
    navigate('/userHome', { replace: true });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm({
    // mode: 'onChange',
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
  } = useForm({
    // mode: 'onChange',
  });

  const {
    register: register3,
    handleSubmit: handleSubmit3,
    reset: reset3,
  } = useForm({
    // mode: 'onChange',
  });

  useEffect(() => {
    getUser();
    setTrackingInfo(location.state.data);
    setList(location.state.data.rastreo);
    setAuthListPhone(location.state.data.auth_list_phone ? location.state.data.auth_list_phone : []);
    setAuthListEmail(location.state.data.auth_list_email ? location.state.data.auth_list_email : []);
    const arr = [];
    location.state.data.auth_list_email.map((item) => {
      arr.push(item.email);
      setFamilyEmails(arr);
    });
  }, []);

  const handleServiceToShow = (serviceValue) => {
    switch (serviceValue) {
      case 'e-ruta':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <AirportShuttleRoundedIcon className="transitionIcon" />
            {t('MOption22')}
          </p>
        );
      case 'e-punta':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <AirportShuttleRoundedIcon className="transitionIcon" />
            {t('MOption21')}
          </p>
        );
      case 't-tramites':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <AirportShuttleRoundedIcon className="transitionIcon" />
            {t('MOption2')}
          </p>
        );
      case 't-translado':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <AirportShuttleRoundedIcon className="transitionIcon" />
            {t('MOption1')}
          </p>
        );

      default:
        break;
    }
  };

  const handleEditTracking = (id) => {
    const newList = list.map((item, i) => {
      if (i === id) {
        const updatedItem = {
          ...item,
          edit: !item.edit,
        };

        return updatedItem;
      }

      return item;
    });
    setList(newList);
  };

  const submitEdited = async (dataEdited) => {
    const findEdit = list.map((item, i) => {
      if (item.edit === true) {
        const updatedItem = {
          ...dataEdited,
          edit: false,
          date: moment().format('LLL'),
        };

        return updatedItem;
      }

      return item;
    });
    setList(findEdit);
    const rastreoObjEdited = {
      rastreo: findEdit,
    };
    const notificationObj = {
      title: 'Tracking update',
      body: 'Your service tracking was modified',
      for: trackingInfo.user_id,
      service_id: params.id,
      track_id: trackingInfo.nip_rastreo,
      createdAt: moment().format('LT'),
      dateCreated: moment().format('L'),
      timestamp: new Date().setMilliseconds(100),
    };
    sendNotification(notificationObj);
    await updateServicePropHandler(rastreoObjEdited, params.id);
    reset2({ tracking_info: '' });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOption = (event) => {
    if (option === 'correo') {
      reset3({ phone: '' });
    } else {
      reset3({ email: '' });
    }
    setOption(event.target.value);
  };

  const handleChangeLada = (event) => {
    setLada(event.target.value);
  };

  // Send message disabled until confirm twilio
  // const send = async () => {
  //   // await e.preventDefault();
  //   const res = await fetch('/.netlify/functions/sendMessageNtl', {
  //     method: 'POST',
  //     body: JSON.stringify({ to: toNum, body: msg }),
  //   }).then(async (data) => ({
  //     status: data.status,
  //     body: await data,
  //   })).then(({ status, body }) => {
  //     console.log('Status: ', status);
  //     console.log('Body: ', body);
  //   }).catch((err) => console.log('error: ', err));

  //   // const data = await res.json();
  //   console.log('sending, ', res);

  //   // if (data.success) {
  //   //   await setTo('');
  //   //   reset3({ phone: '', name: '' });
  //   // } else {
  //   //   await setTo('');
  //   //   reset3({ phone: '', name: '' });
  //   // }
  // };

  // Send message disabled until confirm twilio
  // useEffect(() => {
  //   if (toNum !== '' && msg !== '') {
  //     console.log('sending to: ', toNum);
  //     send();
  //   }
  // }, [toNum]);

  useEffect(() => {
    switch (trackingInfo.service) {
      case 'e-ruta':
        return setServiceForNotif('En ruta');
      case 'e-punta':
        return setServiceForNotif('De punta A a punta B');
      case 't-tramites':
        return setServiceForNotif('Con trámites y preparación');
      case 't-translado':
        return setServiceForNotif('Solo translado');
      default:
        break;
    }
  }, [userDataServObj]);

  const onSubmitFamily = async (dataFamily) => {
    if (option === 'correo') {
      const objData = {
        name: dataFamily.name,
        email: dataFamily.email,
      };
      authlistEmail.push(objData);
      const rastreoObjEditedEmail = {
        auth_list_email: authlistEmail,
      };
      emailjs.send('service_9e1ebv5', 'template_fnipooj', { to_name: dataFamily.name, remitente: dataFamily.email, nip: trackingInfo.nip_rastreo }, 'PBj_zOlr2lgy2b9sE')
      .then((result) => {
      console.log(result.text);
      }, (error) => {
      console.log(error.text);
      });
      reset3({ email: '', name: '' });
      await updateServicePropHandler(rastreoObjEditedEmail, params.id);
    } else {
      if (lada === 'usa') {
        const objDataPhone = {
          name: dataFamily.name,
          phone: `1${dataFamily.phone}`,
        };
        authlistPhone.push(objDataPhone);
        const rastreoObjEdited = {
          auth_list_phone: authlistPhone,
        };
        await updateServicePropHandler(rastreoObjEdited, params.id);
        const sendPhone = `+1${dataFamily.phone}`;
        setMsg(`${dataFamily.name} ud esta autorizad@ para rastrear el envio. Click en la siguiente liga (https://www.funeralnip.com/) e ingrese este numero telefonico y su nip de rastreo (${trackingInfo.nip_rastreo})`);
        setTo(sendPhone);
      } else {
        const objDataPhoneMX = {
          name: dataFamily.name,
          phone: `52${dataFamily.phone}`,
        };
        authlistPhone.push(objDataPhoneMX);
        const rastreoObjEditedMX = {
          auth_list_phone: authlistPhone,
        };
        await updateServicePropHandler(rastreoObjEditedMX, params.id);
        const sendPhoneMX = `+52${dataFamily.phone}`;
        setMsg(`${dataFamily.name} ud esta autorizad@ para rastrear el envio. Click en la siguiente liga (https://www.funeralnip.com/) e ingrese este numero telefonico y su nip de rastreo (${trackingInfo.nip_rastreo})`);
        setTo(sendPhoneMX);
      }
    }
    setOpen(false);
  };

  console.log('emails: ', familyEmails);
  const onSubmitNewData = async (dataNewOne) => {
    const trackObj = {
      ...dataNewOne,
      edit: false,
      date: moment().format('LLL'),
    };
    list.push(trackObj);
    const rastreoObj = {
      rastreo: list,
    };
    const notificationObj1 = {
      title: 'New tracking route',
      body: 'Your service has new tracking',
      for: trackingInfo.user_id,
      service_id: params.id,
      track_id: trackingInfo.nip_rastreo,
      createdAt: moment().format('LT'),
      dateCreated: moment().format('L'),
      timestamp: new Date().setMilliseconds(100),
    };
    // if (trackingInfo.auth_list_phone !== []) {
    //   trackingInfo.auth_list_phone.map((item) => {
    //     setMsg(`Actualización de seguimiento del traslado \n

    //     ${dataNewOne.tracking_info} ${moment().format('LLL')}\n
    //     - Servicio: ${serviceForNotif}\n
    //     - Origen: ${trackingInfo.origen}\n
    //     - Destino: ${trackingInfo.destino}\n
    //     - NIP: ${trackingInfo.nip_rastreo}\n
    //     Ir a la App ahora www.funeralnip.com ${trackingInfo.nip_rastreo}`);
    //     setTo(`+${item.phone}`);
    //     // send();
    //   });
    // }
    // if (authlistEmail !== []) {
    //   authlistEmail.map((item) => {
    //     console.log('emails: ', item);
    //     emailjs.send('service_9e1ebv5', 'template_5pt76li', {
    //       nip_rastreo: trackingInfo.nip_rastreo,
    //       tracking: dataNewOne.tracking_info,
    //       date: moment().format('LLL'),
    //       servicio: serviceForNotif,
    //       origen: trackingInfo.origen,
    //       destino: trackingInfo.destino,
    //       remitente: item.email,
    //      }, 'PBj_zOlr2lgy2b9sE')
    //       .then((result) => {
    //       console.log(result.text);
    //       }, (error) => {
    //       console.log(error.text);
    //       });
    //   });
    // }

    emailjs.send('service_9e1ebv5', 'template_5pt76li', {
      nip_rastreo: trackingInfo.nip_rastreo,
      tracking: dataNewOne.tracking_info,
      date: moment().format('LLL'),
      servicio: serviceForNotif,
      origen: trackingInfo.origen,
      destino: trackingInfo.destino,
      remitente: familyEmails,
      }, 'PBj_zOlr2lgy2b9sE')
      .then((result) => {
      console.log(result.text);
      }, (error) => {
      console.log(error.text);
      });
    // Emails for users
    emailjs.send('service_9e1ebv5', 'template_oux3mtj', {
      nip_rastreo: trackingInfo.nip_rastreo,
      tracking: dataNewOne.tracking_info,
      date: moment().format('LLL'),
      servicio: serviceForNotif,
      origen: trackingInfo.origen,
      destino: trackingInfo.destino,
      remitente: trackingInfo.user_email,
     }, 'PBj_zOlr2lgy2b9sE')
      .then((result) => {
      console.log(result.text);
      }, (error) => {
      console.log(error.text);
      });

    // Emails for admin
    emailjs.send('service_9e1ebv5', 'template_4yetyrj', {
      nip_rastreo: trackingInfo.nip_rastreo,
      tracking: dataNewOne.tracking_info,
      admin: userDataServObj.name,
      date: moment().format('LLL'),
      servicio: serviceForNotif,
      origen: trackingInfo.origen,
      destino: trackingInfo.destino,
     }, 'PBj_zOlr2lgy2b9sE')
      .then((result) => {
      console.log(result.text);
      }, (error) => {
      console.log(error.text);
      });
    // setMsg(`Actualización de seguimiento del traslado \n
    //   ${dataNewOne.tracking_info} ${moment().format('LLL')}\n
    //   - Servicio: ${serviceForNotif}\n
    //   - Origen: ${trackingInfo.origen}\n
    //   - Destino: ${trackingInfo.destino}\n
    //   - NIP: ${trackingInfo.nip_rastreo}\n

    //   Ir a la App ahora`);
    //   setTo(`+${userDataServObj.phone}`);
      // send();
    sendNotification(notificationObj1);
    await updateServicePropHandler(rastreoObj, params.id);
    setList(list);
    navigate(`/tracking/${params.id}`, { state: { data: trackingInfo } });
    reset({ tracking_info: '' });
  };

  const Label = (itemService, userRole) => {
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
      case 'cotizado':
        return (
          <>
            {(userRole === 'Cliente') ? (
              <p className="labelNotification n-blue">
                {t('StatusLBLSolicitarTransporte')}
              </p>
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
      case 'entregado':
        return (
          <p className="labelNotification n-purple">
            {t('LBLStatusEntregado')}
          </p>
        );

      default:
        break;
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(trackingInfo.nip_rastreo);
    alert('NIP Copied!');
  };

  return (
    <div style={{ background: grey[300] }}>
      <SidebarMenu />
      <div className="mainContainer">
        <h1
          style={{
            margin: '1rem 0',
            color: blueGrey[700],
            textTransform: 'uppercase',
            fontSize: '1.7rem',
          }}
        >
          {t('Tracking')}
        </h1>

        <div className="nipDetails">
          <div className="borderBottom">
            <span>{trackingInfo.nip_rastreo}</span>{' '}
            <DifferenceRoundedIcon fontSize="large" onClick={copy} />
          </div>
          <hr />
          <div className="tripTo">
            <p>
              <span>{t('from')}</span> {trackingInfo.origen}
            </p>
            <ArrowForwardRoundedIcon />
            <p>
              <span>{t('to')}</span> {trackingInfo.destino}
            </p>
          </div>
        </div>

        <div className="trackingDetails">
          <h3>{t('TrackingDetails')}</h3>
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
                // fontSize: '1rem',
              }}
            />
            {trackingInfo.mortuary_name}
          </p>
          {handleServiceToShow(trackingInfo.service)}
          {trackingInfo.sucursal !== undefined ? (
            <>
              <p style={{ margin: '0.5rem 0 1rem 0' }}>
                {trackingInfo.sucursal.nombre_sucursal ? (
                  <div style={{ display: 'flex' }}>
                    <LocationOnRoundedIcon /> {t('NombreSucursal')}:{' '}
                    {trackingInfo.sucursal.nombre_sucursal}
                  </div>
                ) : (
                  ''
                )}
              </p>
              <p style={{ margin: '0.5rem 0 1rem 0' }}>
                {trackingInfo.sucursal.direccion_sucursal ? (
                  <>
                    {t('Direccion')}: {trackingInfo.sucursal.direccion_sucursal}
                  </>
                ) : (
                  ''
                )}
              </p>
            </>
          ) : (
            <div style={{ display: 'flex' }}>
              <LocationOnRoundedIcon /> {t('DireccionAlterna')}:{' '}
              {trackingInfo.direccion_alterna}
            </div>
          )}
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <CalendarMonthRoundedIcon /> {t('FechaRecoleccion')}: {trackingInfo.fecha}
          </p>
          {(userDataServObj.role !== 'Admin' || (trackingInfo.arrivalDate && !showEditDate)) ? (
            <>
              <h4>{t('FechaDestino')}</h4>
              <p style={{ display: 'flex', alignItems: 'center' }}>
                <CalendarMonthRoundedIcon /> {trackingInfo.arrivalDate ? trackingInfo.arrivalDate : `${t('NotDefinedYet')}`}
              </p>
              {userDataServObj.role === 'Admin' ? (
                <IconButton
                  onClick={() => setEditDate(true)}
                  className="updateDate"
                >
                  <EditRoundedIcon fontSize="small" />
                </IconButton>
              ) : ('')}
            </>
          ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <h4>{t('FechaDestino')}</h4>
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <MobileDatePicker
                    label={t('FechaDestino')}
                    inputFormat="MM/dd/yyyy"
                    value={date}
                    onChange={handleChange}
                    renderInput={(paramsx) => (
                      <TextField
                        style={{ marginTop: '2rem' }}
                        {...paramsx}
                        {...register('arrivalDate', { required: true })}
                      />
                    )}
                  />
                </LocalizationProvider>
                <Button
                  variant="contained"
                  type="submit"
                  style={{
                    margin: '3rem auto',
                    borderRadius: '20px',
                    padding: '1rem',
                    width: '85%',
                    background: '#a54131',
                    fontSize: '1rem',
                  }}
                >
                  {t('Guardar')}
                </Button>
              </form>
          )}
          <h4>Family members authorized</h4>
          {authlistPhone.length !== 0 ? (
            <>
              <p>Phones registered</p>
              {authlistPhone.map((item, i) => (
                <ul>
                  <li>{item.name} : {item.phone}</li>
                </ul>
              ))}
            </>
          ) : (
            ''
          )}
          {authlistEmail.length !== 0 ? (
            <>
              <p>Emails registered</p>
              {authlistEmail.map((item, i) => (
                <ul>
                  <li>{item.name} : {item.email}</li>
                </ul>
              ))}
            </>
          ) : (
            ''
          )}
          <div>
            <Button
              onClick={handleClickOpen}
              variant="contained"
              className="btnFamily"
              endIcon={<AddCircleOutlineRoundedIcon />}
            >
              Add family members
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add autorized members</DialogTitle>
              <DialogContent>
                <p style={{ marginTop: '0' }}>
                  Add the authorized family members so they can have access to the tracking.
                </p>
                <form
                  onSubmit={handleSubmit3(onSubmitFamily)}
                  id="form-family"
                >
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={t('Nombre')}
                    type="text"
                    fullWidth
                    variant="outlined"
                    {...register3('name', { required: true })}
                  />
                  <RadioGroup
                    aria-labelledby="sucursales-radio"
                    name="controlled-radio-buttons-group"
                    value={option}
                    onChange={handleOption}
                  >
                    <FormLabel id="sucursales-radio" style={{ marginTop: '0rem' }}>
                      Register by...
                    </FormLabel>
                    <div className="flex">
                      <FormControlLabel
                        value="correo"
                        control={<Radio />}
                        label={t('Email')}
                      />
                      <FormControlLabel
                        value="telefono"
                        disabled
                        control={<Radio />}
                        label={t('Telefono')}
                      />
                    </div>
                  </RadioGroup>
                  {option === 'correo' ? (
                    <TextField
                      autoFocus
                      margin="dense"
                      id="email"
                      label={t('Email')}
                      type="email"
                      fullWidth
                      variant="outlined"
                      {...register3('email', { required: true })}
                    />
                  ) : (
                    <div className="inputPhone">
                      <Select
                        labelId="demo-simple-select-label"
                        defaultValue={lada}
                        onChange={handleChangeLada}
                        label="Lada"
                        variant="standard"
                      >
                        <MenuItem key={1} value="usa">
                          US (+1)
                        </MenuItem>
                        <MenuItem key={2} value="mx">
                          MX (+52)
                        </MenuItem>
                      </Select>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label={t('Telefono')}
                        type="number"
                        fullWidth
                        variant="standard"
                        {...register3('phone', { required: true })}
                        className="noMargin"
                      />
                    </div>
                  )}
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button form="form-family" type="submit">Add</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <div>
          {/* <h3>Ajuste de rastreo</h3> */}
          {userDataServObj.role === 'Admin' ? (
            <div>
              <h4 style={{ margin: '2rem 0 -1rem 0' }}>Update tracking</h4>
              <form
                onSubmit={handleSubmit(onSubmitNewData)}
                id="hook-form-data"
                className="formTransport"
              >
                <TextField
                  {...register('tracking_info', { required: true })}
                  label={t('TrackingAdd')}
                  type="text"
                  variant="outlined"
                  style={{ marginTop: '2rem', width: '100%' }}
                />
                <Button
                  form="hook-form-data"
                  type="submit"
                  variant="contained"
                  className="btnSendTransport"
                  endIcon={<SendIcon />}
                >
                  {t('Actualizar')}
                </Button>
              </form>
            </div>
          ) : (
            ''
            // { trackingList }
          )}
        </div>
        <div className="trackingMainArea">
          <h3>{t('ServiceStatus')}</h3>
          {Label(trackingInfo.status, userDataServObj.role)}
          <h3>{t('TrackingStatus')}</h3>
          {list.length !== 1
            ? list.map((item, i) => (
                <div className={i === 0 ? 'dnone' : 'flex trackingDetail'} key={i}>
                  {!item.edit ? (
                    <>
                      <span>
                        <Avatar>
                          <ArrowForwardRoundedIcon />
                        </Avatar>
                        <span className="poste" />
                      </span>
                      {userDataServObj.role === 'Admin' ? <p onClick={() => handleEditTracking(i)}><span>{item.date}</span> {item.tracking_info}</p> : <p><span>{item.date}</span> {item.tracking_info}</p>}
                    </>
                    ) : (
                      <form
                        onSubmit={handleSubmit2(submitEdited)}
                        id="form-edit"
                        className="formTransport"
                      >
                        <TextField
                          {...register2('tracking_info', { required: true })}
                          label={t('TrackingUpdate')}
                          type="text"
                          variant="outlined"
                          style={{ marginTop: '2rem', width: '100%' }}
                        />
                        <IconButton
                          type="submit"
                          form="form-edit"
                          className="updateTrack"
                        >
                          <CheckRoundedIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleEditTracking(i)}
                          className="cancelTrack"
                        >
                          <CloseRoundedIcon fontSize="small" />
                        </IconButton>
                      </form>
                  )}
                </div>
              ))
            : 'No recods yet'}
        </div>
      </div>
    </div>
  );
}
export default Tracking;

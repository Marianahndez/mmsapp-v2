/* eslint-disable array-callback-return */
/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import * as emailjs from 'emailjs-com';
import { grey, blueGrey } from '@mui/material/colors';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import AirportShuttleRoundedIcon from '@mui/icons-material/AirportShuttleRounded';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import {
  Grid,
  TextField,
  InputAdornment,
  Button,
  MenuItem,
  FormHelperText,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  Avatar,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from '@mui/material';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import MapSharpIcon from '@mui/icons-material/MapSharp';
import SendIcon from '@mui/icons-material/Send';
// import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { servicesData } from '../service/servicesData.js';
import { userDataService } from '../service/userData.js';
import SidebarMenu from '../Menu/menu.jsx';
import './details.scss';

function SimpleDialog({ onClose, selectedValue, open, title }) {
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
        {title}{' '}
        <a
          href={selectedValue}
          target="_blank"
          rel="noreferrer"
          style={{ color: '#01579b' }}
        >
          <DownloadRoundedIcon />
        </a>
      </DialogTitle>
      <img src={selectedValue} alt={title} />
    </Dialog>
  );
}

function ServiceDetails() {
  const { t } = useTranslation();
  const location = useLocation();
  const { getServiceDetail, service, getUser, userDataServObj, sendNotification } =
    userDataService();
  const { updateServiceHandler, updateServicePropHandler, statusCall } = servicesData();

  const handleStatus = (status) => {
    switch (status) {
      case 'pendiente_cotizar':
        return (
          <p className="labelNotification n-red">
            {t('LBLStatusPendienteCotizar')}
          </p>
        );
      case 'cotizado':
        return (
          <p className="labelNotification n-blue-cotizado">
            {t('LBLStatusCotizado')}
          </p>
        );
      case 'translado_solicitado':
        return (
          <p className="labelNotification n-orange">
            {t('LBLStatusTransladoSolicitado')}
          </p>
        );
      case 'pendiente_confirmar':
        return (
          <p className="labelNotification n-orange">{t('LBLPteConfirmar')}</p>
        );
      case 'confirmado':
        return (
          <p className="labelNotification n-red-confirmed">
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

  const handleService = (data) => {
    switch (data) {
      case 't-translado':
        return (
          <p>
            {t('MTOptions')} - {t('MOption1')}
          </p>
        );
      case 't-tramites':
        return (
          <p>
            {t('MTOptions')} - {t('MOption2')}
          </p>
        );
      case 'e-punta':
        return (
          <p>
            {t('MTOptions2')} - {t('MOption21')}
          </p>
        );
      case 'e-ruta':
        return (
          <p>
            {t('MTOptions2')} - {t('MOption22')}
          </p>
        );
      default:
        break;
    }
  };

  const params = useParams();
  const navigate = useNavigate();
  const [edited, setEdited] = useState(false);
  const [editData, setEditData] = useState(false);
  const [status, setStatus] = useState('');
  const [date, setDate] = useState();

  const [checkedMX, setCheckedMX] = useState(false);
  const [checkedUSA, setCheckedUSA] = useState(false);
  const [onTransit, setOnTransit] = useState('');
  const [msg, setMsg] = useState('');
  const [msgFamily, setMsgFamily] = useState('');
  const [toNum, setToNum] = useState('');
  const [serviceForNotif, setServiceForNotif] = useState('');
  const [familiesPhones, setFamiliesPhones] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    // defaultValues: edit,
  });

  const handleChange = (newValue) => {
    setDate(newValue);
  };
  const [alignment, setAlignment] = useState('MX');
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const [formEdit, setFormEdit] = useState(false);
  const [hasService, setHasService] = useState(false);

  const [valueTime, setValueTime] = useState(
    new Date('2018-01-01T00:00:00.000Z'),
  );
  const [valueTime2, setValueTime2] = useState(
    new Date('2018-01-01T00:00:00.000Z'),
  );
  const [ataud, setAtaud] = useState('');
  const [direccionEntrega, setDireccionEntrega] = useState('');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log('phone = ', userDataServObj);
    console.log('family phones = ', familiesPhones);

    switch (service.service) {
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

  useEffect(() => {
    getServiceDetail(location.state.data, params.id);
  }, []);

  useEffect(() => {
    const defValues = {};
    reset({ ...defValues, ...service });
  }, [formEdit]);

  useEffect(() => {
    console.log('ser: ', service);
    console.log('phone = ', service.user_phone);
    setToNum(`+${service.user_phone}`);
    setAtaud(service.ataud);
    if (service !== undefined) {
      setHasService(true);
    }
  }, [service]);

  useEffect(() => {
    const listphones = [];
    if (hasService) {
      if (service.direcion_entrega !== '') {
        setDireccionEntrega(service.direcion_entrega);
      } else {
        setDireccionEntrega(service.sucursal.direccion_sucursal);
      }
      if (service.auth_list_email.length !== 0) {
        service.auth_list_email.map((item) => {
          listphones.push(item.email);
          setFamiliesPhones(listphones);
        });
      }
    }
  }, [hasService]);

  const updateDate = (data) => {
    updateServiceHandler(data, service, params.id);
  };

  const handleEdit = (todo) => {
    // setMsg(`Tu cotización esta lista y ya puedes solicitar el transporte.\n
    //   - Servicio: ${serviceForNotif}\n
    //   - Origen: ${service.origen}\n
    //   - Destino: ${service.destino}\n
    //   - Fecha de recolección: ${service.fecha}\n
    //   - NIP: ${service.nip_rastreo}\n
    //   Ir a la App ahora`);
      // Email para director funerario
      emailjs.send('service_9e1ebv5', 'template_gazhjwo', {
        funeraria: service.mortuary_name,
        origen: service.origen,
        destino: service.destino,
        servicio: serviceForNotif,
        remitente: service.user_email,
        fecha_recoleccion: service.fecha,
        nip: service.nip_rastreo,
      }, 'PBj_zOlr2lgy2b9sE')
      .then((result) => {
        navigate('/userHome', { replace: true });
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    const editObject = {
      cotizacion: `${todo.cotizacion} ${alignment}`,
      status: 'cotizado',
    };
    const notificationObj = {
      title: 'Cotización lista',
      body: `Ya puedes solicitar tu transporte para el servicio con NIP ${service.nip_rastreo}`,
      for: service.user_id,
      service_id: params.id,
      track_id: service.nip_rastreo,
      createdAt: moment().format('LT'),
      dateCreated: moment().format('L'),
      timestamp: new Date().setMilliseconds(100),
    };
    sendNotification(notificationObj);
    updateServicePropHandler(editObject, params.id);
  };

  const handleConfirmarTranslado = () => {
    // setMsg(`Tu transporte ya fue confirmado.\n
    //   - Servicio: ${serviceForNotif}\n
    //   - Origen: ${service.origen}\n
    //   - Destino: ${service.destino}\n
    //   - Fecha de recolección: ${service.fecha}\n
    //   - NIP: ${service.nip_rastreo}\n
    //   Ir a la App ahora`);
    emailjs.send('service_9e1ebv5', 'template_xizuaxd', {
      direcion_entrega: `${direccionEntrega}`,
      origen: service.origen,
      destino: service.destino,
      servicio: serviceForNotif,
      remitente: service.user_email,
      fecha: service.fecha,
      nip: service.nip_rastreo,
    }, 'PBj_zOlr2lgy2b9sE')
    .then((result) => {
      navigate('/userHome', { replace: true });
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
    const updateObj = {
      status: 'confirmado',
    };
    const notificationObj3 = {
      title: 'Servicio confirmado',
      body: `Tu transporte ya fue confirmado (NIP: ${service.nip_rastreo})`,
      for: service.user_id,
      service_id: params.id,
      track_id: service.nip_rastreo,
      createdAt: moment().format('LT'),
      dateCreated: moment().format('L'),
      timestamp: new Date().setMilliseconds(100),
    };
    sendNotification(notificationObj3);
    updateServicePropHandler(updateObj, params.id);
  };

  // const send = async () => {
  //   // await e.preventDefault();
  //   const res = await fetch('/api/sendMessage', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ to: toNum, body: msg }),
  //   });

  //   const data = await res.json();
  //   console.log('sending, ', data);

  //   if (data.success) {
  //     navigate('/userHome', { replace: true });
  //   }
  // };

  // const sendToFamily = async () => {
  //   // await e.preventDefault();
  //   const res = await fetch('/api/sendMultipleMessage', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ numbersToMessage: familiesPhones, body: msgFamily }),
  //   });

  //   const data = await res.json();
  //   console.log('sending, ', data);
  // };

  // useEffect(() => {
  //   if (msg !== '') {
  //     send();
  //   }
  //   if (familiesPhones.length !== 0) {
  //     sendToFamily();
  //   }
  // }, [msg, msgFamily]);

  const onSubmit = (data) => {
    const obj3 = {
      ...data,
      ...service,
      status,
    };
    updateServicePropHandler(obj3, params.id);

    switch (status) {
      case 'confirmado':
        // setMsg(`Tu transporte ya fue confirmado\n

        // - Servicio: ${serviceForNotif}\n
        // - Origen: ${obj3.origen}\n
        // - Destino: ${obj3.destino}\n
        // - Fecha de recolección: ${obj3.fecha}\n
        // - NIP: ${obj3.nip_rastreo}\n
        // Ir a la App ahora`);
        // setMsgFamily(`Tu transporte ya fue confirmado\n

        // - Origen: ${obj3.origen}\n
        // - Destino: ${obj3.destino}\n
        // - Fecha de recolección: ${obj3.fecha}\n
        // - NIP de rastreo: ${obj3.nip_rastreo}\n
        // Para más detalles visita la App www.funeralnip.com, ingresando tu numero ó correo verificado y el NIP de rastreo`);
        const notificationObj3 = {
          title: 'Tu transporte ya fue confirmado',
          body: `NIP de servicio ${obj3.nip_rastreo}`,
          for: service.user_id,
          service_id: params.id,
          track_id: service.nip_rastreo,
          createdAt: moment().format('LT'),
          dateCreated: moment().format('L'),
          timestamp: new Date().setMilliseconds(100),
        };
        // Email for users
        emailjs.send('service_9e1ebv5', 'template_xizuaxd', {
          direcion_entrega: direccionEntrega,
          origen: service.origen,
          destino: service.destino,
          servicio: serviceForNotif,
          remitente: service.user_email,
          fecha: service.fecha,
          nip: service.nip_rastreo,
        }, 'PBj_zOlr2lgy2b9sE')
        .then((result) => {
          navigate('/userHome', { replace: true });
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
        return sendNotification(notificationObj3);
      case 'transito_usa':
        // setMsg(`En tránsito USA\n

        // - Servicio: ${serviceForNotif}\n
        // - Origen: ${obj3.origen}\n
        // - Destino: ${obj3.destino}\n
        // - Fecha de recolección: ${obj3.fecha}\n
        // - NIP: ${obj3.nip_rastreo}\n
        // Ir a la App ahora`);
        // setMsgFamily(`En tránsito USA\n

        // - Origen: ${obj3.origen}\n
        // - Destino: ${obj3.destino}\n
        // - Fecha de recolección: ${obj3.fecha}\n
        // - NIP de rastreo: ${obj3.nip_rastreo}\n
        // Para más detalles visita la App www.funeralnip.com, ingresando tu numero ó correo verificado y el NIP de rastreo`);
        if (service.auth_list_email !== []) {
          service.auth_list_email.map((item) => {
            console.log('emails: ', item);
            emailjs.send('service_9e1ebv5', 'template_rllol2a', {
              nip_rastreo: service.nip_rastreo,
              fecha: moment().format('LLL'),
              servicio: serviceForNotif,
              origen: service.origen,
              direcion_entrega: direccionEntrega,
              destino: service.destino,
              remitente: item.email,
             }, 'PBj_zOlr2lgy2b9sE')
              .then((result) => {
              console.log(result.text);
              }, (error) => {
              console.log(error.text);
              });
          });
        }
        const notificationObj4 = {
          title: 'En tránsito USA',
          body: `NIP de servicio ${obj3.nip_rastreo}`,
          for: service.user_id,
          service_id: params.id,
          track_id: service.nip_rastreo,
          createdAt: moment().format('LT'),
          dateCreated: moment().format('L'),
          timestamp: new Date().setMilliseconds(100),
        };
        // Emails for users
        emailjs.send('service_9e1ebv5', 'template_9k44txb', {
          direcion_entrega: direccionEntrega,
          origen: service.origen,
          destino: service.destino,
          servicio: serviceForNotif,
          remitente: service.user_email,
          fecha: service.fecha,
          nip: service.nip_rastreo,
        }, 'PBj_zOlr2lgy2b9sE')
        .then((result) => {
          navigate('/userHome', { replace: true });
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
        // Email for admins
        emailjs.send('service_9e1ebv5', 'template_4tk97zh', {
          funeraria: service.mortuary_name,
          direcion_entrega: direccionEntrega,
          origen: service.origen,
          destino: service.destino,
          servicio: serviceForNotif,
          nip: service.nip_rastreo,
        }, 'PBj_zOlr2lgy2b9sE')
          .then((result) => {
            navigate('/userHome', { replace: true });
            console.log(result.text);
          }, (error) => {
            console.log(error.text);
          });
        return sendNotification(notificationObj4);
      case 'transito_mx':
        // setMsg(`En tránsito MX\n

        // - Servicio: ${serviceForNotif}\n
        // - Origen: ${obj3.origen}\n
        // - Destino: ${obj3.destino}\n
        // - Fecha de recolección: ${obj3.fecha}\n
        // - NIP: ${obj3.nip_rastreo}\n
        // Ir a la App ahora`);
        // setMsgFamily(`En tránsito MX\n

        // - Origen: ${obj3.origen}\n
        // - Destino: ${obj3.destino}\n
        // - Fecha de recolección: ${obj3.fecha}\n
        // - NIP de rastreo: ${obj3.nip_rastreo}\n
        // Para más detalles visita la App www.funeralnip.com, ingresando tu numero ó correo verificado y el NIP de rastreo`);
        const notificationObj5 = {
          title: 'En tránsito MX',
          body: `NIP de servicio ${obj3.nip_rastreo}`,
          for: service.user_id,
          service_id: params.id,
          track_id: service.nip_rastreo,
          createdAt: moment().format('LT'),
          dateCreated: moment().format('L'),
          timestamp: new Date().setMilliseconds(100),
        };
        if (service.auth_list_email !== []) {
          service.auth_list_email.map((item) => {
            console.log('emails: ', item);
            emailjs.send('service_9e1ebv5', 'template_45z3gdp', {
              nip_rastreo: service.nip_rastreo,
              fecha: moment().format('LLL'),
              servicio: serviceForNotif,
              direcion_entrega: direccionEntrega,
              origen: service.origen,
              destino: service.destino,
              remitente: item.email,
             }, 'PBj_zOlr2lgy2b9sE')
              .then((result) => {
              console.log(result.text);
              }, (error) => {
              console.log(error.text);
              });
          });
        }
        // Emails for users
        emailjs.send('service_9e1ebv5', 'template_r2k7chr', {
          direcion_entrega: direccionEntrega,
          origen: service.origen,
          destino: service.destino,
          servicio: serviceForNotif,
          remitente: service.user_email,
          fecha: service.fecha,
          nip: service.nip_rastreo,
        }, 'PBj_zOlr2lgy2b9sE')
        .then((result) => {
          navigate('/userHome', { replace: true });
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
        // Email for admins
        emailjs.send('service_9e1ebv5', 'template_so3ciaq', {
          funeraria: service.mortuary_name,
          direcion_entrega: direccionEntrega,
          origen: service.origen,
          destino: service.destino,
          servicio: serviceForNotif,
          nip: service.nip_rastreo,
        }, 'PBj_zOlr2lgy2b9sE')
          .then((result) => {
            navigate('/userHome', { replace: true });
            console.log(result.text);
          }, (error) => {
            console.log(error.text);
          });
        return sendNotification(notificationObj5);
      case 'recoger_hoy':
        // setMsg(`Recoger hoy en (...)\n

        // - Servicio: ${serviceForNotif}\n
        // - Origen: ${obj3.origen}\n
        // - Destino: ${obj3.destino}\n
        // - Fecha de recolección: ${obj3.fecha}\n
        // - NIP: ${obj3.nip_rastreo}\n
        // Ir a la App ahora`);
        // setMsgFamily(`Se recoge el día de hoy por la funeraria\n

        // - Origen: ${obj3.origen}\n
        // - Destino: ${obj3.destino}\n
        // - Fecha de recolección: ${obj3.fecha}\n
        // - NIP de rastreo: ${obj3.nip_rastreo}\n
        // Para más detalles visita la App www.funeralnip.com, ingresando tu numero ó correo verificado y el NIP de rastreo`);
        const notificationObj6 = {
          title: 'Recoger hoy en funeraria',
          body: `NIP de servicio ${obj3.nip_rastreo}`,
          for: service.user_id,
          service_id: params.id,
          track_id: service.nip_rastreo,
          createdAt: moment().format('LT'),
          dateCreated: moment().format('L'),
          timestamp: new Date().setMilliseconds(100),
        };
        if (service.auth_list_email !== []) {
          service.auth_list_email.map((item) => {
            console.log('emails: ', item);
            emailjs.send('service_9e1ebv5', 'template_bu44qnq', {
              nip_rastreo: service.nip_rastreo,
              fecha: moment().format('LLL'),
              direcion_entrega: direccionEntrega,
              servicio: serviceForNotif,
              origen: service.origen,
              destino: service.destino,
              remitente: item.email,
             }, 'PBj_zOlr2lgy2b9sE')
              .then((result) => {
              console.log(result.text);
              }, (error) => {
              console.log(error.text);
              });
          });
        }
        // Emails for users
        emailjs.send('service_9e1ebv5', 'template_egqe8zg', {
          direcion_entrega: direccionEntrega,
          origen: service.origen,
          destino: service.destino,
          servicio: serviceForNotif,
          remitente: service.user_email,
          fecha: service.fecha,
          nip: service.nip_rastreo,
        }, 'PBj_zOlr2lgy2b9sE')
        .then((result) => {
          navigate('/userHome', { replace: true });
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
        // Email for admins
        emailjs.send('service_9e1ebv5', 'template_d2n14v3', {
          funeraria: service.mortuary_name,
          direcion_entrega: direccionEntrega,
          origen: service.origen,
          destino: service.destino,
          servicio: serviceForNotif,
          nip: service.nip_rastreo,
        }, 'PBj_zOlr2lgy2b9sE')
          .then((result) => {
            navigate('/userHome', { replace: true });
            console.log(result.text);
          }, (error) => {
            console.log(error.text);
          });
        return sendNotification(notificationObj6);
      case 'entregado':
        // setMsg(`Tu transporte ya fue entregado\n

        // - Servicio: ${serviceForNotif}\n
        // - Origen: ${obj3.origen}\n
        // - Destino: ${obj3.destino}\n
        // - Fecha de recolección: ${obj3.fecha}\n
        // - NIP: ${obj3.nip_rastreo}\n
        // Ir a la App ahora`);
        // setMsgFamily(`Su ser querido ya fue entregado a la funeraria\n

        // - Origen: ${obj3.origen}\n
        // - Destino: ${obj3.destino}\n
        // - Fecha de recolección: ${obj3.fecha}\n
        // - NIP de rastreo: ${obj3.nip_rastreo}\n
        // Para más detalles visita la App www.funeralnip.com, ingresando tu numero ó correo verificado y el NIP de rastreo`);
        const notificationObj7 = {
          title: 'Tu transporte ya fue entregado',
          body: `NIP de servicio ${obj3.nip_rastreo}`,
          for: service.user_id,
          service_id: params.id,
          track_id: service.nip_rastreo,
          createdAt: moment().format('LT'),
          dateCreated: moment().format('L'),
          timestamp: new Date().setMilliseconds(100),
        };
        if (service.auth_list_email !== []) {
          service.auth_list_email.map((item) => {
            console.log('emails: ', item);
            emailjs.send('service_9e1ebv5', 'template_inah5kj', {
              nip_rastreo: service.nip_rastreo,
              direcion_entrega: direccionEntrega,
              fecha: moment().format('LLL'),
              servicio: serviceForNotif,
              origen: service.origen,
              destino: service.destino,
              remitente: item.email,
             }, 'PBj_zOlr2lgy2b9sE')
              .then((result) => {
              console.log(result.text);
              }, (error) => {
              console.log(error.text);
              });
          });
        }
        // Emails for users
        emailjs.send('service_9e1ebv5', 'template_54xdauo', {
          direcion_entrega: direccionEntrega,
          origen: service.origen,
          destino: service.destino,
          servicio: serviceForNotif,
          remitente: service.user_email,
          fecha: service.fecha,
          nip: service.nip_rastreo,
        }, 'PBj_zOlr2lgy2b9sE')
        .then((result) => {
          navigate('/userHome', { replace: true });
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
        // Email for admins
        emailjs.send('service_9e1ebv5', 'template_kj7061j', {
          funeraria: service.mortuary_name,
          direcion_entrega: direccionEntrega,
          origen: service.origen,
          destino: service.destino,
          servicio: serviceForNotif,
          nip: service.nip_rastreo,
        }, 'PBj_zOlr2lgy2b9sE')
          .then((result) => {
            navigate('/userHome', { replace: true });
            console.log(result.text);
          }, (error) => {
            console.log(error.text);
          });
        return sendNotification(notificationObj7);

      default:
        break;
    }
    // Enviar notificacion al usuario de este servicio y a los tokens de la familia
  };
  useEffect(() => {
    if (statusCall) {
      navigate('/userHome', { replace: true });
    }
  }, [statusCall]);

  const onEditSub = (data) => {
    const objEdit = {
      ...service,
      ...data,
      direccion_alterna: data.sucursal.direccion_sucursal,
      sucursal: {},
      ataud,
    };
    const notificationObj4 = {
      title: 'Tu servicio fue modificado',
      body: `NIP de servicio ${service.nip_rastreo}`,
      for: service.user_id,
      service_id: params.id,
      track_id: service.nip_rastreo,
      createdAt: moment().format('LT'),
      dateCreated: moment().format('L'),
      timestamp: new Date().setMilliseconds(100),
    };
    // Emails for users
    emailjs.send('service_9e1ebv5', 'template_rx20lnh', {
      origen: service.origen,
      destino: service.destino,
      servicio: serviceForNotif,
      remitente: service.user_email,
      nip: service.nip_rastreo,
    }, 'PBj_zOlr2lgy2b9sE')
    .then((result) => {
      navigate('/userHome', { replace: true });
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
    // Emails for admins
    emailjs.send('service_9e1ebv5', 'template_rceewvc', {
      origen: service.origen,
      destino: service.destino,
      director_funerario: service.user_name,
      servicio: serviceForNotif,
      remitente: service.user_email,
      nip: service.nip_rastreo,
    }, 'PBj_zOlr2lgy2b9sE')
    .then((result) => {
      navigate('/userHome', { replace: true });
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
    sendNotification(notificationObj4);
    updateServicePropHandler(objEdit, params.id);
  };

  const [sucursalOpt, setSucursalOpt] = useState('');
  const [sucursalName, setSucursalName] = useState('');

  useEffect(() => {
    if (service.cotizacion_ruta !== '' || service.cotizacion !== '') {
      setEdited(true);
    }
  }, []);

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

  const handleSucursal = (event) => {
    setSucursalOpt(event.target.value);
  };

  return (
    <div style={{ background: grey[300], height: '100vh' }}>
      <SidebarMenu />
      <div className="sdMainContainer">
        <h1
          style={{
            margin: '1rem 0 0 0',
            color: blueGrey[700],
            textTransform: 'uppercase',
            fontSize: '1.7rem',
            width: '95%',
          }}
        >
          {t('DetallesServicio')}
        </h1>
        <p style={{ margin: '0.3rem 0 0 0' }}>{t('LBLDetallesServicio')}</p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{ marginTop: '4rem' }}>
              <div style={{ display: 'flex' }}>
                <p
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    margin: 0,
                  }}
                >
                  {service.origen} - {service.destino}
                </p>
                {service.status === 'pendiente_cotizar' ||
                service.status === 'entregado' ? (
                  ''
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => setFormEdit(true)}
                    className="btnUpdateDate floatLeft"
                  >
                    <EditRoundedIcon fontSize="small" />
                  </Button>
                )}
              </div>
              {handleStatus(service.status)}
              {handleServiceToShow(service.service)}
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
                {service.mortuary_name}
              </p>
              {!formEdit ? (
                <>
                  {service.email_funeraria ? (
                    <p
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#000',
                      }}
                    >
                      <EmailRoundedIcon
                        style={{
                          marginRight: '0.3rem',
                          fontSize: '1rem',
                        }}
                      />{' '}
                      {service.email_funeraria}
                    </p>
                  ) : (
                    ''
                  )}
                  <p>{t('LBLRangoHoras')}</p>
                  {service.hora_desde && service.hora_hasta !== undefined ? (
                    <p>
                      {service.hora_desde} {t('Hasta')} {service.hora_hasta}
                    </p>
                  ) : (
                    ''
                  )}

                  {service.cotizacion !== '' ||
                  service.cotizacion_ruta !== '' ? (
                    <p style={{ margin: '0.5rem 0 2rem 0' }}>
                      {service.cotizacion === ''
                        ? ''
                        : `${t('Precio')} $ ${service.cotizacion}`}
                    </p>
                  ) : service.cotizacion_ruta !== '' ? (
                    <p style={{ margin: '0.5rem 0 2rem 0' }}>
                      {t('Precio')} $ {service.cotizacion_ruta}
                    </p>
                  ) : (
                    ''
                  )}
                  {service.sucursal !== undefined ? (
                    <>
                      <p style={{ margin: '0.5rem 0 1rem 0' }}>
                        {service.sucursal.nombre_sucursal ? (
                          <>
                            {t('NombreSucursal')}:{' '}
                            {service.sucursal.nombre_sucursal}
                          </>
                        ) : (
                          ''
                        )}
                      </p>
                      <p style={{ margin: '0.5rem 0 1rem 0' }}>
                        {service.sucursal.direccion_sucursal ? (
                          <>
                            {t('Direccion')}:{' '}
                            {service.sucursal.direccion_sucursal}
                          </>
                        ) : (
                          ''
                        )}
                      </p>
                      <p style={{ margin: '0.5rem 0 1rem 0' }}>
                        {service.sucursal.telefono_sucursal ? (
                          <>
                            {t('Telefono')}:{' '}
                            {service.sucursal.telefono_sucursal}
                          </>
                        ) : (
                          ''
                        )}
                      </p>
                      <p style={{ margin: '0.5rem 0 1rem 0' }}>
                        {service.sucursal.fax_sucursal ? (
                          <>Fax: {service.sucursal.fax_sucursal}</>
                        ) : (
                          ''
                        )}
                      </p>
                    </>
                  ) : (
                    ''
                  )}

                  <p style={{ margin: '1.5rem 0 1rem 0' }}>
                    {service.nombre_finado ? (
                      <>
                        {t('NombreFinado')}: {service.nombre_finado}
                      </>
                    ) : (
                      ''
                    )}
                  </p>
                  <p style={{ margin: '0.5rem 0 1rem 0' }}>
                    {service.direccion_alterna ? (
                      <>
                        {t('DireccionAlterna')}: {service.direccion_alterna},
                      </>
                    ) : (
                      ''
                    )}
                  </p>
                  <p style={{ margin: '0.5rem 0 1rem 0' }}>
                    {service.direcion_entrega ? (
                      <>
                        {t('DireccionEntrega')}: {service.direcion_entrega},
                      </>
                    ) : (
                      ''
                    )}
                    {service.municipio ? ` ${service.municipio},` : ''}
                    {service.estado ? ` ${service.estado}.` : ''}
                  </p>
                  <p style={{ margin: '0.5rem 0 1rem 0' }}>
                    {service.nombre_contacto ? (
                      <>
                        {t('NombreContacto')}: {service.nombre_contacto}
                      </>
                    ) : (
                      ''
                    )}
                  </p>
                  <p style={{ margin: '0.5rem 0 1rem 0' }}>
                    {service.nombre_familiar_recibe ? (
                      <>
                        {t('NombreFamiliarRecibe')}:{' '}
                        {service.nombre_familiar_recibe}
                      </>
                    ) : (
                      ''
                    )}
                  </p>
                  <p style={{ margin: '0.5rem 0 1rem 0' }}>
                    {service.telefono_contacto_autorizado ? (
                      <>
                        {t('TelefonoCAutorizado')}:{' '}
                        {service.telefono_contacto_autorizado}
                      </>
                    ) : (
                      ''
                    )}
                  </p>
                  <p style={{ margin: '0.5rem 0 1rem 0' }}>
                    {service.director_funerario ? (
                      <>
                        {t('FunerariaRecibe')}: {service.director_funerario}
                      </>
                    ) : (
                      ''
                    )}
                  </p>
                  <p style={{ margin: '0.5rem 0 1rem 0' }}>
                    {service.ataud ? (
                      <>
                        {t('TamanoAtaud')}: {service.ataud}
                      </>
                    ) : (
                      ''
                    )}
                  </p>
                  <p style={{ margin: '0.5rem 0 1rem 0' }}>
                    {service.notas ? (
                      <>
                        {t('Notas')}: {service.notas}
                      </>
                    ) : (
                      ''
                    )}
                  </p>
                  {service.doc_acta_defuncion === '' ||
                  service.doc_acta_defuncion === undefined ? (
                    ''
                  ) : (
                    <div className="docBtn">
                      <Button onClick={() => setOpen(true)} variant="contained">
                        {' '}
                        <FilePresentRoundedIcon
                          style={{ marginRight: '0.5rem' }}
                        />{' '}
                        Acta de defunción{' '}
                      </Button>
                      <SimpleDialog
                        selectedValue={service.doc_acta_defuncion}
                        open={open}
                        onClose={() => setOpen(false)}
                        title="Acta de defunción"
                      />
                    </div>
                  )}
                  {service.doc_permiso_transito === '' ||
                  service.doc_permiso_transito === undefined ? (
                    ''
                  ) : (
                    <div className="docBtn">
                      <Button
                        onClick={() => setOpen1(true)}
                        variant="contained"
                      >
                        {' '}
                        <FilePresentRoundedIcon
                          style={{ marginRight: '0.5rem' }}
                        />{' '}
                        Permiso de tránsito{' '}
                      </Button>
                      <SimpleDialog
                        selectedValue={service.doc_permiso_transito}
                        open={open1}
                        onClose={() => setOpen1(false)}
                        title="Permiso de tránsito"
                      />
                    </div>
                  )}
                  {service.doc_constncia_cpreparado === '' ||
                  service.doc_constncia_cpreparado === undefined ? (
                    ''
                  ) : (
                    <div className="docBtn">
                      <Button
                        onClick={() => setOpen2(true)}
                        variant="contained"
                      >
                        {' '}
                        <FilePresentRoundedIcon
                          style={{ marginRight: '0.5rem' }}
                        />{' '}
                        Constancia de cuerpo preparado{' '}
                      </Button>
                      <SimpleDialog
                        selectedValue={service.doc_constncia_cpreparado}
                        open={open2}
                        onClose={() => setOpen2(false)}
                        title="Constancia de cuerpo preparado"
                      />
                    </div>
                  )}
                  {service.doc_visado_consular === '' ||
                  service.doc_visado_consular === undefined ? (
                    ''
                  ) : (
                    <div className="docBtn">
                      <Button
                        onClick={() => setOpen3(true)}
                        variant="contained"
                      >
                        {' '}
                        <FilePresentRoundedIcon
                          style={{ marginRight: '0.5rem' }}
                        />{' '}
                        Visado consular{' '}
                      </Button>
                      <SimpleDialog
                        selectedValue={service.doc_visado_consular}
                        open={open3}
                        onClose={() => setOpen3(false)}
                        title="Visado consular"
                      />
                    </div>
                  )}
                  {service.doc_finalizado === '' ||
                  service.doc_finalizado === undefined ? (
                    ''
                  ) : (
                    <div className="docBtn">
                      <Button
                        onClick={() => setOpen4(true)}
                        variant="contained"
                      >
                        {' '}
                        <FilePresentRoundedIcon
                          style={{ marginRight: '0.5rem' }}
                        />{' '}
                        Documento de finalizado{' '}
                      </Button>
                      <SimpleDialog
                        selectedValue={service.doc_finalizado}
                        open={open4}
                        onClose={() => setOpen4(false)}
                        title="Documento de finalizado"
                      />
                    </div>
                  )}
                  {!editData ? (
                    <div className="editDate">
                      <div style={{ display: 'flex' }}>
                        <h3>{t('Fecha')}</h3>
                        <IconButton
                          aria-label="edit"
                          size="small"
                          onClick={() => setEditData(true)}
                        >
                          <EditRoundedIcon />
                        </IconButton>
                      </div>
                      <div>
                        <p style={{ marginTop: '0' }}>{service.fecha}</p>
                      </div>
                    </div>
                  ) : (
                    <LocalizationProvider dateAdapter={DateAdapter}>
                      <form onSubmit={handleSubmit(updateDate)}>
                        <MobileDatePicker
                          label={t('FechaRecoleccion')}
                          inputFormat="MM/dd/yyyy"
                          value={date}
                          onChange={handleChange}
                          renderInput={(datainput) => (
                            <TextField
                              style={{ marginTop: '2rem', width: '100%' }}
                              {...datainput}
                              {...register('fecha', { required: true })}
                            />
                          )}
                        />
                        <Button
                          type="submit"
                          variant="outlined"
                          className="btnUpdateDate"
                        >
                          {t('ActualizarFecha')}
                        </Button>
                      </form>
                    </LocalizationProvider>
                  )}
                  {service.cotizacion === '' ? (
                    <form
                      onSubmit={handleSubmit(handleEdit)}
                      id="hook-form"
                      style={{ width: '100%', display: 'inline-grid' }}
                    >
                      <p style={{ marginBottom: 0 }}>{t('LBLServicioDesc')}</p>
                      <div className="desktopCotizaion">
                        <TextField
                          {...register('cotizacion')}
                          label={t('Cotizacion')}
                          type="number"
                          variant="outlined"
                          style={{ marginTop: '2rem' }}
                          className="inputCotizacion"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="end">
                                <AttachMoneyRoundedIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <ToggleButtonGroup
                          value={alignment}
                          exclusive
                          onChange={handleAlignment}
                          aria-label="text alignment"
                          className="gropBtns"
                        >
                          <ToggleButton value="MX">MX</ToggleButton>
                          <ToggleButton value="USD">USD</ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                      <Button
                        variant="contained"
                        type="submit"
                        className="btnSendCotizacion"
                      >
                        {t('BtnEnviarCotizacion')}
                      </Button>
                    </form>
                  ) : ('')}
                  {service.status === 'pendiente_confirmar' ? (
                    <>
                      <Button
                        variant="contained"
                        className="btnHalfConfirm"
                        onClick={handleConfirmarTranslado}
                      >
                        {t('Confirmado')}
                      </Button>
                      <Button variant="contained" className="btnHalfCall">
                        <a href={`tel:${service.telefono_funeraria}`}>
                          {t('Llamar')}
                        </a>
                      </Button>
                    </>
                  ) : service.status === 'confirmado' ||
                    service.status === 'cotizado' ||
                    service.status === 'recoger_hoy' ||
                    service.status === 'transito_usa' ||
                    service.status === 'transito_mx' ? (
                    <form
                      style={{ width: '100%' }}
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <TextField
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        label={t('ElegirStatus')}
                        placeholder="Seleccione"
                        select
                        style={{ marginTop: '2rem', width: '100%' }}
                      >
                        {/* <MenuItem value="papeleria-pte">{t('StatusOpt1')}</MenuItem> */}
                        <MenuItem value="confirmado">
                          {t('StatusOpt2')}
                        </MenuItem>
                        <MenuItem value="recoger_hoy">
                          {t('StatusOpt3')}
                        </MenuItem>
                        <MenuItem value="transito_usa">
                          {t('StatusOpt4')}
                        </MenuItem>
                        <MenuItem value="transito_mx">
                          {t('StatusOpt44')}
                        </MenuItem>
                        <MenuItem value="entregado">{t('StatusOpt5')}</MenuItem>
                      </TextField>
                      <Button
                        variant="contained"
                        type="submit"
                        style={{
                          margin: '3rem auto',
                          borderRadius: '20px',
                          padding: '1rem',
                          width: '95%',
                          background: '#01579b',
                          fontSize: '1rem',
                        }}
                      >
                        {t('GuardarStatus')}{' '}
                        <CheckRounded style={{ marginLeft: '1rem' }} />
                      </Button>
                    </form>
                  ) : (
                    ''
                  )}
                </>
              ) : (
                <form
                  onSubmit={handleSubmit(onEditSub)}
                  id="hook-form-data"
                  className="formTransport"
                >
                  {/* <FormLabel
                    id="sucursales-radio"
                    style={{ marginTop: '2rem' }}
                  >
                    {t('LBLRangoHorasDesc')}
                  </FormLabel>
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <MobileDatePicker
                      label={t('HoraDesde')}
                      value={valueTime}
                      onChange={(newValue) => {
                        setValueTime(newValue);
                      }}
                      renderInput={(timeparams) => (
                        <TextField
                          style={{ marginTop: '2rem' }}
                          {...timeparams}
                          {...register('hora_hasta')}
                        />
                      )}
                    />
                    <MobileDatePicker
                      label={t('HoraHasta')}
                      value={valueTime2}
                      onChange={(newValue) => {
                        setValueTime2(newValue);
                      }}
                      renderInput={(timeparams) => (
                        <TextField
                          style={{ marginTop: '2rem' }}
                          {...timeparams}
                          {...register('hora_desde')}
                        />
                      )}
                    />
                  </LocalizationProvider> */}
                  <TextField
                    {...register('sucursal.direccion_sucursal')}
                    label={t('AnotherAddress')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />
                  <TextField
                    {...register('nombre_finado', { required: true })}
                    label={t('NombreFinado')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('nombre_contacto', { required: true })}
                    label={t('NombreContacto')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('telefono_contacto_autorizado', {
                      required: true,
                    })}
                    label={t('TelefonoCAutorizado')}
                    type="number"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('parentesco', { required: true })}
                    label={t('Parentesco')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('nombre_familiar_recibe', { required: true })}
                    label={t('NombreFamiliarRecibe')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('director_funerario', { required: true })}
                    label={t('FunerariaRecibe')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('email_funeraria', { required: true })}
                    label={t('CorreoDeLaFuneraria')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('telefono_funeraria', { required: true })}
                    label={t('TelefonoDeLaFuneraria')}
                    type="number"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('direcion_entrega', { required: true })}
                    label={t('DireccionEntrega')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('municipio', { required: true })}
                    label={t('Municipio')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('estado', { required: true })}
                    label={t('Estado')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />
                  <TextField
                    value={ataud}
                    onChange={(e) => setAtaud(e.target.value)}
                    label={t('TamanoAtaud')}
                    placeholder="Seleccione"
                    select
                    style={{ marginTop: '2rem', width: '100%' }}
                    aria-describedby="my-helper-text"
                  >
                    <MenuItem value={t('TamanoAtaud1')}>
                      {t('TamanoAtaud1')}
                    </MenuItem>
                    <MenuItem value={t('TamanoAtaud2')}>
                      {t('TamanoAtaud2')}
                    </MenuItem>
                    <MenuItem value="Oversize X">Oversize X</MenuItem>
                    <MenuItem value="Oversize 2X">Oversize 2X</MenuItem>
                    <MenuItem value="Oversize 3X">Oversize 3X</MenuItem>
                    <MenuItem value="Oversize 4X">Oversize 4X</MenuItem>
                    <MenuItem value="Combo">Combo</MenuItem>
                  </TextField>
                  <FormHelperText id="my-helper-text">
                    *{t('DatoSensible')}
                  </FormHelperText>
                  <TextField
                    {...register('notas')}
                    label={t('Notas')}
                    type="text"
                    variant="outlined"
                    style={{
                      marginTop: '2rem',
                      width: '100%',
                      marginBottom: '2rem',
                    }}
                  />

                  <Button
                    type="submit"
                    variant="outlined"
                    form="hook-form-data"
                    className="btnSendTransport half2"
                    endIcon={<SendIcon />}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setFormEdit(false)}
                    className="btnUpdateDate half2"
                  >
                    Cancelar
                  </Button>
                </form>
              )}
              {service.status === 'confirmado' ||
              service.status === 'cotizado' ||
              service.status === 'recoger_hoy' ||
              service.status === 'transito_usa' ||
              service.status === 'transito_mx' ||
              service.status === 'entregado' ? (
                <Avatar variant="square" className="btnRouting">
                  <IconButton
                    component={Link}
                    to={`/tracking/${service.id}`}
                    state={{ data: service }}
                  >
                    <MapSharpIcon fontSize="large" />
                  </IconButton>
                </Avatar>
              ) : (
                ''
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default ServiceDetails;

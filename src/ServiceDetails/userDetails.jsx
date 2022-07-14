/* eslint-disable array-callback-return */
/* eslint-disable indent */
/* eslint-disable operator-linebreak */
/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import * as emailjs from 'emailjs-com';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { grey, blueGrey } from '@mui/material/colors';
import {
  Grid,
  IconButton,
  Button,
  TextField,
  MenuItem,
  FormHelperText,
  AccordionSummary,
  Accordion,
  Typography,
  AccordionDetails,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
  DialogTitle,
  Dialog,
} from '@mui/material';
import LabelRoundedIcon from '@mui/icons-material/LabelRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DateAdapter from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import AirportShuttleRoundedIcon from '@mui/icons-material/AirportShuttleRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import CloudDoneRoundedIcon from '@mui/icons-material/CloudDoneRounded';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import moment from 'moment';
import { db, storage } from '../firebase.js';
import { userDataService } from '../service/userData.js';
import { servicesData } from '../service/servicesData.js';
import SidebarMenu from '../Menu/menu.jsx';

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

function UserDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const params = useParams();
  const { getServiceDetail, service, getUser, userDataServObj, sendNotification, adminsIDs, getAdminsIDs, adminsPhones, getAdminsPhones } =
    userDataService();
  const { updateServicePropHandler, statusCall } = servicesData();

  const [valuesInput, setValuesInput] = useState({});

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const [image1, setImage1] = useState(null);
  const [imageName1, setImageName1] = useState('');
  const [imgUrl1, setImgUrl1] = useState('');

  const [image2, setImage2] = useState(null);
  const [imageName2, setImageName2] = useState('');
  const [imgUrl2, setImgUrl2] = useState('');

  const [image3, setImage3] = useState(null);
  const [imageName3, setImageName3] = useState('');
  const [imgUrl3, setImgUrl3] = useState('');

  const [image4, setImage4] = useState(null);
  const [imageName4, setImageName4] = useState('');
  const [imgUrl4, setImgUrl4] = useState('');

  const [imageUrls, setImageUrls] = useState('');
  const [formEdit, setFormEdit] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [ataud, setAtaud] = useState('');
  const [sucursal, setSucursal] = useState([]);
  const [ids, setIDs] = useState([]);
  const [sucursalName, setSucursalName] = useState('');
  const [sucursalOpt, setSucursalOpt] = useState('');
  const [msg, setMsg] = useState('');
  const [serviceForNotif, setServiceForNotif] = useState('');
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  // const [valueTime, setValueTime] = useState<Date | null>(editPost.hora_hasta);
  // const [valueTime2, setValueTime2] = useState<Date | null>(
  //   editPost.hora_desde,
  // );

  useEffect(() => {
    getUser();
    getAdminsIDs();
    getAdminsPhones();
  }, []);

  useEffect(() => {
    getServiceDetail(location.state.data, params.item);
    setSucursal(userDataServObj.sucursales);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    // setValue,
    // formState: { isDirty, isValid },
  } = useForm({
    // mode: 'onChange',
    // defaultValues: service,
  });

  useEffect(() => {
    const defValues = {};
    reset({ ...defValues, ...service });
    // console.log('ser: ', service);
  }, [formEdit]);

  useEffect(() => {
    setAtaud(service.ataud);

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
    console.log('ser: ', service);
  }, [service]);

  // const newList = [];
  // useEffect(() => {
  //   console.log('admins ids: ', adminsIDs);
  //   if (adminsIDs !== []) {
  //     adminsIDs.map((item) => {
  //       if (item !== undefined) {
  //         newList.push(item);
  //         setIDs(newList);
  //       }
  //     });
  //   }
  // }, [adminsIDs]);

  useEffect(() => {
    if (sucursal !== undefined) {
      setSucursalOpt(sucursal.nombre_sucursal);
    }
  }, [sucursal]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSucursal = (event) => {
    setSucursalOpt(event.target.value);
  };

  const handleImgObg = async (e) => {
    console.log('inputFile.current ', e.target.files[0]);
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };

  useEffect(() => {
    const handleUploadImg = async () => {
      if (image !== null) {
        const sotrageRef = ref(storage, `files/${params.item}/${imageName}`);
        const uploadTask = await uploadBytes(sotrageRef, image).then(
          (snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              setImageUrls(url);
            });
          },
        );
        const photoURL = await getDownloadURL(sotrageRef);
        setImgUrl(photoURL);
      }
    };

    handleUploadImg();
  }, [image]);

  const handleImgObg1 = async (e) => {
    console.log('inputFile.current1 ', e.target.files[0]);
    setImage1(e.target.files[0]);
    setImageName1(e.target.files[0].name);
  };

  useEffect(() => {
    const handleUploadImg1 = async () => {
      if (image1 !== null) {
        const sotrageRef = ref(storage, `files/${params.item}/${imageName1}`);
        const uploadTask = await uploadBytes(sotrageRef, image1).then(
          (snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              setImageUrls(url);
            });
          },
        );
        const photoURL = await getDownloadURL(sotrageRef);
        setImgUrl1(photoURL);
      }
    };

    handleUploadImg1();
  }, [image1]);

  const handleImgObg2 = async (e) => {
    console.log('inputFile.current2 ', e.target.files[0]);
    setImage2(e.target.files[0]);
    setImageName2(e.target.files[0].name);
  };

  useEffect(() => {
    const handleUploadImg2 = async () => {
      if (image2 !== null) {
        const sotrageRef = ref(storage, `files/${params.item}/${imageName2}`);
        const uploadTask = await uploadBytes(sotrageRef, image2).then(
          (snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              setImageUrls(url);
            });
          },
        );
        const photoURL = await getDownloadURL(sotrageRef);
        setImgUrl2(photoURL);
      }
    };

    handleUploadImg2();
  }, [image2]);

  const handleImgObg3 = async (e) => {
    console.log('inputFile.current3 ', e.target.files[0]);
    setImage3(e.target.files[0]);
    setImageName3(e.target.files[0].name);
  };

  useEffect(() => {
    const handleUploadImg3 = async () => {
      if (image3 !== null) {
        const sotrageRef = ref(storage, `files/${params.item}/${imageName3}`);
        const uploadTask = await uploadBytes(sotrageRef, image3).then(
          (snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              setImageUrls(url);
            });
          },
        );
        const photoURL = await getDownloadURL(sotrageRef);
        setImgUrl3(photoURL);
      }
    };

    handleUploadImg3();
  }, [image3]);

  const handleImgObg4 = async (e) => {
    console.log('inputFile.current4 ', e.target.files[0]);
    setImage4(e.target.files[0]);
    setImageName4(e.target.files[0].name);
  };

  useEffect(() => {
    const handleUploadImg4 = async () => {
      if (image4 !== null) {
        const sotrageRef = ref(storage, `files/${params.item}/${imageName4}`);
        const uploadTask = await uploadBytes(sotrageRef, image4).then(
          (snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              setImageUrls(url);
            });
          },
        );
        const photoURL = await getDownloadURL(sotrageRef);
        setImgUrl4(photoURL);
      }
    };

    handleUploadImg4();
  }, [image4]);

  // const [branch, setBranch] = useState({
  //   direccion_sucursal: '',
  //   fax_sucursal: '',
  //   nombre_sucursal: '',
  //   telefono_sucursal: '',
  // });

  // useEffect(() => {
  //   if (service.sucursal) {
  //     const branches = userDataServObj.sucursales.map((elemnt) => {
  //       return elemnt;
  //     });
  //     const arrPost = [service];
  //     const findBranch = branch.find(
  //       (i) => i.nombre_sucursal === arrPost[0].nombre_sucursal,
  //     );
  //     setBranch(findBranch);
  //     // console.log('branch?? ', findBranch);
  //     // console.log('branch?? ', service);
  //   } else {
  //     setBranch({
  //       direccion_sucursal: '',
  //       fax_sucursal: '',
  //       nombre_sucursal: '',
  //       telefono_sucursal: '',
  //     });
  //   }
  // }, []);

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

  const handleStatus = (status) => {
    switch (status) {
      case 'pendiente_cotizar':
        return (
          <p className="labelNotification n-red">{t('EsperandoCotizacion')}</p>
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
          <p className="labelNotification n-orange">
            {t('LBLStatusPendienteConfirmar')}
          </p>
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

  // const send = async () => {
  //   // await e.preventDefault();
  //   const phoneList = [];
  //   if (adminsPhones !== []) {
  //     adminsPhones.map((item) => {
  //       if (item !== undefined) {
  //         phoneList.push(`+${item}`);
  //         setIDs(phoneList);
  //       }
  //     });
  //   }

  //   const res = await fetch('/api/sendMultipleMessage', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ numbersToMessage: phoneList, body: msg }),
  //   });

  //   const data = await res.json();
  //   if (data.success === true) {
  //     console.log('sending, ', data);
  //     navigate('/userHome', { replace: true });
  //   }
  // };

  // useEffect(() => {
  //   if (msg !== '') {
  //     send();
  //   }
  // }, [msg]);

  const onSubmit = async () => {
    // setMsg(`Actualización de papelería por MMS\n

    // - Servicio: ${service.service}\n
    // - Origen: ${service.origen}\n
    // - Destino: ${service.destino}\n
    // - NIP: ${service.nip_rastreo}\n

    // Ir a la App ahora`);
    const newObj1 = {
      ...service,
      doc_acta_defuncion: imgUrl,
      doc_permiso_transito: imgUrl1,
      doc_constncia_cpreparado: imgUrl2,
      doc_visado_consular: imgUrl3,
      doc_finalizado: imgUrl4,
      sucursal: {},
    };

    const notificationObj = {
      title: 'Documents added',
      body: 'Some documents has been added',
      for: 'Admin',
      service_id: params.item,
      track_id: service.nip_rastreo,
      createdAt: moment().format('LT'),
      dateCreated: moment().format('L'),
      timestamp: new Date().setMilliseconds(100),
    };
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
    sendNotification(notificationObj);
    await updateServicePropHandler(newObj1, params.item);
  };

  const onEditSub = async (data) => {
    if (sucursalName !== '') {
      resetField('direccion_alterna');
      const newObj1 = {
        ...service,
        ...data,
        sucursal: sucursalName,
        direccion_alterna: '',
        ataud,
      };
      const notificationObj = {
        title: 'Service edited',
        body: 'The service has been modified',
        for: 'Admin',
        service_id: params.item,
        track_id: service.nip_rastreo,
        createdAt: moment().format('LT'),
        dateCreated: moment().format('L'),
        timestamp: new Date().setMilliseconds(100),
      };
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
      sendNotification(notificationObj);
      await updateServicePropHandler(newObj1, params.item);
      navigate('/userHome', { replace: true });
      // setFormEdit(false);
    } else {
      setSucursalName('');
      const newObj2 = {
        ...service,
        ...data,
        sucursal: {},
        direccion_alterna: data.direccion_alterna,
        ataud,
      };
      const notificationObj = {
        title: 'Service edited',
        body: 'The service has been modified',
        for: 'Admin',
        service_id: params.item,
        track_id: service.nip_rastreo,
        createdAt: moment().format('LT'),
        dateCreated: moment().format('L'),
        timestamp: new Date().setMilliseconds(100),
      };
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
      sendNotification(notificationObj);
      await updateServicePropHandler(newObj2, params.item);
      navigate('/userHome', { replace: true });
      // setFormEdit(false);
    }
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
          }}
        >
          {t('DetallesServicio')}
        </h1>
        <p style={{ margin: '0.3rem 0 0 0' }}>{t('LBLDetallesServicio')}</p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{ marginTop: '2.5rem' }}>
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
                service.status === 'cotizado' ||
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
                  {service.hora_desde && service.hora_hasta !== undefined ? (
                    <>
                      <p>{t('LBLRangoHoras')}</p>
                      <p>
                        {service.hora_desde} {t('Hasta')} {service.hora_hasta}
                      </p>
                    </>
                  ) : (
                    ''
                  )}
                  {handleService(service.service)}
                  <div>
                    <p style={{ margin: '0.5rem 0 1rem 0' }}>{service.fecha}</p>
                    <p style={{ margin: '0.5rem 0 1rem 0' }}>
                      {service.direccion_alterna ? (
                        <>
                          {t('SitioRecoleccion')}: {service.direccion_alterna}
                        </>
                      ) : (
                        ''
                      )}
                    </p>
                    <p style={{ margin: '0rem 0 1rem 0' }}>
                      {service.sucursal ? (
                        <>
                          <hr />
                          {t('SitioRecoleccion')} {t('SucursalFuneraria')}: {service.sucursal.nombre_sucursal}
                          <p>{t('Direccion')}: {service.sucursal.direccion_sucursal}</p>
                          <p>{t('Telefono')}: {service.sucursal.telefono_sucursal}</p>
                          <hr />
                        </>
                      ) : (
                        ''
                      )}
                    </p>
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
                    {sucursal !== undefined ? (
                      <>
                        <p style={{ margin: '0.5rem 0 1rem 0' }}>
                          {sucursal.nombre_sucursal !== undefined ? (
                            <>
                              {t('NombreSucursal')}:{' '}
                              {sucursal.nombre_sucursal}
                            </>
                          ) : ''}
                        </p>
                        <p style={{ margin: '0.5rem 0 1rem 0' }}>
                          {sucursal.direccion_sucursal !== undefined ? (
                            <>
                              {t('Direccion')}:{' '}
                              {sucursal.direccion_sucursal}
                            </>
                          ) : ''}
                        </p>
                        <p style={{ margin: '0.5rem 0 1rem 0' }}>
                          {sucursal.telefono_sucursal !== undefined ? (
                            <>
                              {t('Telefono')}: {sucursal.telefono_sucursal}
                            </>
                          ) : (
                            ''
                          )}
                        </p>
                        <p style={{ margin: '0.5rem 0 1rem 0' }}>
                          {sucursal.fax_sucursal !== undefined ? (
                            <>Fax: {sucursal.fax_sucursal}</>
                          ) : (
                            ''
                          )}
                        </p>
                      </>
                    ) : ''}
                    <p style={{ margin: '0.5rem 0 1rem 0' }}>
                      {service.nombre_finado ? (
                        <>
                          {t('NombreFinado')}: {service.nombre_finado}
                        </>
                      ) : (
                        ''
                      )}
                    </p>
                    <p style={{ margin: '0.5rem 0 1rem 0' }}>
                      {service.direcion_entrega ? (
                        <>
                          {t('DireccionEntrega')}: {service.direcion_entrega},{' '}
                          {service.municipio ? service.municipio : ''} ,{' '}
                          {service.estado ? service.estado : ''}
                        </>
                      ) : (
                        ''
                      )}
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
                    <p style={{ margin: '0.5rem 0 3rem 0' }}>
                      {service.director_funerario ? (
                        <>
                          {t('FunerariaRecibe')}: {service.director_funerario}
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
                    {/* here the cutted part */}
                    {service.status === 'entregado' ? (
                      ''
                    ) : (
                      <>
                        {/* Here accordion */}
                        <Accordion
                          expanded={expanded === 'panel1'}
                          onChange={handleChange('panel1')}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <h2>{t('Documents')}</h2>
                          </AccordionSummary>
                          <AccordionDetails>
                            <form
                              onSubmit={handleSubmit(onSubmit)}
                              id="hook-form-data"
                              className="formTransport"
                            >
                              <div style={{ textAlign: 'left' }}>
                                <p style={{ textAlign: 'left' }}>
                                  {t('LBLSubirPapeleria')}
                                </p>
                                <p style={{ textAlign: 'left' }}>
                                  {t('LBLSubirPapeleria2')}
                                </p>
                                <hr />
                                <input
                                  id="icon-button-file"
                                  type="file"
                                  accept="image/*"
                                  style={{ display: 'none' }}
                                  onChange={handleImgObg}
                                />
                                <label htmlFor="icon-button-file">
                                  <IconButton component="span">
                                    <AddPhotoAlternateRoundedIcon fontSize="large" />
                                    <h5>{t('ActaDefuncion')}</h5>
                                  </IconButton>
                                  {image !== null ? (
                                    <p>
                                      {imageName} <CloudDoneRoundedIcon />
                                    </p>
                                  ) : (
                                    ''
                                  )}
                                </label>
                                <hr />
                                <input
                                  id="icon-button-file1"
                                  type="file"
                                  accept="image/*"
                                  style={{ display: 'none' }}
                                  onChange={handleImgObg1}
                                />
                                <label htmlFor="icon-button-file1">
                                  <IconButton component="span">
                                    <AddPhotoAlternateRoundedIcon fontSize="large" />
                                    <h5>{t('PermisoTransito')}</h5>
                                  </IconButton>
                                  {image1 !== null ? (
                                    <p>
                                      {imageName1} <CloudDoneRoundedIcon />
                                    </p>
                                  ) : (
                                    ''
                                  )}
                                </label>
                                <hr />
                                <input
                                  id="icon-button-file2"
                                  type="file"
                                  accept="image/*"
                                  style={{ display: 'none' }}
                                  onChange={handleImgObg2}
                                />
                                <label htmlFor="icon-button-file2">
                                  <IconButton component="span">
                                    <AddPhotoAlternateRoundedIcon fontSize="large" />
                                    <h6 style={{ fontSize: '1.1rem' }}>
                                      {t('ConstanciaCuerpo')}
                                    </h6>
                                  </IconButton>
                                  {image2 !== null ? (
                                    <p>
                                      {imageName2} <CloudDoneRoundedIcon />
                                    </p>
                                  ) : (
                                    ''
                                  )}
                                </label>
                                <hr />
                                <input
                                  id="icon-button-file3"
                                  type="file"
                                  accept="image/*"
                                  style={{ display: 'none' }}
                                  onChange={handleImgObg3}
                                />
                                <label htmlFor="icon-button-file3">
                                  <IconButton component="span">
                                    <AddPhotoAlternateRoundedIcon fontSize="large" />
                                    <h5>{t('VisadoConsular')}</h5>
                                  </IconButton>
                                  {image3 !== null ? (
                                    <p>
                                      {imageName3} <CloudDoneRoundedIcon />
                                    </p>
                                  ) : (
                                    ''
                                  )}
                                </label>
                                <hr />
                                <input
                                  id="icon-button-file4"
                                  type="file"
                                  accept="image/*"
                                  style={{ display: 'none' }}
                                  onChange={handleImgObg4}
                                />
                                <label htmlFor="icon-button-file4">
                                  <IconButton component="span">
                                    <AddPhotoAlternateRoundedIcon fontSize="large" />
                                    <h5>{t('FinishedDocument')}</h5>
                                  </IconButton>
                                  {image4 !== null ? (
                                    <p>
                                      {imageName4} <CloudDoneRoundedIcon />
                                    </p>
                                  ) : (
                                    ''
                                  )}
                                </label>
                              </div>

                              <Button
                                type="submit"
                                variant="contained"
                                form="hook-form-data"
                                className="btnSendTransport"
                                endIcon={<SendIcon />}
                              >
                                Guardar documentos
                              </Button>
                            </form>
                          </AccordionDetails>
                        </Accordion>
                        {service.status === 'confirmado' ||
                        service.status === 'recoger_hoy' ||
                        service.status === 'transito_usa' ||
                        service.status === 'transito_mx' ||
                        service.status === 'entregado' ? (
                          <Accordion
                            expanded={expanded === 'panel2'}
                            onChange={handleChange('panel2')}
                            style={{ marginBottom: '2rem' }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2bh-content"
                              id="panel2bh-header"
                            >
                              <h2>Rastreo</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                Donec placerat, lectus sed mattis semper, neque
                                lectus feugiat lectus.
                              </Typography>
                              <Button
                                component={Link}
                                variant="contained"
                                className="btnSendTransport"
                                startIcon={<LocationOnRoundedIcon />}
                                to={`/tracking/${service.id}`}
                                state={{ data: service }}
                              >
                                Ver rastreo
                              </Button>
                            </AccordionDetails>
                          </Accordion>
                        ) : (
                          ''
                        )}
                      </>
                    )}
                  </div>
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
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileTimePicker
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
                    <MobileTimePicker
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
                  {service.sucursal !== undefined ? (
                    <RadioGroup
                      aria-labelledby="sucursales-radio"
                      name="controlled-radio-buttons-group"
                      value={sucursalOpt}
                      onChange={handleSucursal}
                    >
                      <FormLabel id="sucursales-radio" style={{ marginTop: '2rem' }}>
                        {t('SitioRecoleccion')}
                      </FormLabel>
                      <FormControlLabel
                        value="funeraria"
                        control={<Radio />}
                        // disabled={branches === []}
                        label={t('SucursalFuneraria')}
                      />
                      <FormControlLabel
                        value="otro"
                        control={<Radio />}
                        label={t('AnotherAddress')}
                      />
                    </RadioGroup>
                  ) : ''}
                  {sucursalOpt === 'funeraria' ? (
                    <TextField
                      value={sucursalName}
                      onChange={(e) => setSucursalName(e.target.value)}
                      label={t('SitioRecoleccion')}
                      placeholder="Seleccione"
                      select
                      style={{ marginTop: '2rem', width: '100%' }}
                    >
                      {userDataServObj !== [] ? userDataServObj.sucursales.map((valueBranch) => (
                        <MenuItem value={valueBranch}>
                          {valueBranch.nombre_sucursal}
                        </MenuItem>
                      )) : ''}
                    </TextField>
                  ) : (
                    <TextField
                      {...register('direccion_alterna', { required: true })}
                      label={t('AnotherAddress')}
                      type="text"
                      variant="outlined"
                      style={{ marginTop: '2rem', width: '100%' }}
                    />
                  )}
                  <TextField
                    {...register('nombre_finado')}
                    // name="nombre_finado"
                    label={t('NombreFinado')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('nombre_contacto')}
                    // name="nombre_contacto"
                    label={t('NombreContacto')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('telefono_contacto_autorizado')}
                    // name="telefono_contacto_autorizado"
                    label={t('TelefonoCAutorizado')}
                    type="number"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('parentesco')}
                    // name="parentesco"
                    label={t('Parentesco')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('nombre_familiar_recibe')}
                    // name="nombre_familiar_recibe"
                    label={t('NombreFamiliarRecibe')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('director_funerario')}
                    // name="director_funerario"
                    label={t('FunerariaRecibe')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('email_funeraria')}
                    // name="email_funeraria"
                    label={t('CorreoDeLaFuneraria')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('telefono_funeraria')}
                    // name="telefono_funeraria"
                    label={t('TelefonoDeLaFuneraria')}
                    type="number"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('direcion_entrega')}
                    // name="direcion_entrega"
                    label={t('DireccionEntrega')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('municipio')}
                    // name="municipio"
                    label={t('Municipio')}
                    type="text"
                    variant="outlined"
                    style={{ marginTop: '2rem', width: '100%' }}
                  />

                  <TextField
                    {...register('estado')}
                    // name="estado"
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
                    variant="contained"
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
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default UserDetails;

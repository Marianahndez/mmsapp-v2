/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useEffect } from 'react';
import * as emailjs from 'emailjs-com';
import {
  TextField,
  MenuItem,
  IconButton,
  Grid,
  Button,
  FormHelperText,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { blueGrey, grey } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import CloudDoneRoundedIcon from '@mui/icons-material/CloudDoneRounded';

import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase.js';
import { userDataService } from '../service/userData.js';
import { servicesData } from '../service/servicesData.js';
import SidebarMenu from '../Menu/menu.jsx';
import './transport.scss';

function Transport() {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [item, setItem] = useState({
    cotizacion: '',
    destino: '',
    fecha: '',
    origen: '',
    service: '',
    user_id: '',
    user_name: '',
    cotizacion_ruta: '',
  });

  const [branches, setBranches] = useState([]);
  const [adminsPhonesList, setIDs] = useState([]);
  const [sucursal, setSucursal] = useState('');
  const [msg, setMsg] = useState('');
  const inputFile = useRef('' || null);
  const { getServiceDetail, service, getUser, userDataServObj, sendNotification, adminsPhones, getAdminsPhones } = userDataService();
  const { updateServicePropHandler, statusCall } = servicesData();

  const [userIDLocal, setUserIDLocal] = useState({});
  const [serviceForNotif, setServiceForNotif] = useState('');
  const [direccionEntrega, setDireccionEntrega] = useState('');

  useEffect(() => {
    getUser();
    getAdminsPhones();
  }, []);

  useEffect(() => {
    setUserIDLocal(userDataServObj);
    getServiceDetail(location.state.data, params.id);
  }, []);

  useEffect(() => {
    setItem(service);
  }, [userIDLocal]);

  useEffect(() => {
    if (userIDLocal !== {}) {
      setBranches(userDataServObj.sucursales);
      console.log('su: ', userDataServObj.sucursales);
      if (branches === []) {
        setSucursal('otro');
      } else {
        setSucursal('funeraria');
      }
    }
    if (service.direcion_entrega !== '') {
      setDireccionEntrega(service.direcion_entrega);
    } else {
      setDireccionEntrega(service.sucursal.direccion_sucursal);
    }
  }, [userDataServObj]);

  useEffect(() => {
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

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
  });
  // const inputRef = useRef<HTMLInputElement>('');
  const [services, setServices] = useState('');
  const [parentesco, setParentesco] = useState('');
  const [ataud, setAtaud] = useState('');
  const [value, setValue] = useState();
  const [radio, setRadio] = useState('');

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

  const [valueTime, setValueTime] = useState(
    new Date('2018-01-01T00:00:00.000Z'),
  );
  const [valueTime2, setValueTime2] = useState(
    new Date('2018-01-01T00:00:00.000Z'),
  );

  const handleRadio = (event) => {
    setRadio(event.target.value);
  };

  const handleSucursal = (event) => {
    // console.log('su: ', branches);
    setSucursal(event.target.value);
  };

  const handleImgObg = async (e) => {
    console.log('inputFile.current ', e.target.files[0]);
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };

  useEffect(() => {
    const handleUploadImg = async () => {
      if (image !== null) {
        const sotrageRef = ref(storage, `files/${params.id}/${imageName}`);
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
        const sotrageRef = ref(storage, `files/${params.id}/${imageName1}`);
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
        const sotrageRef = ref(storage, `files/${params.id}/${imageName2}`);
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
        const sotrageRef = ref(storage, `files/${params.id}/${imageName3}`);
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
        const sotrageRef = ref(storage, `files/${params.id}/${imageName4}`);
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

  // const send = async () => {
  //   // await e.preventDefault();
  //   console.log('admin phones: ', adminsPhones);
  //   const phoneList = [];
  //   if (adminsPhones !== []) {
  //     adminsPhones.map((phone) => {
  //       if (phone !== undefined) {
  //         phoneList.push(`+${phone}`);
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
  //     console.log('msg: ', msg);
  //     console.log('admin phones: ', adminsPhones);
  //     send();
  //   }
  // }, [msg]);

  const onSubmit = async (data) => {
    if (params.id) {
      if (parentesco === '') {
        const newObj1 = {
          ...data,
          ...item,
          direccion_alterna: data.direccion_alterna,
          status: 'pendiente_confirmar',
          ataud,
          doc_acta_defuncion: imgUrl,
          doc_permiso_transito: imgUrl1,
          doc_constncia_cpreparado: imgUrl2,
          doc_visado_consular: imgUrl3,
          doc_finalizado: imgUrl4,
          sucursal: {},
        };
        await updateServicePropHandler(newObj1, params.id);
      } else {
        const newObj2 = {
          ...data,
          ...item,
          sucursal: parentesco,
          status: 'pendiente_confirmar',
          ataud,
          doc_acta_defuncion: imgUrl,
          doc_permiso_transito: imgUrl1,
          doc_constncia_cpreparado: imgUrl2,
          doc_visado_consular: imgUrl3,
          doc_finalizado: imgUrl4,
        };
        await updateServicePropHandler(newObj2, params.id);
      }
    }
    // setMsg(`Confirma el transporte solicitado\n

    // - Funeraria: ${service.mortuary_name}\n
    // - Servicio: ${service.service}\n
    // - Origen: ${service.origen}\n
    // - Destino: ${service.destino}\n
    // - NIP: ${service.nip_rastreo}\n
    // Confirmar en la App ahora`);
    // Emails for users
    emailjs.send('service_9e1ebv5', 'template_vczs2a6', {
      direcion_entrega: `${direccionEntrega}`,
      origen: service.origen,
      funeraria: service.mortuary_name,
      destino: service.destino,
      servicio: `${serviceForNotif}`,
      nip: service.nip_rastreo,
    }, 'PBj_zOlr2lgy2b9sE')
      .then((result) => {
        navigate('/userHome', { replace: true });
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    const notificationObj = {
      title: 'Transporte solicitado',
      body: `Confirma el transporte solicitado NIP: ${service.nip_rastreo}`,
      for: 'Admin',
      service_id: params.id,
      track_id: service.nip_rastreo,
      createdAt: moment().format('LT'),
      dateCreated: moment().format('L'),
      timestamp: new Date().setMilliseconds(100),
    };
    sendNotification(notificationObj);
  };

  return (
    <div style={{ background: grey[300] }}>
      <SidebarMenu />
      <div className="mainContainer">
        <h1
          style={{
            margin: '1rem 0 0 0',
            color: blueGrey[700],
            textTransform: 'uppercase',
            fontSize: '1.7rem',
          }}
        >
          {t('SolicitarTransporte')}
        </h1>
        <p style={{ margin: '0.3rem 0 0 0' }}>{t('BLSolicitarTransporte')}</p>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ margin: '0.5rem 0' }}>
            <p
              style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 0 }}
            >
              {item.origen} - {item.destino}
            </p>
            <p className="labelNotification n-blue">
              {t('SolicitaTuTranslado')}
            </p>
            <div>
              <p style={{ margin: '1.5rem 0 0.5rem 0' }}>
                $ {item.cotizacion || item.cotizacion_ruta}
              </p>
              <p style={{ margin: '0 0 2rem 0' }}>{item.fecha}</p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="hook-form-data"
              className="formTransport"
            >
              <FormLabel id="sucursales-radio" style={{ marginTop: '2rem' }}>
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
                      {...register('hora_desde')}
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
                      {...register('hora_hasta')}
                    />
                  )}
                />
              </LocalizationProvider>
              <RadioGroup
                aria-labelledby="sucursales-radio"
                name="controlled-radio-buttons-group"
                value={sucursal}
                onChange={handleSucursal}
              >
                <FormLabel id="sucursales-radio" style={{ marginTop: '2rem' }}>
                  {t('SitioRecoleccion')}
                </FormLabel>
                <FormControlLabel
                  value="funeraria"
                  control={<Radio />}
                  disabled={branches === []}
                  label={t('SucursalFuneraria')}
                />
                <FormControlLabel
                  value="otro"
                  control={<Radio />}
                  label={t('AnotherAddress')}
                />
              </RadioGroup>
              {sucursal === 'funeraria' ? (
                // ''
                <TextField
                  value={parentesco}
                  onChange={(e) => setParentesco(e.target.value)}
                  label={t('SitioRecoleccion')}
                  placeholder="Seleccione"
                  select
                  style={{ marginTop: '2rem', width: '100%' }}
                >
                  {branches !== undefined ? branches.map((valueBranch, i) => (
                    <MenuItem value={valueBranch}>
                      {valueBranch.nombre_sucursal}
                    </MenuItem>
                  )) : 'no options'}
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

              <FormLabel
                id="demo-controlled-radio-buttons-group"
                style={{ width: '100%' }}
              >
                {t('DocumentacionTranslado')}
              </FormLabel>
              {/* <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={radio}
                onChange={handleRadio}
              >
                <FormControlLabel
                  value="presencial"
                  control={<Radio />}
                  label={t('EntregaPapeleriaChofer')}
                />
                <FormControlLabel
                  value="subirPapeleria"
                  control={<Radio />}
                  label={t('SubirPapeleria')}
                />
              </RadioGroup> */}
              <div style={{ textAlign: 'left' }}>
                <p style={{ textAlign: 'left' }}>{t('LBLSubirPapeleria')}</p>
                <p style={{ textAlign: 'left' }}>{t('LBLSubirPapeleria2')}</p>
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
                    <h5>{t('ConstanciaCuerpo')}</h5>
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
                {t('SolicitarTransporte')}
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default Transport;

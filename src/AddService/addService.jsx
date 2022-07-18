/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable array-callback-return */
/* eslint-disable no-case-declarations */
/* eslint-disable quote-props */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react';
import * as emailjs from 'emailjs-com';
import {
  TextField,
  MenuItem,
  InputLabel,
  FormGroup,
  ListSubheader,
  InputAdornment,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Button,
  FormHelperText,
  FormLabel,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { blueGrey, grey, lightBlue } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import AirportShuttleRoundedIcon from '@mui/icons-material/AirportShuttleRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { TailSpin } from 'react-loader-spinner';
// import { userDataContext } from '../context/userData-context.js';
import { getMessaging } from 'firebase/messaging';
import { db } from '../firebase.js';
import { servicesData } from '../service/servicesData.js';
import { userDataService } from '../service/userData.js';
import SidebarMenu from '../Menu/menu.jsx';
import './addService.scss';

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

function AddService() {
  const { t } = useTranslation();
  const { userDataServObj, getUser, sendNotification, getAdminsIDs, adminsPhones, getAdminsPhones } = userDataService();
  const { addServiceHandler, statusCall } = servicesData();
  const params = useParams();

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const [services, setServices] = useState('');
  const [originSelect, setOriginSelect] = useState('');
  const [oficinaSelect, setOficinaSelected] = useState('');
  const [date, setDate] = useState();
  const [nip, setNIP] = useState('');
  const [msg, setMsg] = useState('');
  const [toNum, setToNum] = useState('');
  const [servID, setServID] = useState(0);
  const [loading, setLoading] = useState(false);
  // const userLocalS = localStorage.getItem('userData')!;
  // const userIDLocal = JSON.parse(userLocalS);
  const [origin, setOrigin] = useState('Mexico');

  const handleOrigin = (event, newOrigin) => {
    setOrigin(newOrigin);
  };

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const handleChangeServices = (event) => {
    setServices(event.target.value);
  };

  const handleOriginSelected = (event) => {
    setOriginSelect(event.target.value);
  };

  const handleOficinaSelected = (event) => {
    setOficinaSelected(event.target.value);
  };

  useEffect(() => {
    getUser();
    getAdminsIDs();
    getAdminsPhones();
  }, []);

  useEffect(() => {
    switch (services) {
      case 't-translado':
        return setServID(1);
      case 't-tramites':
        return setServID(2);
      case 'e-punta':
        return setServID(3);
      case 'e-ruta':
        return setServID(4);

      default:
        break;
    }
  }, [services]);

  // const send = async () => {
  //   // await e.preventDefault();
  //   const phoneList = [];
  //   if (adminsPhones !== []) {
  //     adminsPhones.map((item) => {
  //       if (item !== undefined) {
  //         phoneList.push(`+${item}`);
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
  //   console.log('sending, ', data);
  //   if (data.success === true) {
  //     setLoading(false);
  //     navigate('/userHome', { replace: true });
  //   }
  // };

  // useEffect(() => {
  //   if (msg !== '') {
  //     send();
  //   }
  // }, [msg]);

  const onSubmit = async (data) => {
    // Generating NIP
    setLoading(true);
    const d1 = Date.now();
    const d2 = new Date(d1);
    const year = String(d2.getFullYear()).substring(2);
    const month = String(d2.getMonth() + 1).padStart(2, '0');
    const day = String(d2.getDate()).padStart(2, '0');
    const fullDate = [year, month, day].join('');

    const NIPCreated = `${fullDate}-${params.size}-${servID}`;

    if (services === 'e-ruta') {
      if (origin === 'Mexico') {
        const addObject = {
          user_id: userDataServObj.id,
          user_name: userDataServObj.name,
          user_phone: userDataServObj.phone,
          user_email: userDataServObj.email,
          mortuary_name: userDataServObj.mortuary_name,
          service: services,
          status: 'cotizado',
          ...data,
          origen: originSelect,
          timestamp: new Date().setMilliseconds(100),
          sucursal: {},
          rastreo: [''],
          auth_list_email: [],
          auth_list_phone: [],
          nip_rastreo: NIPCreated,
        };

        // setMsg(`Nueva cotización\n

        // - Funeral home: ${userDataServObj.mortuary_name}\n
        // - Servicio: En ruta\n
        // - Origen: ${originSelect}\n
        // - Destino: ${data.destino}\n
        // - NIP: ${NIPCreated}\n
        // Cotizar en la App ahora`);
        emailjs.send('service_g39knwe', 'template_c0cqkg3', {
          funeraria: userDataServObj.mortuary_name,
          nip: NIPCreated,
          servicio: 'En ruta',
          origen: originSelect,
          destino: data.destino,
        }, 'PBj_zOlr2lgy2b9sE')
          .then((result) => {
            setLoading(false);
            navigate('/userHome', { replace: true });
          }, (error) => {
            console.log(error.text);
          });
        await addServiceHandler(addObject);
      } else {
        const elseObject = {
          user_id: userDataServObj.id,
          user_name: userDataServObj.name,
          user_phone: userDataServObj.phone,
          user_email: userDataServObj.email,
          mortuary_name: userDataServObj.mortuary_name,
          service: services,
          status: 'cotizado',
          ...data,
          origen: oficinaSelect,
          destino: originSelect,
          timestamp: new Date().setMilliseconds(100),
          sucursal: {},
          rastreo: [''],
          auth_list_email: [],
          auth_list_phone: [],
          nip_rastreo: NIPCreated,
        };
        // setMsg(`Nueva cotización\n

        // - Funeral home: ${userDataServObj.mortuary_name}\n
        // - Servicio: En ruta\n
        // - Origen: ${oficinaSelect}\n
        // - Destino: ${originSelect}\n
        // - NIP: ${NIPCreated}\n
        // Cotizar en la App ahora`);
        emailjs.send('service_g39knwe', 'template_c0cqkg3', {
          funeraria: userDataServObj.mortuary_name,
          nip: NIPCreated,
          servicio: 'En ruta',
          origen: originSelect,
          destino: data.destino,
        }, 'PBj_zOlr2lgy2b9sE')
          .then((result) => {
            setLoading(false);
            navigate('/userHome', { replace: true });
          }, (error) => {
            console.log(error.text);
          });
        await addServiceHandler(elseObject);
      }
      const body = {
        timestamp: new Date().setMilliseconds(100),
        createdAt: moment().format('LT'),
        dateCreated: moment().format('L'),
        title: 'Nuevo servicio agregado',
        for: 'Admin',
        body: `Funeraria: ${userDataServObj.mortuary_name}, Servicio: En ruta`,
      };
      sendNotification(body);
    } else {
      const newObject = {
        timestamp: new Date().setMilliseconds(100),
        user_id: userDataServObj.id,
        user_name: userDataServObj.name,
        user_phone: userDataServObj.phone,
        user_email: userDataServObj.email,
        mortuary_name: userDataServObj.mortuary_name,
        service: services,
        status: 'pendiente_cotizar',
        sucursal: {},
        rastreo: [''],
        auth_list_email: [],
        auth_list_phone: [],
        nip_rastreo: NIPCreated,
        ...data,
      };
      await addServiceHandler(newObject);

      switch (services) {
        case 't-translado':
          const body = {
            timestamp: new Date().setMilliseconds(100),
            createdAt: moment().format('LT'),
            dateCreated: moment().format('L'),
            title: 'Nuevo servicio agregado',
            for: 'Admin',
            body: `Servicio: ${t('MOption1')}`,
          };
          // setMsg(`Nueva cotización\n

          // - Funeral home: ${userDataServObj.mortuary_name}\n
          // - Servicio: ${t('MOption1')}\n
          // - Origen: ${data.origen}\n
          // - Destino: ${data.destino}\n
          // - NIP: ${NIPCreated}\n
          // Cotizar en la App ahora`);
          emailjs.send('service_g39knwe', 'template_c0cqkg3', {
            funeraria: userDataServObj.mortuary_name,
            nip: NIPCreated,
            servicio: `${t('MOption1')}`,
            origen: data.origen,
            destino: data.destino,
          }, 'PBj_zOlr2lgy2b9sE')
            .then((result) => {
              setLoading(false);
              navigate('/userHome', { replace: true });
            }, (error) => {
              console.log(error.text);
            });
          return sendNotification(body);
        case 't-tramites':
          const body2 = {
            createdAt: moment().format('LT'),
            timestamp: new Date().setMilliseconds(100),
            dateCreated: moment().format('L'),
            title: 'Nuevo servicio agregado',
            for: 'Admin',
            body: `Servicio: ${t('MOption2')}`,
          };
          // setMsg(`Nueva cotización\n

          // - Funeral home: ${userDataServObj.mortuary_name}\n
          // - Servicio: ${t('MOption2')}\n
          // - Origen: ${data.origen}\n
          // - Destino: ${data.destino}\n
          // - NIP: ${NIPCreated}\n
          // Cotizar en la App ahora`);
          emailjs.send('service_g39knwe', 'template_c0cqkg3', {
            funeraria: userDataServObj.mortuary_name,
            nip: NIPCreated,
            servicio: `${t('MOption2')}`,
            origen: data.origen,
            destino: data.destino,
          }, 'PBj_zOlr2lgy2b9sE')
            .then((result) => {
              setLoading(false);
              navigate('/userHome', { replace: true });
            }, (error) => {
              console.log(error.text);
            });
          return sendNotification(body2);
        case 'e-punta':
          const body3 = {
            createdAt: moment().format('LT'),
            timestamp: new Date().setMilliseconds(100),
            dateCreated: moment().format('L'),
            title: 'Nuevo servicio agregado',
            for: 'Admin',
            body: `Servicio: ${t('MOption21')}`,
          };
          // setMsg(`Nueva cotización\n

          // - Funeral home: ${userDataServObj.mortuary_name}\n
          // - Servicio: ${t('MOption21')}\n
          // - Origen: ${data.origen}\n
          // - Destino: ${data.destino}\n
          // - NIP: ${NIPCreated}\n
          // Cotizar en la App ahora`);
          emailjs.send('service_g39knwe', 'template_c0cqkg3', {
            funeraria: userDataServObj.mortuary_name,
            nip: NIPCreated,
            servicio: `${t('MOption21')}`,
            origen: data.origen,
            destino: data.destino,
          }, 'PBj_zOlr2lgy2b9sE')
            .then((result) => {
              setLoading(false);
              navigate('/userHome', { replace: true });
            }, (error) => {
              console.log(error.text);
            });
          return sendNotification(body3);

        default:
          break;
      }
    }
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
          {t('TTLAddService')}
        </h1>
        {loading ? (
          <>
            <p style={{ margin: '0.3rem 0 0 0' }}>Agregando su servicio</p>
            <LoaderComponent />
          </>
        ) : (
          <>
            <p style={{ margin: '0.3rem 0 0 0' }}>{t('BLAddService')}</p>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ margin: '3rem 0' }}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  id="hook-form"
                  style={{ width: '100%', display: 'inline-grid' }}
                >
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <InputLabel id="demo-simple-select-label">
                      {t('Service')}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      defaultValue={services}
                      onChange={handleChangeServices}
                      label={t('Service')}
                      placeholder={t('LBLChooseService')}
                    >
                      <ListSubheader>{t('MTOptions')}</ListSubheader>
                      <MenuItem key={1} value="t-translado">
                        {t('MOption1')}
                      </MenuItem>
                      <MenuItem key={2} value="t-tramites">
                        {t('MOption2')}
                      </MenuItem>
                      <ListSubheader>{t('MTOptions2')}</ListSubheader>
                      <MenuItem key={3} value="e-punta">
                        {t('MOption21')}
                      </MenuItem>
                      <MenuItem key={4} value="e-ruta">
                        {t('MOption22')}
                      </MenuItem>
                    </Select>
                    <TextField
                      {...register('origen')}
                      label={t('Origen')}
                      type="text"
                      variant="outlined"
                      style={{ marginTop: '2rem' }}
                      className={services === 'e-ruta' ? 'hideInputs' : ''}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AirportShuttleRoundedIcon
                              style={{ transform: 'scaleX(-1)' }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      {...register('destino')}
                      label={t('Destino')}
                      type="text"
                      variant="outlined"
                      style={{ marginTop: '2rem' }}
                      className={services === 'e-ruta' ? 'hideInputs' : ''}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AirportShuttleRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <MobileDatePicker
                      label={t('FechaRecoleccion')}
                      inputFormat="MM/dd/yyyy"
                      value={date}
                      onChange={handleChange}
                      renderInput={(paramsx) => (
                        <TextField
                          style={{ marginTop: '2rem' }}
                          {...paramsx}
                          {...register('fecha', { required: true })}
                        />
                      )}
                    />
                    {services === 'e-ruta' ? (
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            marginTop: '2rem',
                          }}
                        >
                          <h4>{t('Origen')}</h4>
                          <ToggleButtonGroup
                            value={origin}
                            exclusive
                            onChange={handleOrigin}
                            className="gropBtns"
                          >
                            <ToggleButton value="Mexico">México</ToggleButton>
                            <ToggleButton value="USA">USA</ToggleButton>
                          </ToggleButtonGroup>
                        </div>
                        {origin === 'Mexico' ? (
                          <div>
                            <InputLabel id="demo-simple-select-label">
                              {t('Origen')} - {origin}
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              defaultValue={originSelect}
                              onChange={handleOriginSelected}
                              label={t('Origen')}
                              style={{ width: '100%' }}
                            >
                              <MenuItem key={1} value="Piedras Negras">
                                Piedras Negras
                              </MenuItem>
                              <MenuItem key={2} value="Nuevo Laredo">
                                Nuevo Laredo
                              </MenuItem>
                              <MenuItem key={3} value="Monterrey">
                                Monterrey
                              </MenuItem>
                              <MenuItem key={4} value="Sabinas, Coahuila">
                                Sabinas, Coahuila
                              </MenuItem>
                              <MenuItem key={5} value="Saltillo">
                                Saltillo
                              </MenuItem>
                              <MenuItem key={6} value="Matehuala">
                                Matehuala
                              </MenuItem>
                              <MenuItem key={7} value="San Luis Potosi, SLP">
                                San Luis Potosi, SLP
                              </MenuItem>
                              <MenuItem
                                key={8}
                                value="San Luis de la Paz, Guanajuato"
                              >
                                San Luis de la Paz, Guanajuato
                              </MenuItem>
                              <MenuItem key={9} value="Celaya, Guanajuato">
                                Celaya, Guanajuato
                              </MenuItem>
                              <MenuItem key={10} value="Queretaro">
                                Queretaro
                              </MenuItem>
                              <MenuItem
                                key={11}
                                value="San Juan del Rio, Querétaro"
                              >
                                San Juan del Rio, Querétaro
                              </MenuItem>
                              <MenuItem key={12} value="Ciudad de México">
                                Ciudad de México
                              </MenuItem>
                            </Select>
                            <TextField
                              {...register('destino')}
                              label={t('Destino')}
                              type="text"
                              variant="outlined"
                              style={{ marginTop: '2rem', width: '100%' }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <AirportShuttleRoundedIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            <FormLabel>{t('DestinoRutaUSA')}</FormLabel>
                          </div>
                        ) : (
                          <div>
                            <InputLabel id="demo-simple-select-label">
                              {t('Origen')} - {origin}
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              defaultValue={oficinaSelect}
                              onChange={handleOficinaSelected}
                              label={t('Oficinas')}
                              style={{ width: '100%' }}
                            >
                              <MenuItem key={1} value={t('Oficinas1')}>
                                {t('Oficinas1')}
                              </MenuItem>
                              <MenuItem key={1} value={t('Oficinas2')}>
                                {t('Oficinas2')}
                              </MenuItem>
                              <MenuItem key={1} value={t('Oficinas3')}>
                                {t('Oficinas3')}
                              </MenuItem>
                            </Select>
                            <InputLabel id="demo-simple-select-label">
                              {t('Destino')}
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              defaultValue={originSelect}
                              onChange={handleOriginSelected}
                              label={t('Destino')}
                              style={{ width: '100%' }}
                            >
                              <MenuItem key={1} value="Piedras Negras">
                                Piedras Negras
                              </MenuItem>
                              <MenuItem key={2} value="Nuevo Laredo">
                                Nuevo Laredo
                              </MenuItem>
                              <MenuItem key={3} value="Monterrey">
                                Monterrey
                              </MenuItem>
                              <MenuItem key={4} value="Sabinas, Coahuila">
                                Sabinas, Coahuila
                              </MenuItem>
                              <MenuItem key={5} value="Saltillo">
                                Saltillo
                              </MenuItem>
                              <MenuItem key={6} value="Matehuala">
                                Matehuala
                              </MenuItem>
                              <MenuItem key={7} value="San Luis Potosi, SLP">
                                San Luis Potosi, SLP
                              </MenuItem>
                              <MenuItem
                                key={8}
                                value="San Luis de la Paz, Guanajuato"
                              >
                                San Luis de la Paz, Guanajuato
                              </MenuItem>
                              <MenuItem key={9} value="Celaya, Guanajuato">
                                Celaya, Guanajuato
                              </MenuItem>
                              <MenuItem key={10} value="Queretaro">
                                Queretaro
                              </MenuItem>
                              <MenuItem
                                key={11}
                                value="San Juan del Rio, Querétaro"
                              >
                                San Juan del Rio, Querétaro
                              </MenuItem>
                              <MenuItem key={12} value="Ciudad de México">
                                Ciudad de México
                              </MenuItem>
                            </Select>
                          </div>
                        )}
                      </div>
                    ) : (
                      ''
                    )}
                    {services === 'e-ruta' ? (
                      <TextField
                        {...register('cotizacion_ruta', { value: '650 USD' })}
                        label={t('Cotizacion')}
                        type="text"
                        variant="outlined"
                        value="650 USD"
                        style={{ marginTop: '2rem' }}
                        className={services === 'e-ruta' ? 'hideInputs' : ''}
                        disabled
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="end">
                              <AttachMoneyRoundedIcon />
                            </InputAdornment>
                          ),
                        }}
                        aria-describedby="my-helper-text"
                      />
                    ) : (
                      <>
                        <TextField
                          {...register('cotizacion', { value: '' })}
                          label={t('Cotizacion')}
                          type="text"
                          className="hideInputs"
                          variant="outlined"
                          style={{ marginTop: '2rem' }}
                          value=""
                          disabled
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="end">
                                <AttachMoneyRoundedIcon />
                              </InputAdornment>
                            ),
                          }}
                          aria-describedby="my-helper-text"
                        />
                        <FormHelperText id="my-helper-text">
                          {t('LBLCotizacion')}
                        </FormHelperText>
                      </>
                    )}
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
                    endIcon={<SendIcon />}
                  >
                    {t('SolicitarCotizacion')}
                  </Button>
                </form>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </div>
  );
}
export default AddService;

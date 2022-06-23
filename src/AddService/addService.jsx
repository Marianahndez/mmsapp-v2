/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext, useEffect } from 'react';
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
// import { userDataContext } from '../context/userData-context.js';
import { db } from '../firebase.js';
import { servicesData } from '../service/servicesData.js';
import { userDataService } from '../service/userData.js';
import SidebarMenu from '../Menu/menu.jsx';
import './addService.scss';

function AddService() {
  const { t } = useTranslation();
  const { userDataServObj, getUser } = userDataService();
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
  const [servID, setServID] = useState(0);
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
  //   console.log('body; ', JSON.stringify({ numbersToMessage: phoneList, body: msg }));
  //   const res = await fetch('https://mms-mvp-app.vercel.app/api/sendMultipleMessage', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // 'Access-Control-Request-Method': 'POST',
  //     },
  //     body: JSON.stringify({ numbersToMessage: phoneList, body: msg }),
  //   }).then((data) => data.json()).catch((err) => console.log('error: ', err));
  //   // console.log('sending, ', JSON.stringify(data));

  //   // const data = await res.json();
  //   // if (data.success === true) {
  //   //   console.log('sending, ', JSON.stringify(data));
  //   //   setLoading(false);
  //   //   navigate('/userHome', { replace: true });
  //   // }
  // };

  // useEffect(() => {
  //   if (msg !== '') {
  //     send();
  //   }
  // }, [msg]);

  const onSubmit = async (data) => {
    // Generating NIP
    const d1 = Date.now();
    const d2 = new Date(d1);
    const year = String(d2.getFullYear()).substring(2);
    const month = String(d2.getMonth() + 1).padStart(2, '0');
    const day = String(d2.getDate()).padStart(2, '0');

    const NIPCreated = [year, month, day, params.size, servID].join('');

    if (services === 'e-ruta') {
      if (origin === 'Mexico') {
        const addObject = {
          user_id: userDataServObj.id,
          user_name: userDataServObj.name,
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
        await addServiceHandler(addObject);
      } else {
        const elseObject = {
          user_id: userDataServObj.id,
          user_name: userDataServObj.name,
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
        await addServiceHandler(elseObject);
      }
    } else {
      const newObject = {
        timestamp: new Date().setMilliseconds(100),
        user_id: userDataServObj.id,
        user_name: userDataServObj.name,
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
    }
  };

  useEffect(() => {
    if (statusCall) {
      navigate('/userHome', { replace: true });
    }
  }, [statusCall]);

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
      </div>
    </div>
  );
}
export default AddService;

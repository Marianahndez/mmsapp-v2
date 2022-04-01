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
  Grid,
  Button,
  FormHelperText,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { blueGrey, grey, lightBlue } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import FlightLandRoundedIcon from '@mui/icons-material/FlightLandRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { userDataContext } from '../context/userData-context.js';
import { db } from '../firebase.js';
import SidebarMenu from '../Menu/menu';

function AddService() {
  const { user } = useContext(userDataContext);

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
  const [date, setDate] = useState<Date | null>();
  const userLocalS = localStorage.getItem('userData')!;
  const userIDLocal = JSON.parse(userLocalS);

  const handleChange = (newValue: Date | null) => {
    setDate(newValue);
  };

  const handleChangeServices = (event: SelectChangeEvent) => {
    setServices(event.target.value);
  };

  const onSubmit = async (data: any) => {
    const service = {
      user_id: userIDLocal.id,
      user_name: userIDLocal.name,
      service: services,
      ...data,
    };
    console.log('register: ', service);
    await addDoc(collection(db, 'services'), {
      service,
    });
    try {
      console.log('success added');
      navigate('/userHome', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ background: grey[300] }}>
      <SidebarMenu />
      <div style={{ padding: '2rem' }}>
        <h1
          style={{
            margin: '1rem 0 0 0',
            color: blueGrey[700],
            textTransform: 'uppercase',
            fontSize: '1.7rem',
          }}
        >
          Agregue un servicio
        </h1>
        <p style={{ margin: '0.3rem 0 0 0' }}>
          Complete la información necesaria para cotizar su servicio.
        </p>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ margin: '3rem 0' }}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="hook-form"
              style={{ width: '100%', display: 'inline-grid' }}
            >
              <LocalizationProvider dateAdapter={DateAdapter}>
                <InputLabel id="demo-simple-select-label">Servicio</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  defaultValue={services}
                  onChange={handleChangeServices}
                  label="Servicio"
                  placeholder="Elija un servicio"
                >
                  <ListSubheader>
                    Traslado de restos humanos internacional
                  </ListSubheader>
                  <MenuItem key={1} value="t-translado">
                    Solo traslado
                  </MenuItem>
                  <MenuItem key={2} value="t-tramites">
                    Con trámites y preparación
                  </MenuItem>
                  <ListSubheader>Envío de cenizas internacional</ListSubheader>
                  <MenuItem key={3} value="e-punta">
                    De punta a punta
                  </MenuItem>
                  <MenuItem key={4} value="e-ruta">
                    En ruta
                  </MenuItem>
                </Select>
                <TextField
                  {...register('origen', { required: true })}
                  label="Origen"
                  type="text"
                  variant="outlined"
                  style={{ marginTop: '2rem' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FlightTakeoffRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  {...register('destino', { required: true })}
                  label="Destino"
                  type="text"
                  variant="outlined"
                  style={{ marginTop: '2rem' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FlightLandRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <MobileDatePicker
                  label="Fecha de recolección"
                  inputFormat="MM/dd/yyyy"
                  value={date}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      style={{ marginTop: '2rem' }}
                      {...params}
                      {...register('fecha', { required: true })}
                    />
                  )}
                />
                {services === 'e-ruta' ? (
                  <TextField
                    {...register('cotizacion_ruta', { value: '650' })}
                    label="Cotización"
                    type="text"
                    variant="outlined"
                    value="650"
                    style={{ marginTop: '2rem' }}
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
                      label="Cotización"
                      type="text"
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
                      Pendiente de confirmar por el coordinador.
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
                Solicitar cotización
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default AddService;

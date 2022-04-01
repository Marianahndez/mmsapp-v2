/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react';
import {
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  ListSubheader,
  InputAdornment,
  IconButton,
  Grid,
  Button,
  FormHelperText,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { blueGrey, grey, lightBlue } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import FlightLandRoundedIcon from '@mui/icons-material/FlightLandRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import { useForm, Controller } from 'react-hook-form';
import SidebarMenu from '../Menu/menu';

function Transport() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      origen: '',
      destino: '',
      fecha: '',
      cotizacion: '',
    },
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [services, setServices] = useState('');
  const [parentesco, setParentesco] = useState('');
  const [sucursal, setSucursal] = useState('funeraria');
  const [ataud, setAtaud] = useState('');
  const [value, setValue] = useState<Date | null>();
  const [radio, setRadio] = useState('');
  const [image, setImage] = useState('' || null);

  const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadio((event.target as HTMLInputElement).value);
  };

  const handleSucursal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSucursal((event.target as HTMLInputElement).value);
  };

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  const handleChangeServices = (event: SelectChangeEvent) => {
    setServices(event.target.value);
  };

  const handleChangeParentesco = (event: SelectChangeEvent) => {
    setParentesco(event.target.value);
  };

  const handleChangeAtaud = (event: SelectChangeEvent) => {
    setAtaud(event.target.value);
  };

  const onSubmit = (data: any) => {
    console.log(data);
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
          Solicitar transporte
        </h1>
        <p style={{ margin: '0.3rem 0 0 0' }}>
          Favor de llenar los últimos datos para su translado.
        </p>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ margin: '0.5rem 0' }}>
            <p
              style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 0 }}
            >
              Dallas - México
            </p>
            <div>
              <p style={{ margin: '0.5rem 0' }}>
                $2,000
                <span> USD</span>
              </p>
              <p style={{ margin: '0 0 2rem 0' }}>4 de Mayo del 2022</p>
            </div>
            <FormControl
              fullWidth
              onSubmit={handleSubmit(onSubmit)}
              id="hook-form"
              style={{ width: '100%' }}
            >
              <FormLabel id="sucursales-radio" style={{ marginTop: '2rem' }}>
                Sitio de recolección
              </FormLabel>
              <RadioGroup
                aria-labelledby="sucursales-radio"
                name="controlled-radio-buttons-group"
                value={sucursal}
                onChange={handleSucursal}
              >
                <FormControlLabel
                  value="funeraria"
                  control={<Radio />}
                  label="En sucursal funeraria"
                />
                <FormControlLabel
                  value="otro"
                  control={<Radio />}
                  label="Otro sitio de recolección"
                />
              </RadioGroup>
              {sucursal === 'funeraria' ? (
                <TextField
                  value={services}
                  onChange={(e) => setParentesco(e.target.value)}
                  label="Sitio de recolección"
                  placeholder="Seleccione"
                  select
                  style={{ marginTop: '2rem' }}
                >
                  <MenuItem value={1}>Dallas funeral - Centro</MenuItem>
                  <MenuItem value={2}>Dallas funeral - Norte</MenuItem>
                  <MenuItem value={3}>Dallas funeral - Sur</MenuItem>
                </TextField>
              ) : (
                <TextField
                  // {...register('origen', { required: true })}
                  label="Otro sitio de recolección"
                  type="text"
                  variant="outlined"
                  style={{ marginTop: '2rem' }}
                />
              )}
              <TextField
                // {...register('origen', { required: true })}
                label="Nombre del finado"
                type="text"
                variant="outlined"
                style={{ marginTop: '2rem' }}
              />

              <TextField
                // {...register('destino', { required: true })}
                label="Nombre del contacto autorizado"
                type="text"
                variant="outlined"
                style={{ marginTop: '2rem' }}
              />

              <TextField
                // {...register('destino', { required: true })}
                label="Teléfono del contacto autorizado"
                type="number"
                variant="outlined"
                style={{ marginTop: '2rem' }}
              />

              <TextField
                value={parentesco}
                onChange={(e) => setParentesco(e.target.value)}
                label="Parentesco"
                placeholder="Elija su parentesco"
                select
                style={{ marginTop: '2rem' }}
              >
                <MenuItem value={1}>Padre</MenuItem>
                <MenuItem value={2}>Madre</MenuItem>
                <MenuItem value={3}>Hijo (a)</MenuItem>
                <MenuItem value={3}>Abuelo (a)</MenuItem>
              </TextField>
              <TextField
                // {...register('destino', { required: true })}
                label="Nombre del familiar que lo recibe"
                type="text"
                variant="outlined"
                style={{ marginTop: '2rem' }}
              />

              <TextField
                // {...register('destino', { required: true })}
                label="Director funerario"
                type="text"
                variant="outlined"
                style={{ marginTop: '2rem' }}
              />

              <TextField
                // {...register('destino', { required: true })}
                label="Teléfono"
                type="number"
                variant="outlined"
                style={{ marginTop: '2rem' }}
              />

              <TextField
                // {...register('destino', { required: true })}
                label="Dirección de entrega"
                type="text"
                variant="outlined"
                style={{ marginTop: '2rem' }}
              />

              <TextField
                // {...register('destino', { required: true })}
                label="Municipio"
                type="text"
                variant="outlined"
                style={{ marginTop: '2rem' }}
              />

              <TextField
                // {...register('destino', { required: true })}
                label="Estado"
                type="text"
                variant="outlined"
                style={{ marginTop: '2rem' }}
              />
              <TextField
                value={ataud}
                onChange={(e) => setAtaud(e.target.value)}
                label="Tamaño del ataud"
                placeholder="Seleccione"
                select
                style={{ marginTop: '2rem' }}
                aria-describedby="my-helper-text"
              >
                <MenuItem value={1}>Pequeño</MenuItem>
                <MenuItem value={2}>Mediano</MenuItem>
                <MenuItem value={3}>Grande</MenuItem>
                <MenuItem value={3}>Extra grande</MenuItem>
              </TextField>
              <FormHelperText id="my-helper-text">
                *Dato sensible
              </FormHelperText>
              <TextField
                // {...register('destino', { required: true })}
                label="Notas"
                type="text"
                variant="outlined"
                style={{ marginTop: '2rem' }}
              />

              <FormLabel
                id="demo-controlled-radio-buttons-group"
                style={{ marginTop: '2rem' }}
              >
                Documentación para translado
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={radio}
                onChange={handleRadio}
              >
                <FormControlLabel
                  value="presencial"
                  control={<Radio />}
                  label="Entrega papelería fiscal al chofer"
                />
                <FormControlLabel
                  value="subirPapeleria"
                  control={<Radio />}
                  label="Subir papelería"
                />
              </RadioGroup>
              <div>
                {radio === 'subirPapeleria' ? (
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ textAlign: 'center' }}>
                      <b>Agiliza este servicio subiendo la papelería ahora </b>y
                      organizas toda tu información en un mismo lugar
                    </p>
                    <hr />
                    <input
                      id="icon-button-file"
                      type="file"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton component="span">
                        <AddPhotoAlternateRoundedIcon fontSize="large" />
                        <h5>Acta de defunción</h5>
                      </IconButton>
                    </label>
                    <hr />
                    <input
                      id="icon-button-file"
                      type="file"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton component="span">
                        <AddPhotoAlternateRoundedIcon fontSize="large" />
                        <h5>Permiso de tránsito</h5>
                      </IconButton>
                    </label>
                    <hr />
                    <input
                      id="icon-button-file"
                      type="file"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton component="span">
                        <AddPhotoAlternateRoundedIcon fontSize="large" />
                        <h6 style={{ fontSize: '1.1rem' }}>
                          Constancia de cuerpo preparado
                        </h6>
                      </IconButton>
                    </label>
                    <hr />
                    <input
                      id="icon-button-file"
                      type="file"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton component="span">
                        <AddPhotoAlternateRoundedIcon fontSize="large" />
                        <h5>Visado consular</h5>
                      </IconButton>
                    </label>
                    <hr />
                    <input
                      id="icon-button-file"
                      type="file"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton component="span">
                        <AddPhotoAlternateRoundedIcon fontSize="large" />
                        <h5>Documento de pertenencias</h5>
                      </IconButton>
                    </label>
                    <hr />
                    <input
                      id="icon-button-file"
                      type="file"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton component="span">
                        <AddPhotoAlternateRoundedIcon fontSize="large" />
                        <h5>Documento de finalizado</h5>
                      </IconButton>
                    </label>
                  </div>
                ) : (
                  ''
                )}
              </div>

              <Button
                variant="contained"
                style={{
                  margin: '3rem auto',
                  borderRadius: '20px',
                  padding: '1rem',
                  width: '80%',
                  background: '#a54131',
                  fontSize: '1rem',
                }}
                endIcon={<SendIcon />}
                disabled={radio === ''}
              >
                Solicitar transporte
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default Transport;

/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { grey, blueGrey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  FormControl,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import { useForm } from 'react-hook-form';
import SidebarMenu from '../Menu/menu';

function ServiceDetails() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);
    navigate('/userHome', { replace: true });
  };

  return (
    <div style={{ background: grey[300], height: '100vh' }}>
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
          Detalles del servicio
        </h1>
        <p style={{ margin: '0.3rem 0 0 0' }}>
          En esta sección podrá revisar el detalle de su servicio.
        </p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{ marginTop: '4rem' }}>
              <p
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '400',
                  margin: '0 0 0.5rem 0',
                  color: '#8f0f1e',
                }}
              >
                Funerarias Los Angeles
              </p>
              <p
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  margin: 0,
                }}
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
              <form
                onSubmit={handleSubmit(onSubmit)}
                id="hook-form"
                style={{ width: '100%', display: 'inline-grid' }}
              >
                <p style={{ marginBottom: 0 }}>
                  Bajo los siguientes detalles, favor de agregar costo de
                  sercivio
                </p>
                <TextField
                  {...register('cotizacion')}
                  label="Cotización"
                  type="number"
                  variant="outlined"
                  style={{ marginTop: '2rem' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <AttachMoneyRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
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
                  Enviar cotización
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default ServiceDetails;

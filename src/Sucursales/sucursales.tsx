/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { grey, blueGrey } from '@mui/material/colors';
import { Grid, IconButton, FormControl, TextField } from '@mui/material';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SidebarMenu from '../Menu/menu';

import './sucursales.scss';

function Sucursales() {
  const [edit, setEdit] = useState(false);
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
          Sucursales (3)
        </h1>
        <p style={{ margin: '0.3rem 0 2rem 0' }}>
          En esta sección podrá revisar el listado de sus sucursales.
        </p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {!edit ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    margin: '1.5rem 0 0 0',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', width: '100%' }}>
                    <PinDropRoundedIcon />
                    <h3
                      style={{
                        margin: '0.2rem 0 0 0.8rem',
                        color: '#004d40',
                        textDecoration: 'underline',
                      }}
                    >
                      North Carolina, Tx
                    </h3>
                  </div>
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => setEdit(true)}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                </div>
                <p>#13125 Zeb Morris Way, Mint Hill, P.C. 28227</p>
                <div style={{ display: 'flex', margin: '1.5rem 0' }}>
                  <LocalPrintshopRoundedIcon />
                  <p style={{ margin: '0.2rem 0 0.3rem 0.8rem' }}>
                    <b>Fax:</b> 82912394
                  </p>
                </div>
                <div style={{ display: 'flex', margin: '1.5rem 0' }}>
                  <LocalPhoneRoundedIcon />
                  <p style={{ margin: '0.2rem 0 0.3rem 0.8rem' }}>
                    <b>Teléfono:</b> 82900977
                  </p>
                </div>
              </>
            ) : (
              <FormControl
                fullWidth
                onSubmit={handleSubmit(onSubmit)}
                id="hook-form"
                style={{ width: '100%', marginTop: '1rem' }}
              >
                <h3
                  style={{
                    textTransform: 'uppercase',
                    color: '#141825',
                    marginBottom: '0.5rem',
                  }}
                >
                  Editar sucursal
                </h3>
                <TextField
                  {...register('origen', { required: true })}
                  label="Nombre"
                  type="text"
                  variant="outlined"
                  placeholder="Escriba su nombre"
                  style={{ marginTop: '0.5rem' }}
                  InputProps={{ readOnly: false }}
                />
                <TextField
                  {...register('origen', { required: true })}
                  label="Dirección"
                  type="text"
                  variant="outlined"
                  placeholder="Escriba su nombre"
                  style={{ marginTop: '0.5rem' }}
                  InputProps={{ readOnly: false }}
                />
                <TextField
                  {...register('origen', { required: true })}
                  label="RFC"
                  type="text"
                  variant="outlined"
                  placeholder="Escriba su nombre"
                  style={{ marginTop: '0.5rem' }}
                  InputProps={{ readOnly: false }}
                />
                <TextField
                  {...register('origen', { required: true })}
                  label="Teléfono"
                  type="number"
                  variant="outlined"
                  placeholder="Escriba su nombre"
                  style={{ marginTop: '0.5rem' }}
                  InputProps={{ readOnly: false }}
                />
                <TextField
                  {...register('origen', { required: true })}
                  label="Fax"
                  type="number"
                  variant="outlined"
                  placeholder="Escriba su nombre"
                  style={{ marginTop: '0.5rem' }}
                  InputProps={{ readOnly: false }}
                />
              </FormControl>
            )}
            <div
              style={{
                display: 'flex',
                margin: '1.5rem 0 0 0',
                paddingTop: '2rem',
                borderTop: '1px solid #565656',
              }}
            >
              <PinDropRoundedIcon />
              <h3
                style={{
                  margin: '0.2rem 0 0 0.8rem',
                  color: '#004d40',
                  textDecoration: 'underline',
                }}
              >
                North Carolina, Tx
              </h3>
            </div>
            <p>#13125 Zeb Morris Way, Mint Hill, P.C. 28227</p>
            <div style={{ display: 'flex', margin: '1.5rem 0' }}>
              <LocalPrintshopRoundedIcon />
              <p style={{ margin: '0.2rem 0 0.3rem 0.8rem' }}>
                <b>Fax:</b> 82912394
              </p>
            </div>
            <div style={{ display: 'flex', margin: '1.5rem 0' }}>
              <LocalPhoneRoundedIcon />
              <p style={{ margin: '0.2rem 0 0.3rem 0.8rem' }}>
                <b>Teléfono:</b> 82900977
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                margin: '2.5rem 0 0 0',
                paddingTop: '2rem',
                borderTop: '1px solid #565656',
              }}
            >
              <PinDropRoundedIcon />
              <h3
                style={{
                  margin: '0.2rem 0 0 0.8rem',
                  color: '#004d40',
                  textDecoration: 'underline',
                }}
              >
                North Carolina, Tx
              </h3>
            </div>
            <p>#13125 Zeb Morris Way, Mint Hill, P.C. 28227</p>
            <div style={{ display: 'flex', margin: '1.5rem 0' }}>
              <LocalPrintshopRoundedIcon />
              <p style={{ margin: '0.2rem 0 0.3rem 0.8rem' }}>
                <b>Fax:</b> 82912394
              </p>
            </div>
            <div style={{ display: 'flex', margin: '1.5rem 0' }}>
              <LocalPhoneRoundedIcon />
              <p style={{ margin: '0.2rem 0 0.3rem 0.8rem' }}>
                <b>Teléfono:</b> 82900977
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default Sucursales;

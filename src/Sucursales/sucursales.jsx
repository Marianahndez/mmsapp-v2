/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { grey, blueGrey } from '@mui/material/colors';
import {
  Grid,
  IconButton,
  FormControl,
  TextField,
  Button,
} from '@mui/material';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import SidebarMenu from '../Menu/menu.jsx';
import './sucursales.scss';

const ShowBranches = ({ branches, edit }) => {
  const { t } = useTranslation();

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
  const onSubmit = (data) => {
    console.log(data);
  };
  return branches.map((element) => (
    <>
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
                {element.nombre_sucursal}
              </h3>
            </div>
            {/* <IconButton
                aria-label="edit"
                size="small"
                onClick={() => setEdit(true)}
              >
                <EditRoundedIcon />
              </IconButton> */}
          </div>
          <p>{element.direccion_sucursal}</p>
          <div style={{ display: 'flex', margin: '1.5rem 0' }}>
            <LocalPrintshopRoundedIcon />
            <p style={{ margin: '0.2rem 0 0.3rem 0.8rem' }}>
              <b>{t('Fax')} :</b> {element.fax_sucursal}
            </p>
          </div>
          <div style={{ display: 'flex', margin: '1.5rem 0' }}>
            <LocalPhoneRoundedIcon />
            <p style={{ margin: '0.2rem 0 0.3rem 0.8rem' }}>
              <b>{t('Telefono')} :</b> {element.telefono_sucursal}
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
            {t('EditarSucursal')}
          </h3>
          <TextField
            {...register('origen', { required: true })}
            label={t('Nombre')}
            type="text"
            variant="outlined"
            placeholder="Escriba su nombre"
            style={{ marginTop: '0.5rem' }}
            InputProps={{ readOnly: false }}
          />
          <TextField
            {...register('origen', { required: true })}
            label={t('Direccion')}
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
            label={t('Telefono')}
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
    </>
  ));
};

function Sucursales() {
  const { t } = useTranslation();
  const location = useLocation();

  const [edit, setEdit] = useState(false);
  const [size, setSize] = useState(0);

  const [userIDLocal, setUserIDLocal] = useState(location.state.data);

  useEffect(() => {
    setUserIDLocal(location.state.data);
  }, []);

  useEffect(() => {
    if (userIDLocal !== {}) {
      setSize(userIDLocal.sucursales.length);
    }
  }, [location.state.data]);

  return (
    <div style={{ background: grey[300] }}>
      <SidebarMenu />
      <div className="sucursalesContainer">
        <h1
          style={{
            margin: '1rem 0 0 0',
            color: blueGrey[700],
            textTransform: 'uppercase',
            fontSize: '1.7rem',
          }}
        >
          {t('Sucursales')} ({size})
        </h1>
        <p style={{ margin: '0.3rem 0 2rem 0' }}>{t('LBLSucursales')}</p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {size !== 0 ? (
              <ShowBranches branches={userIDLocal.sucursales} edit={edit} />
            ) : (
              <div>
                <p>
                  <b>No cuenta con sucursales registradas.</b>
                </p>
                <Button
                  variant="contained"
                  style={{
                    width: '100%',
                    margin: '1.5rem auto',
                    borderRadius: '20px',
                    padding: '0.8rem',
                    background: '#a54131',
                  }}
                  component={Link}
                  to="/profile"
                >
                  Registrar una sucursal
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default Sucursales;

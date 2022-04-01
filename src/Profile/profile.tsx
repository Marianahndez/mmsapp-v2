/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext } from 'react';
import { grey, blueGrey } from '@mui/material/colors';
// eslint-disable-next-line object-curly-newline
import {
  Grid,
  IconButton,
  FormControl,
  TextField,
  Button,
  Avatar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useForm, Controller } from 'react-hook-form';
import { userDataContext } from '../context/userData-context.js';
import SidebarMenu from '../Menu/menu';

function Profile() {
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

  const userLocalS = localStorage.getItem('userData')!;
  const userIDLocal = JSON.parse(userLocalS);

  const { user } = useContext(userDataContext);
  const [edit1, setEdit1] = useState(false);
  const [edit3, setEdit3] = useState(false);
  const [image, setImage] = useState('' || null);
  const upload = () => {
    // if (image == null) return;
    // storage
    //   .ref(`/images/${image.name}`)
    //   .put(image)
    //   .on('state_changed', alert('success'), alert);
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
          Mi perfil
        </h1>
        <p style={{ margin: '0.3rem 0 0 0' }}>
          En esta sección podrá editar algunos datos, asi como agregar sus
          sucursales.
        </p>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ margin: '3rem 0' }}>
            <div style={{ textAlign: 'center' }}>
              <input
                accept="image/*"
                id="icon-button-files"
                type="file"
                style={{ display: 'none' }}
                onChange={(e: any) => {
                  setImage(e.target.files[0]);
                }}
              />
              <label htmlFor="icon-button-files">
                <IconButton component="span">
                  <Avatar sx={{ width: 90, height: 90, marginBottom: '1rem' }}>
                    <PersonRoundedIcon fontSize="large" />
                  </Avatar>
                </IconButton>
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ textTransform: 'uppercase', color: '#141825' }}>
                Datos personales
              </h3>
              <IconButton
                aria-label="edit"
                size="small"
                onClick={() => setEdit1(true)}
              >
                <EditRoundedIcon />
              </IconButton>
            </div>
            <div>
              <FormControl
                fullWidth
                onSubmit={handleSubmit(onSubmit)}
                id="hook-form"
                style={{ width: '100%' }}
              >
                {!edit1 ? (
                  <>
                    <TextField
                      label="Nombre"
                      type="text"
                      variant="outlined"
                      defaultValue={userIDLocal.name}
                      style={{ marginTop: '0.5rem' }}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      label="Correo"
                      type="text"
                      variant="outlined"
                      defaultValue={userIDLocal.email}
                      style={{ marginTop: '2rem' }}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      label="Teléfono"
                      type="number"
                      variant="outlined"
                      defaultValue="8801222938"
                      style={{ marginTop: '2rem' }}
                      InputProps={{ readOnly: true }}
                    />
                    {userIDLocal.role !== 'admin' ? (
                      ''
                    ) : (
                      <TextField
                        label="Puesto"
                        type="texto"
                        variant="outlined"
                        defaultValue={userIDLocal.role}
                        style={{ marginTop: '2rem' }}
                        InputProps={{ readOnly: true }}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {/* Agregar defaultValues */}
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
                      label="Correo"
                      type="text"
                      variant="outlined"
                      placeholder="Escriba su correo"
                      style={{ marginTop: '2rem' }}
                      InputProps={{ readOnly: false }}
                    />
                    <TextField
                      {...register('origen', { required: true })}
                      label="Teléfono"
                      type="number"
                      variant="outlined"
                      placeholder="Escriba su teléfono"
                      style={{ marginTop: '2rem' }}
                      InputProps={{ readOnly: false }}
                    />
                    <TextField
                      {...register('origen', { required: true })}
                      label="Puesto"
                      type="text"
                      variant="outlined"
                      placeholder="Escriba su teléfono"
                      style={{ marginTop: '2rem' }}
                      InputProps={{ readOnly: false }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => setEdit1(false)}
                      style={{
                        width: '80%',
                        margin: '1.5rem auto',
                        borderRadius: '20px',
                        padding: '0.8rem',
                        background: '#a54131',
                      }}
                    >
                      Actualizar
                    </Button>
                  </>
                )}
              </FormControl>
            </div>
            {userIDLocal.role !== 'admin' ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '2rem',
                  }}
                >
                  <h3 style={{ textTransform: 'uppercase', color: '#141825' }}>
                    Agregar mis sucursales
                  </h3>
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => setEdit3(true)}
                  >
                    <AddCircleRoundedIcon />
                  </IconButton>
                </div>
                <div>
                  <FormControl
                    fullWidth
                    onSubmit={handleSubmit(onSubmit)}
                    id="hook-form"
                    style={{ width: '100%' }}
                  >
                    {!edit3 ? (
                      <>
                        <p style={{ marginTop: 0 }}>
                          En la sección de <i>Sucursales</i> podrá editar los
                          datos necesarios.
                        </p>
                        <Button
                          variant="contained"
                          style={{
                            width: '100%',
                            position: 'relative',
                            borderRadius: '20px',
                            padding: '0.8rem',
                            background: '#8f0f1e',
                            marginTop: '1.5rem',
                          }}
                          component={Link}
                          to="/sucursales"
                        >
                          Revisar mis sucursales
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* Agregar defaultValues */}
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
                          label="Correo"
                          type="text"
                          variant="outlined"
                          placeholder="Escriba su correo"
                          style={{ marginTop: '2rem' }}
                          InputProps={{ readOnly: false }}
                        />
                        <TextField
                          {...register('origen', { required: true })}
                          label="Teléfono"
                          type="number"
                          variant="outlined"
                          placeholder="Escriba su teléfono"
                          style={{ marginTop: '2rem' }}
                          InputProps={{ readOnly: false }}
                        />
                        <Button
                          variant="contained"
                          onClick={() => setEdit3(false)}
                          style={{
                            width: '80%',
                            margin: '1.5rem auto',
                            borderRadius: '20px',
                            padding: '0.8rem',
                            background: '#a54131',
                          }}
                        >
                          Actualizar
                        </Button>
                      </>
                    )}
                  </FormControl>
                </div>
              </>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default Profile;

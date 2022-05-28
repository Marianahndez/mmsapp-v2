/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext, useEffect } from 'react';
import { grey, blueGrey } from '@mui/material/colors';
// eslint-disable-next-line object-curly-newline
import {
  Grid,
  IconButton,
  TextField,
  Button,
  Avatar,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import SidebarMenu from '../Menu/menu.jsx';
import './profile.scss';

function Profile() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    // defaultValues: {

    // }
  });

  const userLog = Boolean(localStorage.getItem('userLoged'));
  console.log('user loged? ', userLog);
  const [userIDLocal, setUserIDLocal] = useState(userLog ? location.state.data : {});

  useEffect(() => {
    if (!userLog) {
      navigate('/', { replace: true });
    } else {
      setUserIDLocal(location.state.data);
    }
  }, []);
  console.log('def: ', userIDLocal);
  // const userLocalS = localStorage.getItem('userData');
  // const userIDLocal = JSON.parse(userLocalS);
  // const citiesRef = collection(db, 'users');

  // const { user } = useContext(userDataContext);

  const [edit1, setEdit1] = useState(false);
  const [edit3, setEdit3] = useState(false);
  const [image, setImage] = useState();
  const upload = () => {
    // if (image == null) return;
    // storage
    //   .ref(`/images/${image.name}`)
    //   .put(image)
    //   .on('state_changed', alert('success'), alert);
  };

  const onSubmit = async (data) => {
    // updateDoc(doc(db, 'users', userIDLocal.id), {
    //   sucursales: [...userIDLocal.sucursales, { ...data }],
    // });
    setEdit3(false);
    // const q = query(citiesRef, where('email', '==', userIDLocal.email));
    // const querySnapshot = await getDocs(q);
    // return querySnapshot.forEach((docx) => {
    //   const userData = {
    //     id: docx.id,
    //     ...docx.data(),
    //   };
    //   localStorage.setItem('userData', JSON.stringify(userData));
    // });
  };

  // const userDataSubmit = (data: any) => {
  //   console.log('useredit? ', data);
  // };

  return (
    <div style={{ background: grey[300] }}>
      <SidebarMenu />
      <div className="profileContainer">
        <h1
          style={{
            margin: '1rem 0 0 0',
            color: blueGrey[700],
            textTransform: 'uppercase',
            fontSize: '1.7rem',
          }}
        >
          {t('Perfil')}
        </h1>
        <p style={{ margin: '0.3rem 0 0 0' }}>{t('LBLPerfil')}</p>
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
                {t('DatosPersonales')}
              </h3>
              {/* <IconButton
                aria-label="edit"
                size="small"
                onClick={() => setEdit1(true)}
              >
                <EditRoundedIcon />
              </IconButton> */}
            </div>
            <div>
              <form
                // onSubmit={handleSubmit(userDataSubmit)}
                id="hook-2-form"
                className="profileForm"
              >
                {(!edit1 && userIDLocal !== {}) ? (
                  <>
                    <TextField
                      label={t('Nombre')}
                      type="text"
                      variant="outlined"
                      defaultValue={userIDLocal.name}
                      style={{ marginTop: '0.5rem', width: '100%' }}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      label={t('Correo')}
                      type="text"
                      variant="outlined"
                      defaultValue={userIDLocal.email}
                      style={{ marginTop: '2rem', width: '100%' }}
                      InputProps={{ readOnly: true }}
                    />
                    {userIDLocal.phone ? (
                      <TextField
                        label={t('Telefono')}
                        type="number"
                        variant="outlined"
                        defaultValue={userIDLocal.phone}
                        style={{ marginTop: '2rem', width: '100%' }}
                        InputProps={{ readOnly: true }}
                      />
                    ) : (
                      ''
                    )}
                    {userIDLocal.role !== 'Admin' ? (
                      ''
                    ) : (
                      <TextField
                        label={t('Puesto')}
                        type="texto"
                        variant="outlined"
                        defaultValue={userIDLocal.role}
                        style={{ marginTop: '2rem', width: '100%' }}
                        InputProps={{ readOnly: true }}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {/* Agregar defaultValues */}
                    <TextField
                      {...register('name', { required: true })}
                      label={t('Nombre')}
                      type="text"
                      variant="outlined"
                      placeholder="Escriba su nombre"
                      style={{ marginTop: '0.5rem' }}
                    />
                    <TextField
                      {...register('email', { required: true })}
                      label={t('Correo')}
                      type="text"
                      variant="outlined"
                      placeholder="Escriba su correo"
                      style={{ marginTop: '2rem' }}
                    />
                    <TextField
                      {...register('phone', { required: true })}
                      label={t('Telefono')}
                      type="number"
                      variant="outlined"
                      placeholder="Escriba su teléfono"
                      style={{ marginTop: '2rem' }}
                    />
                    <TextField
                      {...register('company_role', { required: true })}
                      label={t('Puesto')}
                      type="text"
                      variant="outlined"
                      style={{ marginTop: '2rem' }}
                    />
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={() => setEdit1(false)}
                      style={{
                        width: '80%',
                        margin: '1.5rem auto',
                        borderRadius: '20px',
                        padding: '0.8rem',
                        background: '#a54131',
                      }}
                    >
                      {t('Actualizar')} 2
                    </Button>
                  </>
                )}
              </form>
            </div>
            {userIDLocal.role !== 'Admin' ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '2rem',
                  }}
                >
                  <h3 style={{ textTransform: 'uppercase', color: '#141825' }}>
                    {t('AgregarSucursales')}
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
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    id="hook-form"
                    style={{ width: '100%' }}
                  >
                    {!edit3 ? (
                      <>
                        <p style={{ marginTop: 0 }}>
                          {t('LBLAgregarSucursales')}
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
                          state={{ data: userIDLocal }}
                        >
                          {t('RevisarSucursales')}
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* Agregar defaultValues */}
                        <TextField
                          {...register('nombre_sucursal', { required: true })}
                          label={t('NombreSucursal')}
                          type="text"
                          variant="outlined"
                          placeholder="Escriba su nombre"
                          style={{ marginTop: '0.5rem', width: '100%' }}
                          InputProps={{ readOnly: false }}
                        />
                        <TextField
                          {...register('direccion_sucursal', {
                            required: true,
                          })}
                          label={t('Direccion')}
                          type="text"
                          variant="outlined"
                          placeholder="Escriba su correo"
                          style={{ marginTop: '2rem', width: '100%' }}
                          InputProps={{ readOnly: false }}
                        />
                        <TextField
                          {...register('fax_sucursal', { required: true })}
                          label="Fax"
                          type="number"
                          variant="outlined"
                          placeholder="Escriba su teléfono"
                          style={{ marginTop: '2rem', width: '100%' }}
                          InputProps={{ readOnly: false }}
                        />
                        <TextField
                          {...register('telefono_sucursal', { required: true })}
                          label={t('Telefono')}
                          type="number"
                          variant="outlined"
                          placeholder="Escriba su teléfono"
                          style={{ marginTop: '2rem', width: '100%' }}
                          InputProps={{ readOnly: false }}
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          className="btnUpdate"
                        >
                          {t('Actualizar')}
                        </Button>
                      </>
                    )}
                  </form>
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

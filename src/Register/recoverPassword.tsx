/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './register.scss';

function RecoverPassword() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    console.log(data);

    const auth = getAuth();
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        resetField('email');
        alert('Revisa tu correo para cambiar la contraseña');
        navigate('/', { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('reset error ', error);
      });
  };

  return (
    <Grid
      item
      xs={12}
      md={12}
      style={{ padding: '5rem 3rem', background: '#f5f5f5', height: '100vh' }}
    >
      <h2
        style={{
          color: '#455a64',
          textTransform: 'uppercase',
          fontSize: '1.7rem',
        }}
      >
        Recuperar contraseña
      </h2>
      <p style={{ marginTop: 0 }}>
        Ingresa tu email y te enviaremos un enlace para restablecer tu
        contraseña.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ padding: '4rem 0', display: 'inline-grid', width: '100%' }}
      >
        {/* <Controller
          name="email"
          rules={{ required: true }}
          render={({ field }) => }
        /> */}
        <TextField
          {...register('email', { required: true })}
          type="text"
          label="Email"
          variant="standard"
        />
        <Button variant="contained" type="submit" className="btnBlueRounded">
          Restablece tu contraseña
        </Button>
      </form>
    </Grid>
  );
}
export default RecoverPassword;

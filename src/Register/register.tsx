/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  TextField,
  Grid,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  getAuth,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase.js';
import './register.scss';

function GetStepContent(step: number) {
  const [formEmail, setFormEmail] = useState(() => {
    const saved = localStorage.getItem('email');
    const initialValue = saved;
    return initialValue || '';
  });
  const [currentUser, setCurrentUser] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
    formState: { isDirty: isDirty2, isValid: isValid2 },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmitEmail = async (event: any) => {
    localStorage.setItem('email', JSON.stringify(event));
    await addDoc(collection(db, 'emailLeads'), {
      event,
    });
  };

  const onSubmitPersonalData = async (data: any) => {
    const newData = JSON.parse(formEmail);
    const event = {
      ...data,
      email: newData.email,
      password: newData.password,
      role: 'cliente',
    };
    await addDoc(collection(db, 'users'), {
      event,
    });
    console.log('new user: ', event);

    try {
      const userC = await createUserWithEmailAndPassword(
        auth,
        newData.email,
        newData.password,
      );
      console.log(userC);
      const authEmail = getAuth();
      const actionCodeSettings = {
        handleCodeInApp: true,
        url: 'http://localhost:3000/',
      };
      await sendSignInLinkToEmail(authEmail, newData.email, actionCodeSettings)
        .then(() => {
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem('emailForSignIn', newData.email);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
        });
    } catch (error) {
      console.log(error);
    }
  };

  switch (step) {
    case 0:
      return (
        <form
          key={1}
          onSubmit={handleSubmit(onSubmitEmail)}
          id="hook-form-1"
          style={{ width: '100%', marginTop: '1rem' }}
        >
          <TextField
            {...register('email', { required: true })}
            label="Email"
            type="text"
            variant="standard"
            style={{ width: '80%' }}
          />
          <TextField
            {...register('password', { required: true })}
            label="Contraseña"
            type="password"
            variant="standard"
            style={{ width: '80%', margin: '1rem 0 1.5rem 0' }}
          />
        </form>
      );
    case 1:
      return (
        <form
          key={2}
          onSubmit={handleSubmit2(onSubmitPersonalData)}
          id="hook-form-2"
          style={{ width: '100%' }}
        >
          <TextField
            {...register2('name', { required: true })}
            label="Nombre"
            type="text"
            variant="standard"
            style={{ width: '80%' }}
          />
          <TextField
            {...register2('mortuary_name', { required: true })}
            label="Nombre de la funeraria"
            type="text"
            variant="standard"
            style={{ width: '80%', margin: '1rem 0 1.5rem 0' }}
          />
          <TextField
            {...register2('address', { required: true })}
            label="Colonia"
            type="text"
            variant="standard"
            style={{ width: '80%', margin: '1rem 0 1.5rem 0' }}
          />
          <TextField
            {...register2('address2', { required: true })}
            label="Calle y número"
            type="text"
            variant="standard"
            style={{ width: '80%', margin: '1rem 0 1.5rem 0' }}
          />
          <TextField
            {...register2('rfc', { required: true })}
            label="RFC"
            type="text"
            variant="standard"
            style={{ width: '80%', margin: '1rem 0 1.5rem 0' }}
          />
          <TextField
            {...register2('postal_code', { required: true })}
            label="Código Postal"
            type="text"
            variant="standard"
            style={{ width: '80%', margin: '1rem 0 1.5rem 0' }}
          />
        </form>
      );
    default:
      return '';
  }
}

function RegisterPage() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const steps = [
    {
      label: 'Email & Contraseña',
      description:
        'Ingrese un correo y contraseña para poder acceder a los servicios que MMS le ofrecerá en esta nueva plataforma.',
    },
    {
      label: 'Datos de la funeraria',
      description: 'Ingrese los datos necesarios sobre la funeraria.',
    },
    {
      label: 'Valida tu email',
      description:
        'Ingresa a tu cuenta de email y da clic en el link e inicia sesión en tu nueva cuenta de Mexico Mortuary Services APP.',
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 2) {
      navigate('/', { replace: true });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Box sx={{ padding: '2rem', bgcolor: '#f5f5f5' }}>
      <h2
        style={{
          margin: '2rem 0 0.5rem 0',
          color: '#455a64',
          textTransform: 'uppercase',
          fontSize: '1.7rem',
        }}
      >
        Registro
      </h2>
      <p style={{ marginTop: '0' }}>Complete los datos de su registro.</p>
      <Grid container style={{ margin: '1rem 0 15rem 0' }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <p style={{ fontWeight: '600' }}>{step.label}</p>
              </StepLabel>
              <StepContent>
                <Typography style={{ fontSize: '1.2rem' }}>
                  {step.description}
                </Typography>
                <Typography>{GetStepContent(index)}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    {index === 0 ? (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        type="submit"
                        form="hook-form-1"
                        className={
                          index === 0
                            ? 'btnBlueRounded form'
                            : 'btnBlueRounded sm'
                        }
                      >
                        Continuar
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        type="submit"
                        form="hook-form-2"
                        className={
                          index === 0
                            ? 'btnBlueRounded form'
                            : 'btnBlueRounded sm'
                        }
                      >
                        {index === steps.length - 1 ? 'Finalizar' : 'Continuar'}
                      </Button>
                    )}
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {/* {activeStep === steps.length && (
          <Paper
            square
            elevation={0}
            sx={{ p: 3, bgcolor: '#141825', color: '#fff' }}
            style={{
              textAlign: 'center',
              borderRadius: '8px',
              marginTop: '3rem',
            }}
          >
            <Typography variant="h5" gutterBottom component="div">
              ¡Tu registro se completó de manera exitosa!
            </Typography>
            <Link to="/userHome">
              <Button
                className="btnRed"
                variant="contained"
                sx={{ mt: 1, mr: 1, color: '#141825' }}
              >
                Ver mi perfil
              </Button>
            </Link>
          </Paper>
        )} */}
      </Grid>
    </Box>
  );
}
export default RegisterPage;

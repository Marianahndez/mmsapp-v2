/* eslint-disable react/destructuring-assignment */
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
  FormLabel,
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
import { useTranslation } from 'react-i18next';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase.js';
import './register.scss';

function GetStepContent(step) {
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState(null);
  const [errorM, setErrorM] = useState('');

  const [formEmail, setFormEmail] = useState(() => {
    const saved = localStorage.getItem('email');
    const initialValue = saved;
    return initialValue || '';
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty, isValid, errors },
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

  useEffect(() => {
    localStorage.setItem('email', '');
    console.log('initEmail: ', localStorage.getItem('email'));
  }, []);

  const onSubmitEmail = async (event) => {
    localStorage.setItem('email', JSON.stringify(event));
    console.log('email: ', event);
    await addDoc(collection(db, 'emailLeads'), {
      ...event,
    });
  };

  const onSubmitPersonalData = async (data) => {
    const emailRegistered = localStorage.getItem('email');
    const newData = JSON.parse(emailRegistered);
    console.log('email to register1: ', newData);
    console.log('email to register: ', emailRegistered);
    const data2 = {
      ...data,
      email: newData.email,
      password: newData.password,
      role: 'Cliente',
    };
    await addDoc(collection(db, 'users'), {
      ...data,
      email: newData.email,
      password: newData.password,
      sucursales: [],
      role: 'Cliente',
    });
    console.log('Data register: ', data2);
    console.log('JSON data: ', newData);

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
        url: 'https://mmservicesapp.netlify.app/',
      };
      await sendSignInLinkToEmail(authEmail, newData.email, actionCodeSettings)
        .then(() => {
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          console.log('send link...', newData.email);
          window.localStorage.setItem('emailForSignIn', newData.email);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // setErrorM(errorMessage);
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
          <FormLabel>{t('RequiredFilds')}</FormLabel>

          <TextField
            {...register('email', { required: true })}
            label={t('Email')}
            type="text"
            variant="standard"
            style={{ width: '80%', marginTop: '1rem' }}
            required
          />
          <TextField
            {...register('password', {
              required: true,
              minLength: {
                value: 7,
                message: 'ErrorPass',
              },
            })}
            label={t('Contrasena')}
            type="password"
            variant="standard"
            style={{ width: '80%', margin: '1rem 0 0rem 0' }}
            required
          />
          <span style={{ color: '#a54131' }}>
            {errors.password && <p>{t(`${errors.password.message}`)}</p>}
          </span>
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
          <FormLabel>{t('RequiredFilds')}</FormLabel>

          <TextField
            {...register2('name', { required: true })}
            label={t('Nombre')}
            type="text"
            variant="standard"
            style={{ width: '80%', marginTop: '1rem' }}
            required
          />
          <TextField
            {...register2('mortuary_name', { required: true })}
            label={t('NombreFuneraria')}
            type="text"
            variant="standard"
            style={{ width: '80%', margin: '1rem 0 1.5rem 0' }}
            required
          />
          <TextField
            {...register2('address')}
            label={t('Colonia')}
            type="text"
            variant="standard"
            style={{ width: '80%', margin: '1rem 0 1.5rem 0' }}
          />
          <TextField
            {...register2('address2')}
            label={t('Address2')}
            type="text"
            variant="standard"
            style={{ width: '80%', margin: '1rem 0 1.5rem 0' }}
          />
          <TextField
            {...register2('postal_code')}
            label={t('CP')}
            type="text"
            variant="standard"
            style={{ width: '80%', margin: '1rem 0 1.5rem 0' }}
          />
          {/* {errorM} */}
        </form>
      );
    default:
      return '';
  }
}

function RegisterPage() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const steps = [
    {
      label: 'RegStep1',
      description: 'RegStepDesc1',
    },
    {
      label: 'RegStep2',
      description: 'RegStepDesc2',
    },
    {
      label: 'RegStep3',
      description: 'RegStepDesc3',
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
    <Box
      sx={{ padding: '2rem', bgcolor: '#f5f5f5' }}
      className="registerContainer"
    >
      <h2
        style={{
          margin: '2rem 0 0.5rem 0',
          color: '#455a64',
          textTransform: 'uppercase',
          fontSize: '1.7rem',
        }}
      >
        {t('Registro')}
      </h2>
      <p style={{ marginTop: '0' }}>{t('RegistroDesc')}</p>
      <Grid container style={{ margin: '1rem 0 15rem 0' }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <p style={{ fontWeight: '600' }}>{t(`${step.label}`)}</p>
              </StepLabel>
              <StepContent>
                <Typography style={{ fontSize: '1.2rem' }}>
                  {t(`${step.description}`)}
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
                        {t('Continuar')}
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
                        {index === steps.length - 1
                          ? `${t('GoHome')}`
                          : `${t('Continuar')}`}
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

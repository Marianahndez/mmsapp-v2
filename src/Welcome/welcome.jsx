/* eslint-disable react/jsx-filename-extension */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Button,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { userDataService } from '../service/userData.js';
import { userDataContext } from '../context/userData-context.js';
import './Welcome.scss';
import mmsLogo from '../img/Logo_MMS_Blanco.png';
import mxflag from '../img/mexico.png';
import usaflag from '../img/usa.png';

// Verificar si el usuario tiene session iniciada para no mostrar esta pantalla nuevamente
function Welcome() {
  const { t, i18n } = useTranslation();
  const [translateEs, setTranslateEs] = useState(false);

  const { changeL } = useContext(userDataContext);
  const { userDataServObj, getUser } = userDataService();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  // localStorage.clear();

  const changeLanguage = (lng) => {
    setTranslateEs(!translateEs);
    changeL(lng);
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    if (errorMessage !== '') {
      resetField('email');
      resetField('password');
      setTimeout(() => {
        setErrorMessage('');
      }, 7000);
    }
    // return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleChange = (event) => {
    setValues({ ...values, password: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    const authEmail = getAuth();
    // console.log('user loged', data);

    signInWithEmailAndPassword(authEmail, data.email, data.password)
      .then((userCredential) => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        // console.log('user', userCredential.user);
        setEmail(userCredential.user.email);
        navigate('/userHome', { replace: true });
      })
      .catch((error) => {
        console.log('error login', error);
        console.log('email smth_ ', email);
        const errorCode = error.code;
        setErrorMessage('Email o Contraseña incorrectos');
      });
  };

  return (
    <Grid
      className={`welcome ${!login ? 'wpage' : 'lpage'}`}
      container
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      {!login ? (
        <Grid item md={4} xs={12}>
          <div className="flags">
            {!translateEs ? (
              <Button onClick={() => changeLanguage('en')}>
                <img src={usaflag} alt="usa flag" style={{ width: '60%' }} />
              </Button>
            ) : (
              <Button onClick={() => changeLanguage('es')}>
                <img src={mxflag} alt="mx flag" style={{ width: '60%' }} />
              </Button>
            )}
          </div>
          <img src={mmsLogo} alt="mms logo" />
          <h2 className="title">{t('Welcome')}</h2>
          <p className="description">
            <b>{t('WelcomeDes')}</b>
            <br />
            <br />
            {t('WelcomeDes2')}
          </p>
          <Button
            variant="contained"
            className="btnLogin wpage"
            onClick={() => setLogin(!login)}
          >
            {t('IniciarSesion')}
          </Button>
          <Link
            to="/newAccount"
            style={{
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            <Button variant="contained" className="btnRegister">
              {t('CrearCuenta')}
            </Button>
          </Link>
        </Grid>
      ) : (
        <Grid item xs={12} md={12} className="formLogin">
          <h1
            style={{
              color: '#455a64',
              textTransform: 'uppercase',
              fontSize: '1.7rem',
            }}
          >
            {t('LBLCuentaHeader')}
          </h1>
          <p>{t('LBLCuentaSubH')}</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ padding: '4rem 0', display: 'inline-grid', width: '100%' }}
          >
            <TextField
              {...register('email', { required: true })}
              label={t('Email')}
              type="text"
              variant="standard"
            />
            {errors.email && <span>This field is required</span>}
            <br />
            <TextField
              {...register('password', { required: true })}
              label={t('Contrasena')}
              // id="filled-adornment-password"
              variant="standard"
              type={values.showPassword ? 'text' : 'password'}
              // value={values.password}
              // onChange={() => handleChange('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && <span>This field is required</span>}
            {errorMessage !== '' ? (
              <p className="errorM">{errorMessage}</p>
            ) : (
              ''
            )}
            <Button
              variant="contained"
              type="submit"
              className="btnLogin fullw lpage"
            >
              {t('IniciarSesion')}
            </Button>
            <Link to="/recoverPassword">{t('OlvidasteContrasena')}</Link>
          </form>
        </Grid>
      )}
    </Grid>
  );
}

export default Welcome;

/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Grid, TextField } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import { userDataContext } from '../context/userData-context.js';
import './Welcome.scss';
import mmsLogo from '../img/Logo_MMS_Blanco.png';
// Verificar si el usuario tiene session iniciada para no mostrar esta pantalla nuevamente
function Welcome() {
  const citiesRef = collection(db, 'users');
  const { addUserData } = useContext(userDataContext);

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
  const [email, setEmail] = useState<string | null>();
  const navigate = useNavigate();

  useEffect(() => {
    // const email = localStorage.getItem('userEmail');
    if (email !== null) {
      const getUser = async () => {
        const q = query(citiesRef, where('event.email', '==', email));
        const querySnapshot = await getDocs(q);
        return querySnapshot.forEach((doc) => {
          const userData = {
            id: doc.id,
            ...doc.data().event,
          };
          localStorage.setItem('userData', JSON.stringify(userData));
          addUserData(userData);
          console.log('data in we', userData);
        });
      };

      getUser();
    } else {
      localStorage.setItem('userData', '');
    }
    // localStorage.setItem('userLoged', user);
  }, [email]);

  const onSubmit = async (data: any) => {
    const authEmail = getAuth();

    await signInWithEmailAndPassword(authEmail, data.email, data.password)
      .then((userCredential) => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        console.log('user', userCredential.user);
        if (userCredential) {
          // localStorage.setItem('userEmail', userCredential.user.email!);
          setEmail(userCredential.user.email);
        }
        console.log(email);
        navigate('/userHome', { replace: true });
      })
      .catch((error) => {
        console.log('error login', error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
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
        <Grid className="pt15" item md={4} xs={12}>
          <img src={mmsLogo} alt="mms logo" />
          <h2 className="title">Bienvenido</h2>
          <p className="description">
            <b>
              Estas a un clic de hacer traslados funerarios internacionales.
            </b>
            <br />
            <br />
            Cotiza y solicita en línea fácilmente el traslado de restos humanos
            y envío de cenizas que tus clientes necesitan.
          </p>
          <Button
            variant="contained"
            className="btnLogin wpage"
            onClick={() => setLogin(!login)}
          >
            Iniciar sesión
          </Button>
          <Link
            to="/newAccount"
            style={{
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            <Button variant="contained" className="btnRegister">
              Crear cuenta
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
            Inicia sesión en tu cuenta
          </h1>
          <p>Ingresa el correo con el que te reigstraste</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ padding: '4rem 0', display: 'inline-grid', width: '100%' }}
          >
            <TextField
              {...register('email', { required: true })}
              label="Email"
              type="text"
              variant="standard"
            />
            {errors.email && <span>This field is required</span>}
            <br />
            <TextField
              {...register('password', { required: true })}
              label="Contraseña"
              type="password"
              variant="standard"
            />
            {errors.password && <span>This field is required</span>}
            <Button
              variant="contained"
              type="submit"
              className="btnLogin fullw lpage"
            >
              Iniciar Sesion
            </Button>
            <Link to="/recoverPassword">¿Olvidaste la contraseña?</Link>
          </form>
        </Grid>
      )}
    </Grid>
  );
}

export default Welcome;

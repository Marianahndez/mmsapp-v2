/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
import React, { useState, useEffect, useContext } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Avatar,
  IconButton,
  FormControl,
  MenuItem,
  Button,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import AirplaneTicketRoundedIcon from '@mui/icons-material/AirplaneTicketRounded';
import { blueGrey, grey, lightBlue } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase.js';
import SidebarMenu from '../Menu/menu';
import './userHome.scss';

export const Label = ({ status }: any) => {
  return (
    <>
      {status !== '' ? (
        <IconButton
          component={Link}
          to="/transport"
          style={{
            fontSize: '1.2rem',
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '1rem',
          }}
        >
          <AirplaneTicketRoundedIcon style={{ marginRight: '0.5rem' }} />
          Solicitar transporte
        </IconButton>
      ) : (
        <p className="labelNotification n-red">Pendiente de cotizar</p>
      )}
    </>
  );
};

function UserHome() {
  const citiesRef = collection(db, 'services');

  const userLocalS = localStorage.getItem('userData')!;
  const userIDLocal = JSON.parse(userLocalS);

  const [options, setOptions] = useState(false);
  const [value, setValue] = useState('');
  const [servicesRegistered, setServicesRegistered] = useState<any>([]);
  const [optionShow, setOptionShow] = useState('Servicios Recientes');

  useEffect(() => {
    if (userIDLocal.role !== 'admin') {
      const q = query(
        citiesRef,
        where('service.user_id', '==', userIDLocal.id),
      );
      const unsub = onSnapshot(q, (querySnapshot) => {
        const servArr: Array<any> = [];
        querySnapshot.forEach((doc) => {
          const userServices = {
            id: doc.id,
            ...doc.data().service,
          };
          servArr.push(userServices);
        });
        setServicesRegistered(servArr);
      });
    } else if (userIDLocal.role === 'admin') {
      const q = query(citiesRef);
      const unsub = onSnapshot(q, (querySnapshot) => {
        const servArr: Array<any> = [];
        querySnapshot.forEach((doc) => {
          const userServices = {
            id: doc.id,
            ...doc.data().service,
          };
          servArr.push(userServices);
        });
        setServicesRegistered(servArr);
      });
    }
    console.log('services ', servicesRegistered);
  }, [userIDLocal.id]);

  const handleChange = (event: SelectChangeEvent) => {
    setOptionShow(event.target.value);
    setOptions(!options);
  };
  return (
    <div style={{ background: grey[300] }}>
      <SidebarMenu />
      <div style={{ padding: '1rem 1.7rem' }}>
        {!options ? (
          <>
            <Button
              variant="text"
              style={{
                color: blueGrey[700],
                fontSize: '1.1rem',
                padding: '0 8px',
                marginTop: '1rem',
              }}
              onClick={() => setOptions(!options)}
            >
              <h2 style={{ margin: 0 }}>{optionShow}</h2>
            </Button>
            <Grid container style={{ margin: '0.5rem 0 0 0' }}>
              <Grid item xs={1} style={{ textAlign: 'center' }}>
                <ArrowUpwardRoundedIcon />
              </Grid>
              <Grid item xs={11}>
                <p style={{ margin: '0 0 1.2rem 0' }}>
                  Da click para revisar más opciones en tus servicios
                </p>
              </Grid>
            </Grid>
          </>
        ) : (
          <FormControl fullWidth>
            <Select value={optionShow} onChange={handleChange}>
              <MenuItem value="Servicios Recientes">
                Servicios Recientes
              </MenuItem>
              <MenuItem value="Papeleria pendiente">
                Papeleria pendiente
              </MenuItem>
              <MenuItem value="En transcurso">En transcurso</MenuItem>
            </Select>
          </FormControl>
        )}
        {/* <p>No hay servicios agregados recientemente</p> */}

        {/* Agregar la etiqueta del "estatus de la papelería" hasta el Paso 3. Pendiente de confirmar (user) y el Paso 3. Transporte solicitado (admin) */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {servicesRegistered.map((item: any) => (
              <Card style={{ display: 'flex' }} className="customCard">
                {userIDLocal.role !== 'admin' ? (
                  <CardContent className="container">
                    <p className="titleCard">
                      {item.origen} - {item.destino}
                    </p>
                    <div className="details">
                      {item.cotizacion !== '' ? (
                        <p className="subtitle">
                          ${item.cotizacion}
                          <span> USD</span>
                        </p>
                      ) : (
                        ''
                      )}
                      <p>4 de Mayo del 2022</p>
                    </div>
                    {userIDLocal.role !== 'admin' ? (
                      // Create label component to pass status by props and make it a button only if price is updated
                      <Label status={item.cotizacion} />
                    ) : (
                      <p className="labelNotification n-blue">
                        {item.user_name}
                      </p>
                    )}
                  </CardContent>
                ) : (
                  <CardContent
                    className="container"
                    component={Link}
                    to="/details"
                    style={{ color: 'black' }}
                  >
                    <p className="titleCard">
                      {item.origen} - {item.destino}
                    </p>
                    <div className="details">
                      {item.cotizacion !== '' ? (
                        <p className="subtitle">
                          ${item.cotizacion}
                          <span> USD</span>
                        </p>
                      ) : (
                        <i style={{ marginLeft: '0.5rem' }}>
                          Pendiente de cotizar
                        </i>
                      )}
                      <p>4 de Mayo del 2022</p>
                    </div>
                    {userIDLocal.role !== 'admin' ? (
                      // Create label component to pass status by props and make it a button only if price is updated
                      <Label status={item.cotizacion} />
                    ) : (
                      <p className="labelNotification n-blue">
                        {item.user_name}
                      </p>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </Grid>
        </Grid>
        {userIDLocal.role !== 'admin' ? (
          <Avatar
            variant="square"
            className="btnAddService"
            sx={{ bgcolor: lightBlue[900] }}
          >
            <IconButton component={Link} to="/addService">
              <AddRoundedIcon fontSize="large" />
            </IconButton>
          </Avatar>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
export default UserHome;

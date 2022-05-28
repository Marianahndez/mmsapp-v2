/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import { grey, blueGrey } from '@mui/material/colors';
import { Grid, Card, CardContent } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SidebarMenu from '../Menu/menu.jsx';
import './history.scss';

function History() {
  const { t } = useTranslation();
  // const location = useLocation();
  const navigate = useNavigate();
  const list = localStorage.getItem('servList');
  const servicesList = JSON.parse(list);

  const userLog = Boolean(localStorage.getItem('userLoged'));

  console.log('user loged? ', servicesList);
  useEffect(() => {
    if (userLog) {
      console.log('user loged? ', userLog);
    } else {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <div style={{ background: grey[300] }}>
      <SidebarMenu />
      <div className="recordContainer">
        <h1
          style={{
            margin: '1rem 0 0 0',
            color: blueGrey[700],
            textTransform: 'uppercase',
            fontSize: '1.7rem',
          }}
        >
          {t('Historial')}
        </h1>
        <p style={{ margin: '0.3rem 0 0 0' }}>{t('LBLHistorial')}</p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {servicesList.map((element, i) => {
              return (
                <Card style={{ display: 'flex' }} className="customCard" key={i}>
                  <CardContent className="container">
                    <p className="titleCard">
                      {element.origen} - {element.destino}
                    </p>
                    <div className="details">
                      <p className="subtitle">$ {element.cotizacion}</p>
                      <p>{element.fecha}</p>
                    </div>
                    <p className="labelNotification n-green">
                      {t('LBLStatusEntregado')}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default History;

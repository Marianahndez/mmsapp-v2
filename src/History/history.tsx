/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable arrow-body-style */
import React from 'react';
import { grey, blueGrey } from '@mui/material/colors';
import { Grid, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SidebarMenu from '../Menu/menu';
import './history.scss';

function History() {
  const { t } = useTranslation();
  const auxArray = localStorage.getItem('arrServices')!;
  const newArr = JSON.parse(auxArray);
  const editPost = newArr.filter((i: any) => i.status === 'entregado');

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
            {editPost.map((element: any) => {
              return (
                <Card style={{ display: 'flex' }} className="customCard">
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

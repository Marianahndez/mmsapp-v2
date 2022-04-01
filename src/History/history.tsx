import React from 'react';
import { grey, blueGrey } from '@mui/material/colors';
import { Grid, Card, CardContent } from '@mui/material';
import SidebarMenu from '../Menu/menu';
import './history.scss';

function History() {
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
          Historial
        </h1>
        <p style={{ margin: '0.3rem 0 0 0' }}>
          En esta sección podrá revisar el historial de sus servicios
          concluidos.
        </p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card style={{ display: 'flex' }} className="customCard">
              <CardContent className="container">
                <p className="titleCard">Dallas - México</p>
                <div className="details">
                  <p className="subtitle">
                    $2,000
                    <span>USD</span>
                  </p>
                  <p>4 de Mayo del 2022</p>
                </div>
                <p className="labelNotification n-green">Entregado</p>
              </CardContent>
            </Card>
            <Card style={{ display: 'flex' }} className="customCard">
              <CardContent className="container">
                <p className="titleCard">Dallas - México</p>
                <div className="details">
                  <p className="subtitle">
                    $2,000
                    <span>USD</span>
                  </p>
                  <p>4 de Mayo del 2022</p>
                </div>
                <p className="labelNotification n-green">Entregado</p>
              </CardContent>
            </Card>
            <Card style={{ display: 'flex' }} className="customCard">
              <CardContent className="container">
                <p className="titleCard">Dallas - México</p>
                <div className="details">
                  <p className="subtitle">
                    $2,000
                    <span>USD</span>
                  </p>
                  <p>4 de Mayo del 2022</p>
                </div>
                <p className="labelNotification n-green">Entregado</p>
              </CardContent>
            </Card>
            <Card style={{ display: 'flex' }} className="customCard">
              <CardContent className="container">
                <p className="titleCard">Dallas - México</p>
                <div className="details">
                  <p className="subtitle">
                    $2,000
                    <span>USD</span>
                  </p>
                  <p>4 de Mayo del 2022</p>
                </div>
                <p className="labelNotification n-green">Entregado</p>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default History;

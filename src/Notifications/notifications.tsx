import React from 'react';
import { grey, blueGrey } from '@mui/material/colors';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SidebarMenu from '../Menu/menu';
import './notifications.scss';

function Notifications() {
  const { t } = useTranslation();

  return (
    <div style={{ background: grey[300], height: '100vh' }}>
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
          {t('Notificaciones')}
        </h1>
        <p style={{ margin: '0.3rem 0 0 0' }}>{t('LBLNotificaciones')}</p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div
              style={{
                display: 'flex',
                position: 'relative',
                marginTop: '1.5rem',
              }}
            >
              <span className="redNotificationDot" />
              <p style={{ marginLeft: '1rem' }}>
                Pendiente de agregar papeleria al servicio #32
                <code className="time">13:50</code>
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                position: 'relative',
                marginTop: '0.5rem',
              }}
            >
              <span className="redNotificationDot" />
              <p style={{ marginLeft: '1rem' }}>
                Pendiente de agregar papeleria al servicio #32
                <code className="time">10:00</code>
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                position: 'relative',
                marginTop: '0.5rem',
              }}
            >
              <span className="redNotificationDot" />
              <p style={{ marginLeft: '1rem' }}>
                Pendiente de agregar papeleria al servicio #32
                <code className="time">18:25</code>
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                position: 'relative',
                marginTop: '0.5rem',
              }}
            >
              <p style={{ marginLeft: '1rem' }}>
                Pendiente de agregar papeleria al servicio #32
                <code className="time">09:00</code>
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default Notifications;

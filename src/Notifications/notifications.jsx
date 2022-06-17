/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
import { grey, blueGrey } from '@mui/material/colors';
import { Grid, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getTokenFn } from '../firebase.js';
import { userDataService } from '../service/userData.js';
import SidebarMenu from '../Menu/menu.jsx';
import './notifications.scss';

function Notifications() {
  const { t } = useTranslation();

  const { userDataServObj, getUser, servicesArr, getAllServicesAdmin, loading, getMyNotifications, userNotifList } =
    userDataService();

  const [isTokenFound, setTokenFound] = useState(false);
  const [tokenMessaging, setTokenMessaging] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const token = () => {
    getTokenFn(setTokenFound, setTokenMessaging);
  };

  useEffect(() => {
    if (userDataServObj.role === 'Admin') {
      getMyNotifications('Admin');
    } else {
      getMyNotifications(userDataServObj.id);
    }
    // setUserToken(tokenMessaging, userDataServObj.id);
  }, [userDataServObj]);

  useEffect(() => {
    const sortedList = userNotifList.sort((a, b) => b.timestamp - a.timestamp);
    const sorted = sortedList.sort((a, b) => b.createdAt - a.createdAt);
    console.log('notif: ', sorted);
    setList(sorted);
  }, [userNotifList]);

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
        {/* <p style={{ margin: '0.3rem 0 0 0' }}>Si no recibes tus notificaciones</p>
        <Button onClick={() => token()} variant="outlined">Actualiza tus permisos!</Button>
        <p style={{ margin: '0.3rem 0 0 0' }}>*Recuerda que para iOS en celular no hay notificaciones disponibles.</p> */}
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ marginTop: '2rem' }}>
            {userNotifList.length !== 0 ? list.map((item) => (
              <div
                style={{
                  display: 'flex',
                  position: 'relative',
                  marginTop: '1rem',
                }}
              >
                <span className="redNotificationDot" />
                <div style={{ marginLeft: '1rem' }}>
                  <p style={{ marginBottom: '0.5px' }}>{item.title}</p>
                  <p style={{ margin: '0' }}>{item.body}</p>
                  <code className="time">{item.createdAt} - {item.dateCreated}</code>
                </div>
              </div>
            ))
              : (
                `${t('NoNotification')}`
              )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default Notifications;

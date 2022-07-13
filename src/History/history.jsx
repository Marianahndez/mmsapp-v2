/* eslint-disable consistent-return */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { grey, blueGrey } from '@mui/material/colors';
import { Grid, Card, CardContent } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AirportShuttleRoundedIcon from '@mui/icons-material/AirportShuttleRounded';
import { userDataService } from '../service/userData.js';
import SidebarMenu from '../Menu/menu.jsx';
import './history.scss';

function History() {
  const { t } = useTranslation();
  // const location = useLocation();
  const navigate = useNavigate();
  const list = localStorage.getItem('servList');
  const servicesList = JSON.parse(list);
  const { userDataServObj, getUser } = userDataService();
  const [userIDLocal, setUserIDLocal] = useState({});
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (userDataServObj !== {}) {
      setUserIDLocal(userDataServObj);
    }
  }, [getUser]);

  useEffect(() => {
    if (servicesList !== []) {
      const filterApply = servicesList.filter((i) => i.status === 'entregado');
      setServices(filterApply);
    }
  }, []);

  const handleServiceToShow = (serviceValue) => {
    switch (serviceValue) {
      case 'e-ruta':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <AirportShuttleRoundedIcon className="transitionIcon" />{' '}
            {t('MOption22')}{' '}
          </p>
        );
      case 'e-punta':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <AirportShuttleRoundedIcon className="transitionIcon" />{' '}
            {t('MOption21')}{' '}
          </p>
        );
      case 't-tramites':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <AirportShuttleRoundedIcon className="transitionIcon" />{' '}
            {t('MOption2')}{' '}
          </p>
        );
      case 't-translado':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <AirportShuttleRoundedIcon className="transitionIcon" />{' '}
            {t('MOption1')}{' '}
          </p>
        );

      default:
        break;
    }
  };

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
            {services.map((item, i) => {
              return (
                <Card
                  style={{ display: 'flex' }}
                  className="customCardHome"
                >
                  <CardContent
                    className="container"
                    component={Link}
                    to={`/userDetails/${item.id}`}
                    state={{ data: servicesList }}
                    style={{ color: 'black' }}
                  >
                    <p className="titleCard">
                      {item.origen} - {item.destino}
                    </p>

                    <p>{handleServiceToShow(item.service)}</p>
                    <div className="details">
                      {item.cotizacion !== '' ||
                      item.cotizacion_ruta !== '' ? (
                        <>
                          <p className="subtitle">
                            ${item.cotizacion || item.cotizacion_ruta}
                          </p>
                          <p>{item.fecha}</p>
                        </>
                      ) : (
                        ''
                      )}
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

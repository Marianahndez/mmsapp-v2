/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { grey, blueGrey } from '@mui/material/colors';
import { Grid, Card, CardContent, IconButton } from '@mui/material';
import LabelRoundedIcon from '@mui/icons-material/LabelRounded';
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';
import SidebarMenu from '../Menu/menu';

function UserDetails() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const params = useParams();

  const auxArray = localStorage.getItem('arrServices')!;
  const newArr = JSON.parse(auxArray);
  const editPost = newArr.find((i: any) => i.id === params.item);

  const handleService = (service: any) => {
    switch (service) {
      case 't-translado':
        return (
          <p>
            {t('MTOptions')} - {t('MOption1')}
          </p>
        );
      case 't-tramites':
        return (
          <p>
            {t('MTOptions')} - {t('MOption2')}
          </p>
        );
      case 'e-punta':
        return (
          <p>
            {t('MTOptions2')} - {t('MOption21')}
          </p>
        );
      case 'e-ruta':
        return (
          <p>
            {t('MTOptions2')} - {t('MOption22')}
          </p>
        );
      default:
        break;
    }
  };

  const handleStatus = (status: any) => {
    switch (status) {
      case 'pendiente_cotizar':
        return (
          <>
            <div
              style={{
                width: '15%',
                textAlign: 'center',
              }}
            >
              <LabelRoundedIcon style={{ color: '#591919' }} />
            </div>
            <div style={{ width: '80%' }}>
              <span
                style={{
                  fontSize: '1.2rem',
                  display: 'block',
                  color: '#591919',
                }}
              >
                {t('LBLStatus')}
              </span>
              <span style={{ color: '#591919' }}>
                {t('LBLStatusPendienteCotizar')}
              </span>
            </div>
          </>
        );
      case 'cotizado':
        return (
          <>
            <div
              style={{
                width: '15%',
                textAlign: 'center',
              }}
            >
              <LabelRoundedIcon style={{ color: '#001e3c' }} />
            </div>
            <div style={{ width: '80%' }}>
              <span
                style={{
                  fontSize: '1.2rem',
                  display: 'block',
                  color: '#001e3c',
                }}
              >
                {t('LBLStatus')}
              </span>
              <span style={{ color: '#001e3c' }}>{t('LBLStatusCotizado')}</span>
            </div>
          </>
        );
      case 'translado_solicitado':
        return (
          <>
            <div
              style={{
                width: '15%',
                textAlign: 'center',
              }}
            >
              <LabelRoundedIcon style={{ color: '#f57c00' }} />
            </div>
            <div style={{ width: '80%' }}>
              <span
                style={{
                  fontSize: '1.2rem',
                  display: 'block',
                  color: '#f57c00',
                }}
              >
                {t('LBLStatus')}
              </span>
              <span style={{ color: '#f57c00' }}>
                {t('LBLStatusTransladoSolicitado')}
              </span>
            </div>
          </>
        );
      case 'pendiente_confirmar':
        return (
          <>
            <div
              style={{
                width: '15%',
                textAlign: 'center',
              }}
            >
              <LabelRoundedIcon style={{ color: '#565656' }} />
            </div>
            <div style={{ width: '80%' }}>
              <span
                style={{
                  fontSize: '1.2rem',
                  display: 'block',
                  color: '#565656',
                }}
              >
                {t('LBLStatus')}
              </span>
              <span style={{ color: '#565656' }}>
                {t('LBLStatusPendienteConfirmar')}
              </span>
            </div>
          </>
        );
      case 'confirmado':
        return (
          <>
            <div
              style={{
                width: '15%',
                textAlign: 'center',
              }}
            >
              <LabelRoundedIcon style={{ color: '#c62828' }} />
            </div>
            <div style={{ width: '80%' }}>
              <span
                style={{
                  fontSize: '1.2rem',
                  display: 'block',
                  color: '#c62828',
                }}
              >
                {t('LBLStatus')}
              </span>
              <span style={{ color: '#c62828' }}>
                {t('LBLStatusConfirmado')}
              </span>
            </div>
          </>
        );
      case 'recoger_hoy':
        return (
          <>
            <div
              style={{
                width: '15%',
                textAlign: 'center',
              }}
            >
              <LabelRoundedIcon style={{ color: '#ffc107' }} />
            </div>
            <div style={{ width: '80%' }}>
              <span
                style={{
                  fontSize: '1.2rem',
                  display: 'block',
                  color: '#ffc107',
                }}
              >
                {t('LBLStatus')}
              </span>
              <span style={{ color: '#ffc107' }}>
                {t('LBLStatusRecogerHoy')}
              </span>
            </div>
          </>
        );
      case 'transito':
        return (
          <>
            <div
              style={{
                width: '15%',
                textAlign: 'center',
              }}
            >
              <LabelRoundedIcon style={{ color: '#4caf50' }} />
            </div>
            <div style={{ width: '80%' }}>
              <span
                style={{
                  fontSize: '1.2rem',
                  display: 'block',
                  color: '#4caf50',
                }}
              >
                {t('LBLStatus')}
              </span>
              <span style={{ color: '#4caf50' }}>
                {t('LBLStatusEnTransito')}
              </span>
            </div>
          </>
        );
      case 'entregado':
        return (
          <>
            <div
              style={{
                width: '15%',
                textAlign: 'center',
              }}
            >
              <LabelRoundedIcon style={{ color: '#512da8' }} />
            </div>
            <div style={{ width: '80%' }}>
              <span
                style={{
                  fontSize: '1.2rem',
                  display: 'block',
                  color: '#512da8',
                }}
              >
                {t('LBLStatus')}
              </span>
              <span style={{ color: '#512da8' }}>
                {t('LBLStatusEntregado')}
              </span>
            </div>
          </>
        );
      default:
        break;
    }
  };

  const handleServiceToShow = (serviceValue: any) => {
    switch (serviceValue) {
      case 'e-ruta':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <FlightRoundedIcon className="transitionIcon" /> {t('MOption22')}{' '}
          </p>
        );
        break;
      case 'e-punta':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <FlightRoundedIcon className="transitionIcon" /> {t('MOption21')}{' '}
          </p>
        );
        break;
      case 't-tramites':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <FlightRoundedIcon className="transitionIcon" /> {t('MOption2')}{' '}
          </p>
        );
        break;
      case 't-translado':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <FlightRoundedIcon className="transitionIcon" /> {t('MOption1')}{' '}
          </p>
        );
        break;

      default:
        break;
    }
  };

  return (
    <div style={{ background: grey[300], height: '100vh' }}>
      <SidebarMenu />
      <div className="sdMainContainer">
        <h1
          style={{
            margin: '1rem 0 0 0',
            color: blueGrey[700],
            textTransform: 'uppercase',
            fontSize: '1.7rem',
          }}
        >
          {t('DetallesServicio')}
        </h1>
        <p style={{ margin: '0.3rem 0 0 0' }}>{t('LBLDetallesServicio')}</p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{ marginTop: '4rem' }}>
              <p
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  margin: 0,
                }}
              >
                {editPost.origen} - {editPost.destino}
              </p>
              {handleServiceToShow(editPost.service)}
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#000',
                }}
              >
                <BusinessRoundedIcon
                  style={{
                    marginRight: '0.3rem',
                    fontSize: '1rem',
                  }}
                />{' '}
                {editPost.mortuary_name}
              </p>
              {handleService(editPost.service)}
              <div>
                <p style={{ margin: '0.5rem 0 2rem 0' }}>{editPost.fecha}</p>

                {editPost.cotizacion !== '' ? (
                  <p style={{ margin: '0.5rem 0 2rem 0' }}>
                    {t('Costo')} $ {editPost.cotizacion}
                  </p>
                ) : (
                  ''
                )}
                <p style={{ margin: '0.5rem 0 1rem 0' }}>
                  {editPost.nombre_finado ? (
                    <>
                      {t('NombreFinado')}: {editPost.nombre_finado}
                    </>
                  ) : (
                    ''
                  )}
                </p>
                <p style={{ margin: '0.5rem 0 1rem 0' }}>
                  {editPost.direcion_entrega ? (
                    <>
                      {t('DireccionEntrega')}: {editPost.direcion_entrega}
                    </>
                  ) : (
                    ''
                  )}
                  , {editPost.municipio ? editPost.municipio : ''} ,{' '}
                  {editPost.estado ? editPost.estado : ''}
                </p>
                <p style={{ margin: '0.5rem 0 1rem 0' }}>
                  {editPost.nombre_contacto ? (
                    <>
                      {t('NombreContacto')}: {editPost.nombre_contacto}
                    </>
                  ) : (
                    ''
                  )}
                </p>
                <p style={{ margin: '0.5rem 0 1rem 0' }}>
                  {editPost.nombre_familiar_recibe ? (
                    <>
                      {t('NombreFamiliarRecibe')}:{' '}
                      {editPost.nombre_familiar_recibe}
                    </>
                  ) : (
                    ''
                  )}
                </p>
                <p style={{ margin: '0.5rem 0 1rem 0' }}>
                  {editPost.telefono_contacto_autorizado ? (
                    <>
                      {t('TelefonoCAutorizado')}:{' '}
                      {editPost.telefono_contacto_autorizado}
                    </>
                  ) : (
                    ''
                  )}
                </p>
                <p style={{ margin: '0.5rem 0 1rem 0' }}>
                  {editPost.director_funerario ? (
                    <>
                      {t('DirectorFunerario')}: {editPost.director_funerario}
                    </>
                  ) : (
                    ''
                  )}
                </p>
                {editPost.status_transit !== undefined ? (
                  <p style={{ margin: '0.5rem 0 1rem 0' }}>
                    {editPost.status_transit === 'En MX' ? (
                      <b>{t('EnTransitoMX')}</b>
                    ) : (
                      <b>{t('EnTransitoUSA')}</b>
                    )}
                  </p>
                ) : (
                  ''
                )}
                {editPost.status_transit_2 !== undefined ? (
                  <p style={{ margin: '0.5rem 0 1rem 0' }}>
                    {editPost.status_transit_2 === 'En MX' ? (
                      <b>{t('EnTransitoMX')}</b>
                    ) : (
                      <b>{t('EnTransitoUSA')}</b>
                    )}
                  </p>
                ) : (
                  ''
                )}

                <Card className="customCard">
                  <CardContent style={{ padding: '18px', display: 'flex' }}>
                    {handleStatus(editPost.status)}
                  </CardContent>
                </Card>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default UserDetails;

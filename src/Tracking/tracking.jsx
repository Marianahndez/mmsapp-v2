/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable operator-linebreak */
/* eslint-disable react/no-array-index-key */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { blueGrey, grey } from '@mui/material/colors';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import AirportShuttleRoundedIcon from '@mui/icons-material/AirportShuttleRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import DifferenceRoundedIcon from '@mui/icons-material/DifferenceRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SendIcon from '@mui/icons-material/Send';
import {
 TextField,
 Button,
 Avatar,
 IconButton,
 Dialog,
 DialogActions,
 DialogContent,
 DialogTitle,
 RadioGroup,
 FormLabel,
 FormControlLabel,
 Radio,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import SidebarMenu from '../Menu/menu.jsx';
import { userDataService } from '../service/userData.js';
import { servicesData } from '../service/servicesData.js';
import './tracking.scss';

function Tracking() {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { getUser, userDataServObj } = userDataService();
  const { updateServicePropHandler } = servicesData();
  const [editInfo, setEditInfo] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState({});
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState('');
  const [authlistEmail, setAuthListEmail] = useState([]);
  const [authlistPhone, setAuthListPhone] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm({
    // mode: 'onChange',
  });

  useEffect(() => {
    getUser();
    setTrackingInfo(location.state.data);
    setList(location.state.data.rastreo);
    setAuthListPhone(location.state.data.auth_list_phone ? location.state.data.auth_list_phone : []);
    setAuthListEmail(location.state.data.auth_list_email ? location.state.data.auth_list_email : []);
    // console.log('got: ', location.state.data);
  }, []);

  const handleServiceToShow = (serviceValue) => {
    switch (serviceValue) {
      case 'e-ruta':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <AirportShuttleRoundedIcon className="transitionIcon" />
            {t('MOption22')}
          </p>
        );
      case 'e-punta':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <AirportShuttleRoundedIcon className="transitionIcon" />
            {t('MOption21')}
          </p>
        );
      case 't-tramites':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <AirportShuttleRoundedIcon className="transitionIcon" />
            {t('MOption2')}
          </p>
        );
      case 't-translado':
        return (
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <AirportShuttleRoundedIcon className="transitionIcon" />
            {t('MOption1')}
          </p>
        );

      default:
        break;
    }
  };

  const onSubmit = async (data) => {
    const trackObj = {
      ...data,
      edit: false,
      date: moment().format('LLL'),
    };
    list.push(trackObj);
    const rastreoObj = {
      rastreo: list,
    };
    await updateServicePropHandler(rastreoObj, params.id);
    setList(list);
    navigate(`/tracking/${params.id}`, { state: { data: trackingInfo } });
    reset({ tracking_info: '' });
  };

  const handleEditTracking = (id) => {
    const newList = list.map((item, i) => {
      if (i === id) {
        const updatedItem = {
          ...item,
          edit: !item.edit,
        };

        return updatedItem;
      }

      return item;
    });
    setList(newList);
  };

  const submitEdited = async (data) => {
    const findEdit = list.map((item, i) => {
      if (item.edit === true) {
        const updatedItem = {
          ...data,
          edit: false,
          date: moment().format('LLL'),
        };

        return updatedItem;
      }

      return item;
    });
    setList(findEdit);
    const rastreoObjEdited = {
      rastreo: findEdit,
    };
    await updateServicePropHandler(rastreoObjEdited, params.id);
    reset({ tracking_info: '' });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOption = (event) => {
    setOption(event.target.value);
  };

  const onSubmitFamily = async (data) => {
    if (option === 'correo') {
      authlistEmail.push(data.email);
      const rastreoObjEditedEmail = {
        auth_list_email: authlistEmail,
      };
      reset({ email: '' });
      await updateServicePropHandler(rastreoObjEditedEmail, params.id);
    } else {
      authlistPhone.push(data.phone);
      const rastreoObjEdited = {
        auth_list_phone: authlistPhone,
      };
      reset({ phone: '' });
      await updateServicePropHandler(rastreoObjEdited, params.id);
    }
    setOpen(false);
  };

  return (
    <div style={{ background: grey[300] }}>
      <SidebarMenu />
      <div className="mainContainer">
        <h1
          style={{
            margin: '1rem 0',
            color: blueGrey[700],
            textTransform: 'uppercase',
            fontSize: '1.7rem',
          }}
        >
          {t('Tracking')}
        </h1>

        <div className="nipDetails">
          <div className="borderBottom">
            <span>{trackingInfo.nip_rastreo}</span>{' '}
            <DifferenceRoundedIcon fontSize="large" />
          </div>
          <hr />
          <div className="tripTo">
            <p>
              <span>{t('from')}</span> {trackingInfo.origen}
            </p>
            <ArrowForwardRoundedIcon />
            <p>
              <span>{t('to')}</span> {trackingInfo.destino}
            </p>
          </div>
        </div>

        <div className="trackingDetails">
          <h3>{t('TrackingDetails')}</h3>
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
                // fontSize: '1rem',
              }}
            />
            {trackingInfo.mortuary_name}
          </p>
          {handleServiceToShow(trackingInfo.service)}
          {trackingInfo.sucursal !== undefined ? (
            <>
              <p style={{ margin: '0.5rem 0 1rem 0' }}>
                {trackingInfo.sucursal.nombre_sucursal ? (
                  <div style={{ display: 'flex' }}>
                    <LocationOnRoundedIcon /> {t('NombreSucursal')}:{' '}
                    {trackingInfo.sucursal.nombre_sucursal}
                  </div>
                ) : (
                  ''
                )}
              </p>
              <p style={{ margin: '0.5rem 0 1rem 0' }}>
                {trackingInfo.sucursal.direccion_sucursal ? (
                  <>
                    {t('Direccion')}: {trackingInfo.sucursal.direccion_sucursal}
                  </>
                ) : (
                  ''
                )}
              </p>
            </>
          ) : (
            <div style={{ display: 'flex' }}>
              <LocationOnRoundedIcon /> {t('DireccionAlterna')}:{' '}
              {trackingInfo.direccion_alterna}
            </div>
          )}
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <CalendarMonthRoundedIcon /> {t('Fecha')}: {trackingInfo.fecha}
          </p>
          <h4>Family members authorized</h4>
          {authlistPhone.length !== 0 ? (
            <>
              <p>Phones registered</p>
              {authlistPhone.map((item, i) => (
                <ul>
                  <li>{item}</li>
                </ul>
              ))}
            </>
          ) : (
            ''
          )}
          {authlistEmail.length !== 0 ? (
            <>
              <p>Emails registered</p>
              {authlistEmail.map((item, i) => (
                <ul>
                  <li>{item}</li>
                </ul>
              ))}
            </>
          ) : (
            ''
          )}
          <Button
            onClick={handleClickOpen}
            variant="contained"
            className="btnFamily"
            endIcon={<AddCircleOutlineRoundedIcon />}
          >
            Add family members
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add autorized members</DialogTitle>
            <DialogContent>
              <p style={{ marginTop: '0' }}>
                Add the authorized family members so they can have access to the tracking.
              </p>
              <form
                onSubmit={handleSubmit(onSubmitFamily)}
                id="form-family"
              >
                <RadioGroup
                  aria-labelledby="sucursales-radio"
                  name="controlled-radio-buttons-group"
                  value={option}
                  onChange={handleOption}
                >
                  <FormLabel id="sucursales-radio" style={{ marginTop: '0rem' }}>
                    Register by...
                  </FormLabel>
                  <div className="flex">
                    <FormControlLabel
                      value="correo"
                      control={<Radio />}
                      label={t('Email')}
                    />
                    <FormControlLabel
                      value="telefono"
                      control={<Radio />}
                      label={t('Telefono')}
                    />
                  </div>
                </RadioGroup>
                {option === 'correo' ? (
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label={t('Email')}
                    type="email"
                    fullWidth
                    variant="outlined"
                    {...register('email', { required: true })}
                  />
                ) : (
                  <TextField
                    autoFocus
                    margin="dense"
                    id="phone"
                    label={t('Telefono')}
                    type="number"
                    fullWidth
                    variant="outlined"
                    {...register('phone', { required: true })}
                  />
                )}
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button form="form-family" type="submit">Add</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          {/* <h3>Ajuste de rastreo</h3> */}
          {userDataServObj.role === 'Admin' ? (
            <>
              <h4 style={{ margin: '2rem 0 -1rem 0' }}>Update tracking</h4>
              <form
                onSubmit={handleSubmit(onSubmit)}
                id="hook-form-data"
                className="formTransport"
              >
                <TextField
                  {...register('tracking_info', { required: true })}
                  label={t('TrackingAdd')}
                  type="text"
                  variant="outlined"
                  style={{ marginTop: '2rem', width: '100%' }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  form="hook-form-data"
                  className="btnSendTransport"
                  endIcon={<SendIcon />}
                >
                  {t('Actualizar')}
                </Button>
              </form>
            </>
          ) : (
            ''
            // { trackingList }
          )}
        </div>
        <div className="trackingMainArea">
          <h3>{t('TrackingStatus')}</h3>
          {list.length !== 1
            ? list.map((item, i) => (
                <div className={i === 0 ? 'dnone' : 'flex trackingDetail'} key={i}>
                  {!item.edit ? (
                    <>
                      <span>
                        <Avatar>
                          <ArrowForwardRoundedIcon />
                        </Avatar>
                        <span className="poste" />
                      </span>
                      {userDataServObj.role === 'Admin' ? <p onClick={() => handleEditTracking(i)}><span>{item.date}</span> {item.tracking_info}</p> : <p><span>{item.date}</span> {item.tracking_info}</p>}
                    </>
                    ) : (
                      <form
                        onSubmit={handleSubmit(submitEdited)}
                        id="form-edit"
                        className="formTransport"
                      >
                        <TextField
                          {...register('tracking_info', { required: true })}
                          label={t('TrackingUpdate')}
                          type="text"
                          variant="outlined"
                          style={{ marginTop: '2rem', width: '100%' }}
                        />
                        <IconButton
                          type="submit"
                          form="form-edit"
                          className="updateTrack"
                        >
                          <CheckRoundedIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleEditTracking(i)}
                          className="cancelTrack"
                        >
                          <CloseRoundedIcon fontSize="small" />
                        </IconButton>
                      </form>
                  )}
                </div>
              ))
            : 'No recods yet'}
        </div>
      </div>
    </div>
  );
}
export default Tracking;

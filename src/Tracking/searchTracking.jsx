/* eslint-disable no-mixed-operators */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { blueGrey, grey } from '@mui/material/colors';
import {
  TextField,
  Button,
  InputLabel,
  InputAdornment,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import AirportShuttleRoundedIcon from '@mui/icons-material/AirportShuttleRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { userDataService } from '../service/userData.js';
import SidebarMenu from '../Menu/menu.jsx';

function SearchTracking() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getServiceTracking, service, loading } = userDataService();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isDirty, isValid },
  } = useForm({
    // mode: 'onChange',
  });
  const [serviceOpt, setService] = useState('');
  const [data, setData] = useState({});
  const [notFound, setNotFound] = useState(false);
  const list = localStorage.getItem('servList');
  const servicesList = JSON.parse(list);

  const onSubmit = (datax) => {
    const obj = {
      ...datax,
      serviceOpt,
    };
    getServiceTracking(servicesList, serviceOpt, obj);

    if (service === undefined) {
      setNotFound(true);
      setTimeout(() => {
        setNotFound(false);
        resetField('search_origen');
        resetField('search_destino');
        resetField('search');
      }, 2000);
    }
  };

  useEffect(() => {
    if (service === undefined) {
      navigate('/search-tracking');
      setNotFound(true);
      setTimeout(() => {
        setNotFound(false);
        resetField('search_origen');
        resetField('search_destino');
        resetField('search');
      }, 2000);
    } else {
      setData(service);
    }
  }, [loading, service]);

  useEffect(() => {
    if (service !== {} && data !== {} && loading) {
      navigate(`/tracking/${service.id}`, { state: { data } });
    }
  }, [data]);

  const handleChangeServices = (event) => {
    setService(event.target.value);
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
            <div className="inputSearch">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  id="hook-form-data"
                  className="formTransport"
                >
                <InputLabel id="demo-simple-select-label">
                  Elige una opción
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  defaultValue={serviceOpt}
                  onChange={handleChangeServices}
                  label="Elige una opción"
                  placeholder={t('LBLChooseService')}
                  style={{ width: '100%' }}
                >
                  <MenuItem key={1} value="nip_rastreo">
                    NIP
                  </MenuItem>
                  <MenuItem key={2} value="nombre_finado">
                    Nombre del finado
                  </MenuItem>
                  <MenuItem key={3} value="nombre_contacto">
                    Nombre del contacto autorizado
                  </MenuItem>
                  <MenuItem key={4} value="origen_destino">
                    Origen / Destino
                  </MenuItem>
                </Select>
                {serviceOpt === 'origen_destino' ? (
                    <>
                        <TextField
                          {...register('search_origen', { required: true })}
                          label="Origen"
                          type="text"
                          variant="outlined"
                          style={{ marginTop: '2rem', width: '100%' }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <AirportShuttleRoundedIcon
                                  style={{ transform: 'scaleX(-1)' }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <TextField
                          {...register('search_destino', { required: true })}
                          label="Destino"
                          type="text"
                          variant="outlined"
                          style={{ marginTop: '2rem', width: '100%' }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <AirportShuttleRoundedIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                    </>
                ) : (
                    <TextField
                      {...register('search', { required: true })}
                      label="Buscar"
                      type="text"
                      variant="outlined"
                      style={{ marginTop: '2rem', width: '100%' }}
                    />
                )}
                {(notFound) ? <Alert style={{ marginTop: '1rem' }} severity="error">No matches found</Alert> : ''}
                <Button
                  type="submit"
                  variant="contained"
                  form="hook-form-data"
                  className="btnSendTransport"
                  endIcon={<SearchRoundedIcon />}
                >
                    Buscar
                </Button>
                </form>
            </div>
        </div>
    </div>
  );
}
export default SearchTracking;

/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { grey, blueGrey } from '@mui/material/colors';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { useNavigate, useParams } from 'react-router-dom';
import LabelRoundedIcon from '@mui/icons-material/LabelRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import {
  Grid,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
  InputAdornment,
  Button,
  Card,
  CardContent,
  Checkbox,
  MenuItem,
  FormLabel,
  FormHelperText,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  updateDoc,
  doc,
  onSnapshot,
  query,
  collection,
} from 'firebase/firestore';
import { db } from '../firebase.js';
import SidebarMenu from '../Menu/menu';
import './details.scss';

function ServiceDetails() {
  const { t } = useTranslation();

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
        break;
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
        break;
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
        break;
      case 'pendiente_confirmar':
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
                {t('LBLStatusPendienteConfirmar')}
              </span>
            </div>
          </>
        );
        break;
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
        break;
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
        break;
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
        break;
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
        break;
      default:
        break;
    }
  };

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

  const params = useParams();
  const navigate = useNavigate();
  const servicesRef = collection(db, 'services');
  const [dataService, setDataService] = useState({});
  const [edited, setEdited] = useState(false);
  const [editData, setEditData] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);
  const [status, setStatus] = useState('');
  const [date, setDate] = useState<Date | null>();

  const auxArray = localStorage.getItem('arrServices')!;
  const newArr = JSON.parse(auxArray);
  console.log('dt serv: ', newArr);
  const [checkedMX, setCheckedMX] = React.useState(false);
  const [checkedUSA, setCheckedUSA] = React.useState(false);
  const [onTransit, setOnTransit] = React.useState('');
  const edit = newArr.find((i: any) => i.id === params.id);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const handleChange = (newValue: Date | null) => {
    setDate(newValue);
  };
  const [alignment, setAlignment] = React.useState<string | null>('MX');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    const q3 = query(servicesRef);
    const unsub = onSnapshot(q3, (querySnapshot3: any) => {
      const servArr: Array<any> = [];
      querySnapshot3.forEach((docx: any) => {
        const userServices = {
          id: docx.id,
          ...docx.data(),
        };
        servArr.push(userServices);
      });
      localStorage.setItem('arrServices', JSON.stringify(servArr));
    });
  }, []);

  const updateDate = (data: any) => {
    console.log('date: ', data);
    if (params.id) {
      updateDoc(doc(db, 'services', params.id), {
        ...edit,
        ...data,
      });
      navigate('/userHome', { replace: true });
      setEditData(false);
    }
  };

  const handleEdit = (todo: any) => {
    if (params.id) {
      updateDoc(doc(db, 'services', params.id), {
        cotizacion: `${todo.cotizacion} ${alignment}`,
        status: 'cotizado',
      });
      navigate('/userHome', { replace: true });
    }
  };

  const handleConfirmarTranslado = () => {
    if (params.id) {
      updateDoc(doc(db, 'services', params.id), {
        status: 'confirmado',
      });
      navigate('/userHome', { replace: true });
    }
  };

  const onSubmit = (data: any) => {
    console.log('sd admin: ', data);
    if (params.id) {
      if (status === 'papeleria-pte') {
        updateDoc(doc(db, 'services', params.id), {
          ...data,
          ...edit,
          status: 'pendiente_confirmar',
        });
        navigate('/userHome', { replace: true });
      } else if (status === 'confirmado') {
        updateDoc(doc(db, 'services', params.id), {
          ...data,
          ...edit,
          status: 'confirmado',
        });
        navigate('/userHome', { replace: true });
      } else {
        updateDoc(doc(db, 'services', params.id), {
          ...data,
          ...edit,
          status,
        });
        navigate('/userHome', { replace: true });
      }
    }
  };

  useEffect(() => {
    if (edit.cotizacion_ruta !== '' || edit.cotizacion !== '') {
      setEdited(true);
    }
    if (edit.status_transit === 'En MX' || edit.status_transit_2 === 'En MX') {
      setCheckedMX(true);
    }
    if (
      edit.status_transit === 'En USA' ||
      edit.status_transit_2 === 'En USA'
    ) {
      setCheckedUSA(true);
    }
  }, []);

  const handleChangeCheckMX = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedMX(event.target.checked);
    setOnTransit(event.target.value);
  };
  const handleChangeCheckUSA = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedUSA(event.target.checked);
    setOnTransit(event.target.value);
  };

  const updateTransit = () => {
    if (params.id) {
      if (edit.status_transit !== '' || edit.status_transit_2 !== '') {
        updateDoc(doc(db, 'services', params.id), {
          ...edit,
          status_transit_2: onTransit,
        });
        navigate('/userHome', { replace: true });
      }
      updateDoc(doc(db, 'services', params.id), {
        ...edit,
        status_transit: onTransit,
      });
      navigate('/userHome', { replace: true });
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
                {edit.origen} - {edit.destino}
              </p>
              {handleServiceToShow(edit.service)}
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
                {edit.mortuary_name}
              </p>
              <div>
                <p style={{ margin: '0.5rem 0' }}>
                  $ {edit.cotizacion || edit.cotizacion_ruta}
                </p>
                <p style={{ margin: '0.5rem 0 1rem 0' }}>
                  {edit.nombre_finado ? (
                    <>
                      {t('NombreFinado')}: {edit.nombre_finado}
                    </>
                  ) : (
                    ''
                  )}
                </p>
                <p style={{ margin: '0.5rem 0 1rem 0' }}>
                  {edit.direccion_alterna ? (
                    <>
                      {t('DireccionAlterna')}: {edit.direccion_alterna},
                    </>
                  ) : (
                    ''
                  )}
                </p>
                <p style={{ margin: '0.5rem 0 1rem 0' }}>
                  {edit.direcion_entrega ? (
                    <>
                      {t('DireccionEntrega')}: {edit.direcion_entrega},
                    </>
                  ) : (
                    ''
                  )}
                  {edit.municipio ? ` ${edit.municipio},` : ''}
                  {edit.estado ? ` ${edit.estado}.` : ''}
                </p>
                <p style={{ margin: '0.5rem 0 1rem 0' }}>
                  {edit.nombre_contacto ? (
                    <>
                      {t('NombreContacto')}: {edit.nombre_contacto}
                    </>
                  ) : (
                    ''
                  )}
                </p>
                <p style={{ margin: '0.5rem 0 1rem 0' }}>
                  {edit.nombre_familiar_recibe ? (
                    <>
                      {t('NombreFamiliarRecibe')}: {edit.nombre_familiar_recibe}
                    </>
                  ) : (
                    ''
                  )}
                </p>
                <p style={{ margin: '0.5rem 0 1rem 0' }}>
                  {edit.telefono_contacto_autorizado ? (
                    <>
                      {t('TelefonoCAutorizado')}:{' '}
                      {edit.telefono_contacto_autorizado}
                    </>
                  ) : (
                    ''
                  )}
                </p>
                <p style={{ margin: '0.5rem 0 1rem 0' }}>
                  {edit.director_funerario ? (
                    <>
                      {t('DirectorFunerario')}: {edit.director_funerario}
                    </>
                  ) : (
                    ''
                  )}
                </p>
                <p style={{ margin: '0.5rem 0 1rem 0' }}>
                  {edit.ataud ? (
                    <>
                      {t('TamanoAtaud')}: {edit.ataud}
                    </>
                  ) : (
                    ''
                  )}
                </p>
                <p style={{ margin: '0.5rem 0 1rem 0' }}>
                  {edit.notas ? (
                    <>
                      {t('Notas')}: {edit.notas}
                    </>
                  ) : (
                    ''
                  )}
                </p>
                {!editData ? (
                  <div className="editDate">
                    <div style={{ display: 'flex' }}>
                      <h3>{t('Fecha')}</h3>
                      <IconButton
                        aria-label="edit"
                        size="small"
                        onClick={() => setEditData(true)}
                      >
                        <EditRoundedIcon />
                      </IconButton>
                    </div>
                    <div>
                      <p style={{ marginTop: '0' }}>{edit.fecha}</p>
                    </div>
                  </div>
                ) : (
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <form onSubmit={handleSubmit(updateDate)}>
                      <MobileDatePicker
                        label={t('FechaRecoleccion')}
                        inputFormat="MM/dd/yyyy"
                        value={date}
                        onChange={handleChange}
                        renderInput={(datainput) => (
                          <TextField
                            style={{ marginTop: '2rem', width: '100%' }}
                            {...datainput}
                            {...register('fecha', { required: true })}
                          />
                        )}
                      />
                      <Button
                        type="submit"
                        variant="outlined"
                        className="btnUpdateDate"
                      >
                        {t('ActualizarFecha')}
                      </Button>
                    </form>
                  </LocalizationProvider>
                )}
              </div>
              {edit.status === 'pendiente_cotizar' ? (
                <form
                  onSubmit={handleSubmit(handleEdit)}
                  id="hook-form"
                  style={{ width: '100%', display: 'inline-grid' }}
                >
                  <p style={{ marginBottom: 0 }}>{t('LBLServicioDesc')}</p>
                  <div className="desktopCotizaion">
                    <TextField
                      {...register('cotizacion')}
                      label={t('Cotizacion')}
                      type="number"
                      variant="outlined"
                      style={{ marginTop: '2rem' }}
                      className="inputCotizacion"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="end">
                            <AttachMoneyRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <ToggleButtonGroup
                      value={alignment}
                      exclusive
                      onChange={handleAlignment}
                      aria-label="text alignment"
                      className="gropBtns"
                    >
                      <ToggleButton value="MX">MX</ToggleButton>
                      <ToggleButton value="USD">USD</ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                  <Button
                    variant="contained"
                    type="submit"
                    className="btnSendCotizacion"
                  >
                    {t('BtnEnviarCotizacion')}
                  </Button>
                </form>
              ) : edit.status === 'pendiente_confirmar' ? (
                <>
                  <Button
                    variant="contained"
                    className="btnHalfConfirm"
                    onClick={handleConfirmarTranslado}
                  >
                    {t('Confirmado')}
                  </Button>
                  <Button variant="contained" className="btnHalfCall">
                    <a href={`tel:${edit.telefono_funeraria}`}>{t('Llamar')}</a>
                  </Button>
                </>
              ) : changeStatus ? (
                <form
                  style={{ width: '100%' }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <TextField
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label={t('ElegirStatus')}
                    placeholder="Seleccione"
                    select
                    style={{ marginTop: '2rem', width: '100%' }}
                  >
                    {/* <MenuItem value="papeleria-pte">{t('StatusOpt1')}</MenuItem> */}
                    {/* <MenuItem value="confirmado">{t('StatusOpt2')}</MenuItem> */}
                    <MenuItem value="recoger_hoy">{t('StatusOpt3')}</MenuItem>
                    <MenuItem value="transito">{t('StatusOpt4')}</MenuItem>
                    <MenuItem value="entregado">{t('StatusOpt5')}</MenuItem>
                  </TextField>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{
                      margin: '3rem auto',
                      borderRadius: '20px',
                      padding: '1rem',
                      width: '95%',
                      background: '#01579b',
                      fontSize: '1rem',
                    }}
                  >
                    {t('ActualizarStatus')}{' '}
                    <CheckRounded style={{ marginLeft: '1rem' }} />
                  </Button>
                </form>
              ) : (
                <>
                  <Card className="customCard">
                    <CardContent style={{ padding: '18px', display: 'flex' }}>
                      {handleStatus(edit.status)}
                    </CardContent>
                  </Card>
                  <div>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkedMX}
                            onChange={handleChangeCheckMX}
                            disabled={
                              edit.status_transit === 'En MX' ||
                              edit.status_transit_2 === 'En MX'
                            }
                            value="En MX"
                          />
                        }
                        label={t('EnTransitoMX')}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkedUSA}
                            onChange={handleChangeCheckUSA}
                            value="En USA"
                            disabled={
                              edit.status_transit === 'En USA' ||
                              edit.status_transit_2 === 'En USA'
                            }
                          />
                        }
                        label={t('EnTransitoUSA')}
                      />
                      <Button
                        variant="contained"
                        type="submit"
                        style={{
                          margin: '3rem auto',
                          borderRadius: '20px',
                          padding: '1rem',
                          width: '95%',
                          background: '#000',
                          fontSize: '1rem',
                        }}
                        onClick={() => updateTransit()}
                      >
                        {t('Actualizar')}
                      </Button>
                    </FormGroup>
                  </div>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={edit.status === 'entregado'}
                    style={{
                      margin: '3rem auto',
                      borderRadius: '20px',
                      padding: '1rem',
                      width: '95%',
                      background: '#a54131',
                      fontSize: '1rem',
                    }}
                    onClick={() => setChangeStatus(true)}
                  >
                    {t('AjustarStatus')}
                  </Button>
                </>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default ServiceDetails;

/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useEffect } from 'react';
import {
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  ListSubheader,
  InputAdornment,
  IconButton,
  Grid,
  Button,
  FormHelperText,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { blueGrey, grey, lightBlue } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import FlightLandRoundedIcon from '@mui/icons-material/FlightLandRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import { useForm, Controller } from 'react-hook-form';
import { updateDoc, doc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from 'firebase/storage';
import { db, storage } from '../firebase.js';
import SidebarMenu from '../Menu/menu';
import './transport.scss';

function Transport() {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();

  const userLocalS = localStorage.getItem('userData')!;
  const userIDLocal = JSON.parse(userLocalS);
  console.log('user sucursales_ ', userIDLocal.sucursales);

  const [item, setItem] = useState({
    cotizacion: '',
    destino: '',
    fecha: '',
    origen: '',
    service: '',
    user_id: '',
    user_name: '',
    cotizacion_ruta: '',
  });
  const [branches, setBranches] = useState([]);
  const [sucursal, setSucursal] = useState('');
  const inputFile = useRef<HTMLInputElement>('' || null);

  useEffect(() => {
    const auxArray = localStorage.getItem('arrServices')!;
    const newArr = JSON.parse(auxArray);
    const editPost = newArr.find((i: any) => i.id === params.id);
    setItem(editPost);

    if (userIDLocal) {
      setBranches(userIDLocal.sucursales);
      if (branches.length === 0) {
        setSucursal('otro');
      } else {
        setSucursal('funeraria');
      }
    }
  }, []);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
  });
  // const inputRef = useRef<HTMLInputElement>('');
  const [services, setServices] = useState('');
  const [parentesco, setParentesco] = useState('');
  const [ataud, setAtaud] = useState('');
  const [value, setValue] = useState<Date | null>();
  const [radio, setRadio] = useState('');
  const [image, setImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');

  const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadio((event.target as HTMLInputElement).value);
  };

  const handleSucursal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSucursal((event.target as HTMLInputElement).value);
  };

  const handleImgObg = (e: any) => {
    console.log('inputFile.current ', e.target.files);
    if (e.target.files !== null) {
      setImage(e.target.files[0]);
    }
  };

  const handleImgObg1 = (e: any) => {
    console.log('inputFile.current1 ', e.target.files);
    if (e.target.files !== null) {
      setImage1(e.target.files[0]);
    }
  };

  const handleImgObg2 = (e: any) => {
    console.log('inputFile.current2 ', e.target.files);
    if (e.target.files !== null) {
      setImage2(e.target.files[0]);
    }
  };

  const handleImgObg3 = (e: any) => {
    console.log('inputFile.current3 ', e.target.files);
    if (e.target.files !== null) {
      setImage3(e.target.files[0]);
    }
  };

  const handleImgObg4 = (e: any) => {
    console.log('inputFile.current4 ', e.target.files);
    if (e.target.files !== null) {
      setImage4(e.target.files[0]);
    }
  };

  const onSubmit = (data: any) => {
    if (params.id) {
      if (parentesco === '') {
        updateDoc(doc(db, 'services', params.id), {
          ...data,
          ...item,
          direccion_alterna: data.direccion_alterna,
          status: 'pendiente_confirmar',
          ataud,
        });
        navigate('/userHome', { replace: true });
      } else {
        updateDoc(doc(db, 'services', params.id), {
          ...data,
          ...item,
          nombre_sucursal: parentesco,
          status: 'pendiente_confirmar',
          ataud,
        });
        navigate('/userHome', { replace: true });
      }
    }
  };

  // Example config of img upload to the firebase bucket

  const [progress, setProgress] = useState(0);

  const uploadFiles = (file: any) => {
    console.log(file);
    //
    // const storage = getStorage();
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      },
    );
  };

  const formHandler = (e: any) => {
    // e.preventDefault();
    if (e.target[0] !== undefined) {
      const file = e.target.files[0];
      console.log('up img_ ', file);
      uploadFiles(file);
    }
  };

  return (
    <div style={{ background: grey[300] }}>
      <SidebarMenu />
      <div className="mainContainer">
        <h1
          style={{
            margin: '1rem 0 0 0',
            color: blueGrey[700],
            textTransform: 'uppercase',
            fontSize: '1.7rem',
          }}
        >
          {t('SolicitarTransporte')}
        </h1>
        <p style={{ margin: '0.3rem 0 0 0' }}>{t('BLSolicitarTransporte')}</p>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ margin: '0.5rem 0' }}>
            <p
              style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 0 }}
            >
              {item.origen} - {item.destino}
            </p>
            <div>
              <p style={{ margin: '0.5rem 0' }}>
                $ {item.cotizacion || item.cotizacion_ruta}
                <span> USD</span>
              </p>
              <p style={{ margin: '0 0 2rem 0' }}>{item.fecha}</p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="hook-form-data"
              className="formTransport"
            >
              <FormLabel id="sucursales-radio" style={{ marginTop: '2rem' }}>
                {t('SitioRecoleccion')}
              </FormLabel>
              <RadioGroup
                aria-labelledby="sucursales-radio"
                name="controlled-radio-buttons-group"
                value={sucursal}
                onChange={handleSucursal}
              >
                <FormControlLabel
                  value="funeraria"
                  control={<Radio />}
                  disabled={branches.length === 0}
                  label={t('SucursalFuneraria')}
                />
                <FormControlLabel
                  value="otro"
                  control={<Radio />}
                  label={t('AnotherAddress')}
                />
              </RadioGroup>
              {sucursal === 'funeraria' ? (
                <TextField
                  value={parentesco}
                  onChange={(e) => setParentesco(e.target.value)}
                  label={t('SitioRecoleccion')}
                  placeholder="Seleccione"
                  select
                  style={{ marginTop: '2rem', width: '100%' }}
                >
                  {branches.map((valueBranch: any, i: any) => (
                    <MenuItem value={valueBranch.nombre_sucursal}>
                      {valueBranch.nombre_sucursal}
                    </MenuItem>
                  ))}
                  {/* <MenuItem value={1}>Dallas funeral - Centro</MenuItem>
                  <MenuItem value={2}>Dallas funeral - Norte</MenuItem>
                  <MenuItem value={3}>Dallas funeral - Sur</MenuItem> */}
                </TextField>
              ) : (
                <TextField
                  {...register('direccion_alterna', { required: true })}
                  label={t('AnotherAddress')}
                  type="text"
                  variant="outlined"
                  style={{ marginTop: '2rem', width: '100%' }}
                />
              )}
              <TextField
                {...register('nombre_finado', { required: true })}
                label={t('NombreFinado')}
                type="text"
                variant="outlined"
                style={{ marginTop: '2rem', width: '100%' }}
              />

              <TextField
                {...register('nombre_contacto', { required: true })}
                label={t('NombreContacto')}
                type="text"
                variant="outlined"
                style={{ marginTop: '2rem', width: '100%' }}
              />

              <TextField
                {...register('telefono_contacto_autorizado', {
                  required: true,
                })}
                label={t('TelefonoCAutorizado')}
                type="number"
                variant="outlined"
                style={{ marginTop: '2rem', width: '100%' }}
              />

              <TextField
                {...register('parentesco', { required: true })}
                label={t('Parentesco')}
                type="text"
                variant="outlined"
                style={{ marginTop: '2rem', width: '100%' }}
              />

              <TextField
                {...register('nombre_familiar_recibe', { required: true })}
                label={t('NombreFamiliarRecibe')}
                type="text"
                variant="outlined"
                style={{ marginTop: '2rem', width: '100%' }}
              />

              <TextField
                {...register('director_funerario', { required: true })}
                label={t('DirectorFunerario')}
                type="text"
                variant="outlined"
                style={{ marginTop: '2rem', width: '100%' }}
              />

              <TextField
                {...register('telefono_funeraria', { required: true })}
                label={t('TelefonoDeLaFuneraria')}
                type="number"
                variant="outlined"
                style={{ marginTop: '2rem', width: '100%' }}
              />

              <TextField
                {...register('direcion_entrega', { required: true })}
                label={t('DireccionEntrega')}
                type="text"
                variant="outlined"
                style={{ marginTop: '2rem', width: '100%' }}
              />

              <TextField
                {...register('municipio', { required: true })}
                label={t('Municipio')}
                type="text"
                variant="outlined"
                style={{ marginTop: '2rem', width: '100%' }}
              />

              <TextField
                {...register('estado', { required: true })}
                label={t('Estado')}
                type="text"
                variant="outlined"
                style={{ marginTop: '2rem', width: '100%' }}
              />
              <TextField
                value={ataud}
                onChange={(e) => setAtaud(e.target.value)}
                label={t('TamanoAtaud')}
                placeholder="Seleccione"
                select
                style={{ marginTop: '2rem', width: '100%' }}
                aria-describedby="my-helper-text"
              >
                <MenuItem value={t('TamanoAtaud1')}>
                  {t('TamanoAtaud1')}
                </MenuItem>
                <MenuItem value={t('TamanoAtaud2')}>
                  {t('TamanoAtaud2')}
                </MenuItem>
                <MenuItem value="Oversize X">Oversize X</MenuItem>
                <MenuItem value="Oversize 2X">Oversize 2X</MenuItem>
                <MenuItem value="Oversize 3X">Oversize 3X</MenuItem>
                <MenuItem value="Oversize 4X">Oversize 4X</MenuItem>
                <MenuItem value="Combo">Combo</MenuItem>
              </TextField>
              <FormHelperText id="my-helper-text">
                *{t('DatoSensible')}
              </FormHelperText>
              <TextField
                {...register('notas')}
                label={t('Notas')}
                type="text"
                variant="outlined"
                style={{
                  marginTop: '2rem',
                  width: '100%',
                  marginBottom: '2rem',
                }}
              />

              <FormLabel
                id="demo-controlled-radio-buttons-group"
                style={{ width: '100%' }}
              >
                {t('DocumentacionTranslado')}
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={radio}
                onChange={handleRadio}
              >
                <FormControlLabel
                  value="presencial"
                  control={<Radio />}
                  label={t('EntregaPapeleriaChofer')}
                />
                <FormControlLabel
                  value="subirPapeleria"
                  control={<Radio />}
                  label={t('SubirPapeleria')}
                />
              </RadioGroup>
              <div>
                {radio === 'subirPapeleria' ? (
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ textAlign: 'center' }}>
                      {t('LBLSubirPapeleria')}
                    </p>
                    <hr />
                    <input
                      id="icon-button-file"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImgObg}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton component="span">
                        <AddPhotoAlternateRoundedIcon fontSize="large" />
                        <h5>{t('ActaDefuncion')}</h5>
                      </IconButton>
                    </label>
                    <h2>Uploading done {progress}%</h2>
                    <Button variant="text" onClick={formHandler}>
                      Subir doc
                    </Button>
                    <hr />
                    <input
                      id="icon-button-file1"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImgObg1}
                    />
                    <label htmlFor="icon-button-file1">
                      <IconButton component="span">
                        <AddPhotoAlternateRoundedIcon fontSize="large" />
                        <h5>{t('PermisoTransito')}</h5>
                      </IconButton>
                    </label>
                    <hr />
                    <input
                      id="icon-button-file2"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImgObg2}
                    />
                    <label htmlFor="icon-button-file2">
                      <IconButton component="span">
                        <AddPhotoAlternateRoundedIcon fontSize="large" />
                        <h6 style={{ fontSize: '1.1rem' }}>
                          {t('ConstanciaCuerpo')}
                        </h6>
                      </IconButton>
                    </label>
                    <hr />
                    <input
                      id="icon-button-file3"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImgObg3}
                    />
                    <label htmlFor="icon-button-file3">
                      <IconButton component="span">
                        <AddPhotoAlternateRoundedIcon fontSize="large" />
                        <h5>{t('VisadoConsular')}</h5>
                      </IconButton>
                    </label>
                    <hr />
                    <input
                      id="icon-button-file4"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImgObg4}
                    />
                    <label htmlFor="icon-button-file4">
                      <IconButton component="span">
                        <AddPhotoAlternateRoundedIcon fontSize="large" />
                        <h5>{t('FinishedDocument')}</h5>
                      </IconButton>
                    </label>
                  </div>
                ) : (
                  ''
                )}
              </div>

              <Button
                type="submit"
                variant="contained"
                form="hook-form-data"
                className="btnSendTransport"
                endIcon={<SendIcon />}
                disabled={radio === ''}
              >
                {t('SolicitarTransporte')}
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default Transport;

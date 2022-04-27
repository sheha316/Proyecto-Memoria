/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import {
  Container, Box, Radio, RadioGroup, TextField, FormLabel,
  Button, FormControl, FormControlLabel, Grid, InputAdornment, Stack,
  Select, MenuItem, FormHelperText, Paper,
} from '@mui/material';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { validate, clean, format } from 'rut.js';
import es from 'date-fns/locale/es';
import * as dateFns from 'date-fns';
import api from '../../API/api';
import {
  COLOR_BASE_2, COLOR_BUTTON_1, COLOR_BUTTON_2, COLOR_BASE_1,
} from '../../constantes';
import Stepper from '../Componentes/Stepper';
import './NumberInputAsText.css';

function IngresarDatos() {
  const history = useNavigate();
  const {
    hora, dia, medico, OpcionesDeBusquedaSeleccionada, area,
  } = useLocation().state;
  function TextFieldInput(id, placeholder, onChange, values, errors, touched, onBlur) {
    return (

      <Grid
        container
        style={{
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        }}
      >
        <Grid item xs={4}>
          <FormLabel sx={{ color: (errors[id] && touched[id]) ? 'yellow' : 'white' }}>
            {id}
            :
          </FormLabel>
        </Grid>
        <Grid item xs={8} style={{ display: 'table-column' }}>
          <TextField
            id={id}
            name={id}
            onChange={onChange}
            onBlur={onBlur}
            type={id === 'Teléfono' ? 'number' : ''}
            placeholder={placeholder}
            value={(id === 'Rut' && values[id].length > 0) ? format(values[id]) : values[id]}
            sx={{
              marginTop: 1, width: 300, backgroundColor: 'white', input: { color: 'black' }, borderRadius: 1,
            }}
            InputProps={{
              startAdornment: id === 'Teléfono' ? <InputAdornment position="start">+56</InputAdornment> : '',
            }}

          />
          <FormHelperText sx={{ color: 'yellow' }}>{(errors[id] && touched[id]) ? errors[id] : ''}</FormHelperText>
        </Grid>
      </Grid>
    );
  }
  function NacionalidadRadio(onChange, values, touched) {
    return (
      <Grid
        container
        style={{
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        }}
      >
        <Grid item xs={4}>
          <FormLabel sx={{ color: 'white' }}>
            Nacionalidad
            :
          </FormLabel>
        </Grid>
        <Grid item xs={8} style={{ display: 'flex' }}>
          <FormControl sx={{ width: '100%' }}>
            <RadioGroup
              row
              sx={{ marginBottom: 2 }}
              id="Nacionalidad"
              name="Nacionalidad"
              defaultValue="Chileno"
              touched={touched}
              onChange={onChange}
              value={values.Nacionalidad}
            >
              <FormControlLabel
                sx={{ color: 'white' }}
                value="Chileno"
                control={(
                  <Radio
                    disableRipple
                    sx={{
                      '&, &.Mui-checked': {
                        color: 'white',
                      },
                    }}
                  />
)}
                label="Chileno"
              />
              <FormControlLabel
                sx={{ color: 'white' }}
                value="Extranjero"
                control={(
                  <Radio
                    disableRipple
                    sx={{
                      '&, &.Mui-checked': {
                        color: 'white',
                      },
                    }}
                  />
                )}
                label="Extranjero"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {' '}

      </Grid>
    );
  }
  function PrevisionSelector(id, onChange, values, errors, touched, onBlur) {
    const previsiones = [
      'CONVENIO',
      'CONVENIO LABORATORIOS EXTERNOS',
      'FONASA (FONDO NACIONAL DE SALUD)',
      'ISALUD ISAPRE DE CODELCO LIMITADA',
      'ISAPRE BANMEDICA',
      'ISAPRE COLMENA',
      'ISAPRE CONSALUD',
      'ISAPRE CRUZ BLANCA',
      'ISAPRE CRUZ DEL NORTE',
      'ISAPRE FUNDACION',
      'ISAPRE NUEVA MASVIDA',
      'ISAPRE VIDA TRES',
      'PARTICULAR',
    ];
    return (
      <Grid
        container
        style={{
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        }}
      >
        <Grid item xs={4}>
          <FormLabel sx={{ color: (errors[id] && touched[id]) ? 'yellow' : 'white' }}>
            Previsión:
          </FormLabel>
        </Grid>
        <Grid item xs={8} style={{ display: 'flex' }}>
          <FormControl sx={{ width: '100%' }}>
            <Select
              id={id}
              name={id}
              onChange={onChange}
              touched={touched}
              value={values[id]}
              onBlur={onBlur}
              displayEmpty
              sx={{
                marginTop: 1,
                width: 300,
                backgroundColor: 'white',
                input: { color: 'black' },
                borderRadius: 1,
              }}
            >
              <MenuItem disabled value="">
                <em className="PrevisionPlaceHolder">{id}</em>
              </MenuItem>
              {previsiones.map((elemento) => (
                <MenuItem key={elemento} value={elemento}>
                  {elemento}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: 'yellow' }}>{(errors[id] && touched[id]) ? errors[id] : ''}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
  function FechaNacimiento(onChange, values, errors, touched, onBlur) {
    const textFieldStyle = {
      marginTop: 1, backgroundColor: 'white', input: { color: 'black' }, borderRadius: 1, width: 81,
    };
    return (

      <Grid
        container
        style={{
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        }}
      >
        <Grid item xs={4}>
          <FormLabel sx={{
            color:
             (errors.diaNacimiento && touched.diaNacimiento)
             || (errors.mesNacimiento && touched.mesNacimiento)
             || (errors.añoNacimiento && touched.añoNacimiento)
               ? 'yellow' : 'white',
          }}
          >
            Fecha de Nacimiento:
          </FormLabel>
        </Grid>
        <Grid item xs={8} style={{}}>
          <Stack direction="row" spacing={3.5}>
            <Stack spacing={2}>
              <TextField
                id="diaNacimiento"
                name="diaNacimiento"
                onChange={onChange}
                onBlur={onBlur}
                placeholder="2"
                type="number"
                value={values.diaNacimiento}
                sx={textFieldStyle}
              />
              {' '}
              <FormHelperText sx={{ color: 'yellow' }}>{(errors.diaNacimiento && touched.diaNacimiento) ? errors.diaNacimiento : ''}</FormHelperText>

            </Stack>
            <Stack spacing={2}>
              <TextField
                id="mesNacimiento"
                name="mesNacimiento"
                onChange={onChange}
                onBlur={onBlur}
                placeholder="10"
                type="number"
                value={values.mesNacimiento}
                sx={textFieldStyle}
              />
              {' '}
              <FormHelperText sx={{ color: 'yellow' }}>{(errors.mesNacimiento && touched.mesNacimiento) ? errors.mesNacimiento : ''}</FormHelperText>

            </Stack>
            <Stack spacing={2}>
              <TextField
                id="añoNacimiento"
                name="añoNacimiento"
                onChange={onChange}
                type="number"
                onBlur={onBlur}
                placeholder="1990"
                value={values.añoNacimiento}
                sx={textFieldStyle}
              />
              {' '}
              <FormHelperText sx={{ color: 'yellow' }}>{(errors['añoNacimiento'] && touched['añoNacimiento']) ? errors['añoNacimiento'] : ''}</FormHelperText>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    );
  }
  function Formulario() {
    const handleSubmit = (values) => {
      console.log(values);
      console.log(hora, dia, medico, OpcionesDeBusquedaSeleccionada, area);
    };
    const validationSchema = Yup.object().shape({
      Nacionalidad: Yup.string().required(''),
      Nombres: Yup.string().required('Debes ingresar tus nombres'),
      añoNacimiento: Yup.number().required('Ingrese un año').min(1900, 'Año inválido').max(2020, 'Año Invalido'),
      mesNacimiento: Yup.number().required('Ingrese un mes').min(1, 'Mes inválido').max(12, 'Mes inválido'),
      diaNacimiento: Yup.number().required('Ingrese un dia').min(1, 'Dia inválido').max(31, 'Dia inválido'),
      Apellidos: Yup.string().required('Debes ingresar tus apellidos'),
      Email: Yup.string().email('Correo inválido').required('Debes ingresar un correo'),
      Teléfono: Yup.string().required('Debes ingresar un teléfono de contacto').matches(/[0-9]+/, 'Teléfono inválido').length(9, 'Debes ingresar 9 dígitos'),
      Pasaporte: Yup.string().when('Nacionalidad', (nacionalidad) => {
        if (nacionalidad === 'Extranjero') {
          return Yup.string().required('Debes ingresar un Pasaporte');
        }
        return Yup.string();
      }),
      Rut: Yup.string().when('Nacionalidad', (nacionalidad) => {
        if (nacionalidad === 'Chileno') {
          return Yup.string().required('Debes ingresar un Rut').test('Rut inválido', 'Rut inválido', (rut) => validate(clean(rut)));
        }
        return Yup.string();
      }),
      Previsión: Yup.string().required('Debe seleccionar una previsión'),

    });
    const initialValues = {
      Rut: '',
      Pasaporte: '',
      Nombres: '',
      Apellidos: '',
      Email: '',
      Teléfono: '',
      Nacionalidad: 'Chileno',
      añoNacimiento: '',
      mesNacimiento: '',
      diaNacimiento: '',
      Previsión: '',

    };
    return (
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form>
            <Paper
              elevation={4}
              sx={{
                display: 'grid',
                borderRadius: 5,
                backgroundColor: COLOR_BASE_2,
                marginTop: 1,
              }}
            >
              <Box sx={{
                padding: 2, borderRadius: 5,
              }}
              >

                <FormControl sx={{ width: '100%' }}>
                  {NacionalidadRadio(handleChange, values, touched)}
                  {values.Nacionalidad === 'Chileno'
                 && TextFieldInput('Rut', '102586808', handleChange, values, errors, touched, handleBlur)}
                  {values.Nacionalidad !== 'Chileno'
                 && TextFieldInput('Pasaporte', '102586808', handleChange, values, errors, touched, handleBlur)}
                  {TextFieldInput('Nombres', 'Álvaro Eduardo', handleChange, values, errors, touched, handleBlur)}
                  {TextFieldInput('Apellidos', 'Gómez Sanches', handleChange, values, errors, touched, handleBlur)}
                  {TextFieldInput('Email', 'ejemplo@gmail.com', handleChange, values, errors, touched, handleBlur)}
                  {TextFieldInput('Teléfono', '123456789', handleChange, values, errors, touched, handleBlur)}
                  {PrevisionSelector('Previsión', handleChange, values, errors, touched, handleBlur)}
                  {FechaNacimiento(handleChange, values, errors, touched, handleBlur)}
                </FormControl>

              </Box>
            </Paper>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                type="submit"
                sx={{
                  marginTop: 2, color: 'white', alignSelf: 'flex-end', backgroundColor: COLOR_BUTTON_1, ':hover': { backgroundColor: COLOR_BUTTON_2 },
                }}
              >
                Confirmar Reserva
              </Button>
            </Box>

          </Form>
        )}
      </Formik>
    );
  }
  function ObtenerHoraSegunBloque(bloque) {
    let horafinal = 8 + Math.floor(bloque / 2);
    if (horafinal > 12) {
      horafinal += 1;
    }
    let textoHora = '';
    if (horafinal < 10) {
      textoHora = `0${horafinal}:`;
    } else {
      textoHora = `${horafinal}:`;
    }
    return `${textoHora}${bloque % 2 === 0 ? '00' : '30'}`;
  }
  function RecordatorioSeleccionLabel(texto) {
    return (
      <FormLabel sx={{ color: 'black', margin: 1, marginLeft: 2 }}>{texto}</FormLabel>
    );
  }
  function RecordatorioSeleccionLabelTirulo(texto) {
    return (
      <Box sx={{ display: 'grid' }}>
        <FormLabel sx={{
          color: 'White',
          backgroundColor: COLOR_BASE_1,
          borderRadius: 5,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          padding: 2,
          fontWeight: 'bold',
        }}
        >
          {texto}
        </FormLabel>
      </Box>
    );
  }
  function RecordatorioSeleccionProfesional() {
    return (
      <Paper
        elevation={4}
        sx={{
          display: 'grid',
          borderRadius: 5,
        }}
      >
        {RecordatorioSeleccionLabelTirulo('Profesional')}
        <Box sx={{ display: 'inline-flex' }}>

          <Paper
            elevation={4}
            sx={{
              display: 'flex', marginTop: 1, marginLeft: 2, height: 90,
            }}
          >

            <img
              style={{
                width: 90, height: 90,
              }}
              alt=""
              src={medico.genero === 'm'
                ? 'https://img.freepik.com/foto-gratis/doctor-brazos-cruzados-sobre-fondo-blanco_1368-5790.jpg?w=2000'
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIIMvIYUfgxZwSZRb3XHS1umgQjcMuaE9N9Q&usqp=CAU'}
            />
          </Paper>
          <Box sx={{ display: 'grid', marginLeft: 2, padding: 1 }}>
            {RecordatorioSeleccionLabel(`${medico.genero === 'm' ? 'Dr:' : 'Dra:'} ${medico.nombre} ${medico.apellido}`)}
            {RecordatorioSeleccionLabel(`Especialidad: ${medico.especializacion}`)}
          </Box>
        </Box>

      </Paper>
    );
  }
  function RecordatorioSeleccionDate(fecha, horafinal) {
    return (
      <Paper
        elevation={4}
        sx={{
          display: 'grid',
          borderRadius: 5,
        }}
      >
        {RecordatorioSeleccionLabelTirulo('Fecha y Hora')}
        {RecordatorioSeleccionLabel(`Fecha: ${fecha}`)}
        {RecordatorioSeleccionLabel(`Hora: ${horafinal}`)}
      </Paper>
    );
  }
  function RecordatorioSeleccionSucursal(sucursal) {
    return (
      <Paper
        elevation={4}
        sx={{
          display: 'grid',
          borderRadius: 5,
        }}
      >
        {RecordatorioSeleccionLabelTirulo('Sucursal')}

        {RecordatorioSeleccionLabel(`Direccion: ${sucursal}`)}
      </Paper>
    );
  }
  function RecordatorioSeleccion() {
    const fecha = dateFns.format(dia, 'PPPPpppp', { locale: es }).split(' a las')[0];
    const horafinal = ObtenerHoraSegunBloque(hora);
    return (
      <Box sx={{ marginTop: 4 }}>
        <Stack spacing={4}>

          {RecordatorioSeleccionProfesional()}
          {RecordatorioSeleccionDate(fecha, horafinal)}
          {RecordatorioSeleccionSucursal(medico.sucursal)}
        </Stack>
      </Box>
    );
  }

  return (
    <Container>
      <Stepper OpcionesDeBusquedaSeleccionada={OpcionesDeBusquedaSeleccionada} area={area} step={2} search={`${OpcionesDeBusquedaSeleccionada}: ${area.especializacion}`} />
      <Box sx={{ marginTop: 5, width: '100%' }}>
        <Grid
          container
          style={{
            display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
          }}
        >
          <Grid item xs={4}>
            {RecordatorioSeleccion()}
          </Grid>
          <Grid item xs={6}>
            <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>
              Ingrese sus datos
            </FormLabel>

            {Formulario()}
          </Grid>

        </Grid>
      </Box>
    </Container>
  );
}

export default IngresarDatos;

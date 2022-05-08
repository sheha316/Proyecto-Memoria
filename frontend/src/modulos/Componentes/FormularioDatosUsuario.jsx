/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box, Grid, Stack, FormLabel, FormControl, RadioGroup,
  FormControlLabel, Radio, FormHelperText, InputAdornment, TextField,
  MenuItem, Select, Button, Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { validate, clean, format } from 'rut.js';
import {
  COLOR_BASE_2, COLOR_BUTTON_1, COLOR_BUTTON_2, RUTAS_HORA_RESERVADA,
} from '../../constantes';
import '../../css/NumberInputAsText.css';
import api from '../../API/api';

function FechaNacimiento(onChange, values, errors, touched, onBlur) {
  const textFieldStyle = {
    marginTop: 1, backgroundColor: 'white', input: { color: 'black' }, borderRadius: 1, width: 81,
  };
  const { diaNacimiento, mesNacimiento, añoNacimiento } = values;
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
              placeholder="30"
              type="number"
              value={diaNacimiento}
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
              placeholder="6"
              type="number"
              value={mesNacimiento}
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
              value={añoNacimiento}
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
function NacionalidadRadio(onChange, values, touched) {
  const { Nacionalidad } = values;
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
            value={Nacionalidad}
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
          autoComplete="on"
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
const saveOnLocalWeb = (values) => {
  localStorage.setItem('userForm', JSON.stringify(values));
};
const getInitialValues = (storedValues) => storedValues || {
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
const stringToFechaFormat = (a, m, d) => {
  let string = `${a}-`;
  if (m < 10) {
    string += '0';
  }
  string += `${m}-`;
  if (d < 10) {
    string += '0';
  }
  string += `${d}`;
  return string;
};
const retrieveLocalWebStore = () => {
  const storedValues = JSON.parse(localStorage.getItem('userForm'));
  const initialValues = getInitialValues(storedValues);
  return initialValues;
};
function Formulario({ medico, hora, dia }) {
  const history = useNavigate();

  const handleSubmit = async (values) => {
    saveOnLocalWeb(values);
    delete medico.dates;
    delete medico.disponible;
    const valores = {
      ...values,
      Bloque: hora,
      Fecha_cita: dia.toISOString().split('T')[0],
      Medico: medico,
      Rut: format(values.Rut),
      Fecha_nacimiento: stringToFechaFormat(
        values.añoNacimiento,
        values.mesNacimiento,
        values.diaNacimiento,
      ),
    };
    delete valores.añoNacimiento;
    delete valores.mesNacimiento;
    delete valores.diaNacimiento;
    const respuesta = await api.postCreateCita(valores);
    history(
      RUTAS_HORA_RESERVADA,
      {
        state: {
          mensaje: respuesta.message,
          cita: respuesta.cita,
        },
      },
    );
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

  const initialValues = retrieveLocalWebStore();

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
      }) => (
        <Form autoComplete="on">
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
                 && TextFieldInput('Rut', '10258680k', handleChange, values, errors, touched, handleBlur)}
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

export default Formulario;

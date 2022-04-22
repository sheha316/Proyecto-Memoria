/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import {
  Container, Box, Radio, RadioGroup, TextField, FormLabel,
  Button, FormControl, FormControlLabel, Grid, InputAdornment,
  Select, MenuItem, FormHelperText,
} from '@mui/material';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { validate, clean, format } from 'rut.js';
import api from '../../API/api';
import {
  COLOR_BASE_2, COLOR_BUTTON_1, COLOR_BUTTON_2,
} from '../../constantes';
import Stepper from '../Componentes/Stepper';

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
        <Grid item xs={6}>
          <FormLabel sx={{ color: (errors[id] && touched[id]) ? 'yellow' : 'white' }}>
            {id}
            :
          </FormLabel>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id={id}
            name={id}
            onChange={onChange}
            onBlur={onBlur}
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
        <Grid item xs={6}>
          <FormLabel sx={{ color: 'white' }}>
            Nacionalidad
            :
          </FormLabel>
        </Grid>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <FormLabel sx={{ color: (errors[id] && touched[id]) ? 'yellow' : 'white' }}>
            Previsión:
          </FormLabel>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ width: '100%' }}>
            <Select
              id={id}
              name={id}
              onChange={onChange}
              touched={touched}
              value={values[id]}
              onBlur={onBlur}
              sx={{
                marginTop: 1,
                width: 300,
                backgroundColor: 'white',
                input: { color: 'black' },
                borderRadius: 1,
              }}
            >
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
  function Formulario() {
    const handleSubmit = (values) => {
      console.log(values);
    };
    const validationSchema = Yup.object().shape({
      Nacionalidad: Yup.string().required(''),
      Nombres: Yup.string().required('Debes ingresar tus nombres'),
      Apellidos: Yup.string().required('Debes ingresar tus apellidos'),
      Email: Yup.string().email('Correo inválido').required('Debes ingresar un correo'),
      Teléfono: Yup.string().required('Debes ingresar un teléfono de contacto').matches(/[0-9]+/, 'Teléfono inválido').length(9, 'Debes ingresar 9 dígitos'),
      Pasaporte: Yup.string().when('Nacionalidad', (nacionalidad) => {
        if (nacionalidad === 'Extranjero') {
          return Yup.string().required('Debes ingresar un Pasaporte');
        }
      }),
      Rut: Yup.string().when('Nacionalidad', (nacionalidad) => {
        if (nacionalidad === 'Chileno') {
          return Yup.string().required('Debes ingresar un Rut').test('Rut inválido', 'Rut inválido', (rut) => validate(clean(rut)));
        }
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
            <Box sx={{
              backgroundColor: COLOR_BASE_2, padding: 5, marginTop: 1, borderRadius: 5,
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
              </FormControl>

            </Box>
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
  return (
    <Container>
      <Stepper OpcionesDeBusquedaSeleccionada={OpcionesDeBusquedaSeleccionada} area={area} step={2} search={`${OpcionesDeBusquedaSeleccionada}: ${area.especializacion}`} />
      <Box sx={{ marginTop: 5, width: '100%' }}>
        <FormLabel sx={{ color: 'black' }}>
          Ingresar Datos del Paciente
        </FormLabel>
        {Formulario()}
      </Box>
    </Container>
  );
}

export default IngresarDatos;

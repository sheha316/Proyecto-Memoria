/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import {
  Container, Box, Radio, RadioGroup, TextField, FormLabel,
  Button, FormControl, FormControlLabel, Grid,
} from '@mui/material';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

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

  function TextFieldInput(id, placeholder, onChange, values, errors, touched) {
    return (

      <Grid
        container
        style={{
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        }}
      >
        <Grid item xs={6}>

          <FormLabel sx={{ color: 'white' }}>
            {id}
            :
          </FormLabel>
        </Grid>
        <Grid item xs={6}>

          <TextField
            id={id}
            name={id}
            placeholder={placeholder}
            error={errors[id] && touched[id]}
            sx={{
              marginTop: 1, width: 300, backgroundColor: 'white', input: { color: 'black' }, borderRadius: 1,
            }}
            helperText={(errors[id] && touched[id]) ? errors[id] : ''}
            onChange={() => {
              console.log('hola');
            }}
          />
        </Grid>
      </Grid>
    );
  }
  function NacionalidadRadio(handleBlur) {
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
          <RadioGroup
            row
            sx={{ marginBottom: 2 }}
            name="Nacionalidad"
            defaultValue="Chileno"
            handleBlur={handleBlur}
          >
            <FormControlLabel
              sx={{ color: 'white' }}
              value="Chileno"
              control={<Radio sx={{ color: 'white' }} />}
              label="Chileno"
            />
            <FormControlLabel sx={{ color: 'white' }} value="Extranjero" control={<Radio sx={{ colorSecondary: 'white' }} />} label="Extranjero" />
          </RadioGroup>
        </Grid>
        {' '}

      </Grid>
    );
  }
  function Formulario() {
    const handleSubmit = (values) => {
      console.log('Hola');
    };
    const validationSchema = true;

    return (
      <Formik
        initialValues={{ }}
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
              backgroundColor: COLOR_BASE_2, padding: 5, marginTop: 1,
            }}
            >
              <FormControl sx={{ width: '100%' }}>
                {NacionalidadRadio(touched)}
                {TextFieldInput('Rut', '102586808', handleChange, values, errors, touched)}
                {TextFieldInput('Nombres', 'Álvaro Eduardo', handleChange, values, errors, touched)}
                {TextFieldInput('Apellido paterno', 'Gómez', handleChange, values, errors, touched)}
                {TextFieldInput('Apellido materno', 'Sánchez', handleChange, values, errors, touched)}
                {TextFieldInput('Email', 'ejemplo@gmail.com', handleChange, values, errors, touched)}
                {TextFieldInput('Telefono', '123456789', handleChange, values, errors, touched)}
              </FormControl>

            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                type="submit"
                sx={{
                  marginTop: 2, color: 'white', alignSelf: 'flex-end', backgroundColor: COLOR_BUTTON_1, ':hover': { backgroundColor: COLOR_BUTTON_2 },
                }}
              >
                Siguiente
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    );
  }

  return (
    <Container>
      <Stepper step={2} search={`${OpcionesDeBusquedaSeleccionada}: ${area.especializacion}`} />
      <Box sx={{ marginTop: 5, width: '100%' }}>
        {Formulario()}
      </Box>
    </Container>
  );
}

export default IngresarDatos;

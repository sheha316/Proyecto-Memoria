/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box, Grid, FormLabel, FormControl, RadioGroup,
  FormControlLabel, Radio, FormHelperText, InputAdornment, TextField,
  Button, Paper,
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { validate, clean, format } from 'rut.js';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  COLOR_BASE_2, COLOR_BUTTON_1, COLOR_BUTTON_2,
} from '../../constantes';
import '../../css/NumberInputAsText.css';

function NacionalidadRadio(onChange, values, touched, setId, fontSize, fontSizeRadio) {
  const { Nacionalidad } = values;
  return (
    <Grid
      container
      style={{
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      }}
    >
      <Grid item xs={4}>
        <FormLabel sx={{ color: 'white', fontSize }}>
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
            onChange={(e) => {
              setId(e.target.value === 'Chileno' ? 'Rut' : 'Pasaporte');
              onChange(e);
            }}
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
              label={<span style={{ fontSize: fontSizeRadio }}>Chileno</span>}
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
              label={<span style={{ fontSize: fontSizeRadio }}>Extranjero</span>}
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      {' '}

    </Grid>
  );
}
function TextFieldInput(id, placeholder, onChange, values, errors, touched, onBlur, fontSize) {
  return (

    <Grid
      container
      style={{
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      }}
    >
      <Grid item xs={4}>
        <FormLabel sx={{ color: (errors[id] && touched[id]) ? 'yellow' : 'white', fontSize }}>
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
            marginTop: 1, width: '90%', backgroundColor: 'white', input: { color: 'black' }, borderRadius: 1,
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
function FormularioCancelar({ initialValues, setId, handleSubmit }) {
  const theme = useTheme();
  const fontSize = useMediaQuery(theme.breakpoints.down('sm')) ? '0.9rem' : '1rem';
  const fontSizeRadio = useMediaQuery(theme.breakpoints.down('sm')) ? '0.75rem' : '1rem';
  const validationSchema = Yup.object().shape({
    Nacionalidad: Yup.string().required(''),
    Email: Yup.string().email('Correo inválido').required('Debes ingresar un correo'),
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
  });
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
                {NacionalidadRadio(handleChange, values, touched, setId, fontSize, fontSizeRadio)}
                {values.Nacionalidad === 'Chileno'
                 && TextFieldInput('Rut', '10258680k', handleChange, values, errors, touched, handleBlur, fontSize)}
                {values.Nacionalidad !== 'Chileno'
                 && TextFieldInput('Pasaporte', '102586808', handleChange, values, errors, touched, handleBlur, fontSize)}
                {TextFieldInput('Email', 'ejemplo@gmail.com', handleChange, values, errors, touched, handleBlur, fontSize)}

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
              Siguiente
            </Button>
          </Box>

        </Form>
      )}
    </Formik>
  );
}

export default FormularioCancelar;

/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable max-len */
import { Container, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormControl from '@mui/material/FormControl';
import {
  COLOR_BASE_2, COLOR_BUTTON_1, COLOR_BUTTON_2, RUTAS_RESERVAR_HORA_AREA,
} from '../../constantes';
import Stepper from '../Componentes/Stepper';
import api from '../../API/api';

function ReservarHoras() {
  const history = useNavigate();
  const OpcionesDeBusqueda = ['Área Médica', 'Médico Especialista'];
  const [OpcionesDeBusquedaSeleccionada, setOpcionesDeBusquedaSeleccionada] = useState(OpcionesDeBusqueda[0]);

  const [areaMedica, setAreaMedica] = useState([]);
  const [medicos, setMedicos] = useState([]);

  const [AreaSeleccionada, setAreaSeleccionada] = useState({});
  const [medicoSeleccionado, setMedicoSeleccionado] = useState({});

  useEffect(async () => {
    setAreaMedica(await api.getSpecs());
    setMedicos(await api.getMedicos());
  }, []);

  function AutocompleteAreaMedica() {
    const handleSubmit = (values) => {
      history(RUTAS_RESERVAR_HORA_AREA, { state: { area: values.areaSeleccionada, OpcionesDeBusquedaSeleccionada } });
    };
    const validationSchema = Yup.object().shape({
      areaSeleccionada: Yup.object().shape({
        especializacion: Yup.string()
          .required('Debes seleccionar un área médica'),
        profesion: Yup.string()
          .required('Debes seleccionar un área médica'),
      })
        .required('Debes seleccionar un área médica')
        .nullable(),
    });
    return (
      <Formik
        initialValues={{ areaSeleccionada: { especializacion: '', profesion: '' } }}
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
              <FormControl warning={errors.areaSeleccionada && touched.areaSeleccionada} sx={{ width: '100%' }}>
                <FormLabel sx={{ color: (errors.areaSeleccionada && touched.areaSeleccionada) ? 'yellow' : 'white' }}>
                  Seleccione Área Médica
                </FormLabel>
                <Autocomplete
                  id="areaSeleccionada"
                  name="areaSeleccionada"
                  options={areaMedica}
                  groupBy={(option) => `--${option.profesion}--`}
                  getOptionLabel={(option) => option.especializacion}
                  onChange={(e, value) => {
                    setFieldValue(
                      'areaSeleccionada',
                      value,
                    );
                    setAreaSeleccionada(value);
                  }}
                  onBlur={handleBlur}
                  value={values.areaSeleccionada}
                  error={errors.areaSeleccionada?.especializacion && touched.areaSeleccionada?.especializacion}
                  sx={{
                    marginTop: 1, width: 300, backgroundColor: 'white', input: { color: 'black' }, borderRadius: 1,
                  }}
                  renderInput={(params) => <TextField {...params} label="" />}
                />
                <FormHelperText xs={{ color: 'yellow' }}>
                  {(errors.areaSeleccionada && touched.areaSeleccionada)
                    ? (
                      <span style={{ color: 'yellow' }}>
                        {console.log(errors.areaSeleccionada, errors.areaSeleccionada?.especializacion)}
                        {errors.areaSeleccionada?.especializacion || errors.areaSeleccionada}
                      </span>
                    )
                    : ''}
                </FormHelperText>
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
      <Stepper step={0} search={`por ${OpcionesDeBusquedaSeleccionada}`} />
      <Box sx={{ marginTop: 5, width: '100%' }}>
        <FormLabel sx={{ color: 'black' }}>Método de Búsqueda</FormLabel>
        <RadioGroup
          row
          sx={{ marginBottom: 2 }}
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue={OpcionesDeBusqueda[0]}
          onChange={(e) => setOpcionesDeBusquedaSeleccionada(e.target.value)}
        >
          <FormControlLabel value={OpcionesDeBusqueda[0]} control={<Radio />} label={OpcionesDeBusqueda[0]} />
          <FormControlLabel value={OpcionesDeBusqueda[1]} control={<Radio />} label={OpcionesDeBusqueda[1]} />
        </RadioGroup>
        <FormLabel sx={{ color: 'black' }}>
          Buscar por
          {' '}
          {OpcionesDeBusquedaSeleccionada}
        </FormLabel>

        {OpcionesDeBusqueda[0] === OpcionesDeBusquedaSeleccionada && areaMedica.length > 0 && AutocompleteAreaMedica()}

      </Box>
    </Container>
  );
}

export default ReservarHoras;

/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button, Box,
  Paper, FormControl, FormLabel, Grid,
  TextField, FormHelperText, Autocomplete, RadioGroup, FormControlLabel, Radio,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { List } from 'react-virtualized';
import {
  RUTAS_CANCELAR_RESERVAS, secondary,
} from '../../constantes';

const WIDTHINPUT = '85%';
function getrowHeight(itemSize) {
  return itemSize;
}
const ListboxComponent = React.forwardRef((
  props,
  ref,
) => {
  const { children, role, ...other } = props;
  const childrenaux = children[0].props.children[1].props.children;
  const itemCount = Array.isArray(childrenaux) ? childrenaux.length : 0;
  const itemSize = 36;

  return (
    <div ref={ref}>
      <div {...other}>
        <List
          width={900}
          height={250}
          rowHeight={(a) => getrowHeight(itemSize, a, children)}
          overscanCount={5}
          rowRenderer={(props) => React.cloneElement(childrenaux[props.index], {
            style: props.style,
          })}
          role={role}
          rowCount={itemCount}
        />
      </div>
    </div>
  );
});
function getLabel(option, opcionBusqueda, tipo) {
  if (opcionBusqueda === 'Área Médica') {
    return option.especializacion;
  }
  if (option.nombre === '') {
    return option.nombre;
  }
  if (tipo === 0) {
    return `${option.nombre} ${option.apellido} ${option.especializacion}`;
  }
  return `${option.nombre} ${option.apellido} ${option.especializacion}`;
}

function AutocompleteForm({
  handleSubmit,
  opcionBusqueda,
  setOpcionBusqueda,
  opciones,
  OpcionesDeBusqueda,
  seter,
}) {
  const history = useNavigate();
  let validationSchema;
  let initialValues;
  let id; const groupBy = 'profesion';
  if (opcionBusqueda === 'Área Médica') {
    validationSchema = Yup.object().shape({
      areaSeleccionada: Yup.object().shape({
        especializacion: Yup.string().required('Debes seleccionar un área médica'),
        profesion: Yup.string().required('Debes seleccionar un área médica'),
      })
        .required('Debes seleccionar un área médica')
        .nullable(),
    });
    initialValues = { areaSeleccionada: { especializacion: '', profesion: '' } };
    id = 'areaSeleccionada';
  } else {
    validationSchema = Yup.object().shape({
      medicoSeleccionado: Yup.object().shape(
        {
          nombre: Yup.string().required('Debes seleccionar un medico'),
          apellido: Yup.string().required('Debes seleccionar un medico'),
          especializacion: Yup.string().required('Debes seleccionar un medico'),
        },
      ).required('Debes seleccionar un área médica').nullable(),
    });
    initialValues = { medicoSeleccionado: { nombre: '', apellido: '', especializacion: '' } };
    id = 'medicoSeleccionado';
  }
  const ToCancelarHora = () => {
    history(RUTAS_CANCELAR_RESERVAS);
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
        handleBlur,
        setFieldValue,
      }) => (
        <Form>

          <Paper
            elevation={4}
            sx={{
              backgroundColor: secondary, padding: 5, marginTop: 1, borderRadius: 5,
            }}
          >

            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{ marginBottom: 2 }}
            >
              <Grid item>
                <FormLabel sx={{ color: 'white', fontWeight: 'bold' }}>
                  Buscar por:
                </FormLabel>
              </Grid>
              <Grid item>
                <RadioGroup
                  row
                  defaultValue={OpcionesDeBusqueda[0]}
                  onChange={(e) => setOpcionBusqueda(e.target.value)}
                >
                  <FormControlLabel
                    value={OpcionesDeBusqueda[0]}
                    sx={{ color: 'white' }}
                    control={(
                      <Radio sx={{
                        '&, &.Mui-checked': {
                          color: 'white',
                        },
                      }}
                      />
)}
                    label={OpcionesDeBusqueda[0]}
                  />
                  <FormControlLabel
                    value={OpcionesDeBusqueda[1]}
                    sx={{ color: 'white' }}
                    control={(
                      <Radio sx={{
                        '&, &.Mui-checked': {
                          color: 'white',
                        },
                      }}
                      />
)}
                    label={OpcionesDeBusqueda[1]}
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <FormControl warning={errors[id] && touched[id]} sx={{ width: '100%' }}>
              <FormLabel sx={{ color: (errors[id] && touched[id]) ? 'yellow' : 'white', fontWeight: 'bold' }}>
                Seleccione
                {' '}
                {opcionBusqueda}
              </FormLabel>
              <Autocomplete
                id={id}
                name={id}
                ListboxComponent={opcionBusqueda === 'Área Médica' ? '' : ListboxComponent}
                options={opciones}
                groupBy={(option) => {
                  if (opcionBusqueda === '') {
                    return `--${option[groupBy]}--`;
                  }
                }}
                renderOption={(props, option) => (
                  <Box component="li" {...props} key={option._id}>
                    {getLabel(option, opcionBusqueda, 0)}
                  </Box>
                )}
                getOptionLabel={(option) => getLabel(option, opcionBusqueda, 1)}
                onChange={(e, value) => {
                  setFieldValue(
                    id,
                    value,
                  );
                  seter(value);
                }}
                onBlur={handleBlur}
                value={values[id]}
                error={errors[id]?.especializacion
                     && touched[id]?.especializacion}
                sx={{
                  marginTop: 1,
                  width: WIDTHINPUT,
                  backgroundColor: 'white',
                  input: { color: 'black' },
                  borderRadius: 1,
                  overflow: 'auto',
                  border: 0,
                  borderColor: 'yellow',
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                  />
                )}
              />
              <FormHelperText xs={{ color: 'yellow' }}>
                {(errors[id] && touched[id])
                  ? (
                    <span style={{ color: 'yellow' }}>
                      {errors[id]?.especializacion || errors[id]}
                    </span>
                  )
                  : ''}
              </FormHelperText>
            </FormControl>

          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="secondary"
              style={{
                marginTop: 2,
                alignSelf: 'flex-end',
              }}
              onClick={ToCancelarHora}
            >
              ¿Cancelar Hora?
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="success"
              sx={{
                marginTop: 2,
                alignSelf: 'flex-end',
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
export default AutocompleteForm;

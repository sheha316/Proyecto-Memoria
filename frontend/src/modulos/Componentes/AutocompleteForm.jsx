/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button, Box,
  Paper, FormControl, FormLabel,
  TextField, FormHelperText, Autocomplete,
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { List } from 'react-virtualized';
import { COLOR_BASE_2, COLOR_BUTTON_1, COLOR_BUTTON_2 } from '../../constantes';

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
  opciones,
  seter,
}) {
  let validationSchema;
  let initialValues;
  let id;
  const groupBy = 'profesion';
  if (opcionBusqueda === 'Área Médica') {
    validationSchema = Yup.object().shape({
      areaSeleccionada: Yup.object().shape({
        especializacion: Yup.string()
          .required('Debes seleccionar un área médica'),
        profesion: Yup.string()
          .required('Debes seleccionar un área médica'),
      })
        .required('Debes seleccionar un área médica')
        .nullable(),
    });
    initialValues = { areaSeleccionada: { especializacion: '', profesion: '' } };
    id = 'areaSeleccionada';
  } else {
    validationSchema = Yup.object().shape({
      medicoSeleccionado: Yup.object().required('Debes seleccionar un medico').nullable(),
    });
    initialValues = { medicoSeleccionado: { nombre: '', apellido: '', especializacion: '' } };
    id = 'medicoSeleccionado';
  }
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
              backgroundColor: COLOR_BASE_2, padding: 5, marginTop: 1, borderRadius: 5,
            }}
          >
            <FormControl warning={errors[id] && touched[id]} sx={{ width: '100%' }}>
              <FormLabel sx={{ color: (errors[id] && touched[id]) ? 'yellow' : 'white' }}>
                Seleccione
                {' '}
                {opcionBusqueda}
              </FormLabel>
              <Autocomplete
                id={id}
                name={id}
                ListboxComponent={opcionBusqueda === 'Área Médica' ? '' : ListboxComponent}
                options={opciones}
                renderOption={(props, option) => (
                  <Box component="li" {...props} key={option._id}>
                    {getLabel(option, opcionBusqueda, 0)}
                  </Box>
                )}
                groupBy={(option) => {
                  if (opcionBusqueda === 'Área Médica') {
                    return `--${option[groupBy]}--`;
                  }
                }}
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
export default AutocompleteForm;

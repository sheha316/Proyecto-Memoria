/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Button, Box,
  Paper, FormControl, Grid,
  TextField, FormHelperText, Autocomplete, Stack,
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { List } from 'react-virtualized';
import SearchIcon from '@mui/icons-material/Search';
import {
  secondary,
} from '../../constantes';

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
  const itemSize = 50;
  const size = [800, 150];

  return (
    <div ref={ref} {...other}>
      <List
        style={{ width: '100%', top: -10 }}
        width={size[0]}
        height={size[1]}
        rowHeight={(a) => getrowHeight(itemSize, a, children)}
        overscanCount={5}
        rowRenderer={(props) => React.cloneElement(childrenaux[props.index], {
          style: props.style,
        })}
        role={role}
        rowCount={itemCount}
      />
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
  selected,
}) {
  const [label, setLabel] = useState(`${opcionBusqueda}...`);
  let validationSchema;
  let initialValues;
  let id;
  const groupBy = 'profesion';
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
              backgroundColor: selected ? secondary : 'gray', padding: 5, marginTop: 1, borderRadius: 5,
            }}
          >
            <FormControl onClick={() => { setLabel(''); }} warning={errors[id] && touched[id] && selected} sx={{ width: '100%' }}>
              <Stack direction="row">
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Grid
                    item
                    xs={10.5}
                    sx={{
                      backgroundColor: 'white',
                      input: { color: 'black' },
                      borderRadius: 1,
                      border: 0,
                      borderColor: 'yellow',
                    }}
                  >

                    <Autocomplete
                      id={id}
                      name={id}
                      disabled={!selected}
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
                      onBlur={(e) => {
                        handleBlur(e);
                        if (values.areaSeleccionada?.especializacion === ''
                      || values.medicoSeleccionado?.especializacion === '') {
                          setLabel(`${opcionBusqueda}...`);
                        }
                      }}
                      value={values[id]}
                      error={errors[id]?.especializacion
                      && touched[id]?.especializacion && selected}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={label}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={1} style={{ height: '100%' }}>
                    <Button color="success" variant="contained" sx={{ height: '100%' }} type="submit" disabled={!selected}>
                      <SearchIcon />
                    </Button>
                  </Grid>
                  <Grid item xs={1} style={{ height: '100%' }} />
                </Grid>
              </Stack>
              <FormHelperText xs={{ color: 'yellow' }}>
                {(errors[id] && touched[id] && selected)
                  ? (
                    <span style={{ color: 'yellow' }}>
                      {errors[id]?.especializacion || errors[id]}
                    </span>
                  )
                  : ''}
              </FormHelperText>

            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }} />
          </Paper>

        </Form>
      )}
    </Formik>
  );
}
export default AutocompleteForm;

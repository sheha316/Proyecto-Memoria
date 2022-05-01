/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Button, Box,
  Paper, FormControl, FormLabel,
  TextField, FormHelperText,
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { List } from 'react-virtualized';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import Popper from '@mui/material/Popper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import { COLOR_BASE_2, COLOR_BUTTON_1, COLOR_BUTTON_2 } from '../../constantes';

function getLabel(option, opcionBusqueda) {
  if (opcionBusqueda === 'Área Médica') {
    return option.especializacion;
  }
  return `${option.nombre} ${option.apellido}`;
}

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: Number(style.top) + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1]}
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef < HTMLDivElement > ((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef < VariableSizeList > (null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = [];
  children.forEach((item, { childrens }) => {
    itemData.push(item);
    itemData.push(...(item.childrens || []));
  });

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (child.hasOwnProperty('group')) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
};
const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});
function AutocompleteForm({
  handleSubmit,
  opcionBusqueda,
  opciones,
  seter,
}) {
  let validationSchema;
  let initialValues;
  let id;
  let groupBy;
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
    groupBy = 'profesion';
  } else {
    validationSchema = Yup.object().shape({
      medicoSeleccionado: Yup.object().required('Debes seleccionar un medico').nullable(),
    });
    initialValues = { medicoSeleccionado: { nombre: '', apellido: '' } };
    id = 'medicoSeleccionado';
    groupBy = 'especializacion';
  }
  console.log(opcionBusqueda, opciones, initialValues, id, groupBy);
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
                disableListWrap
                PopperComponent={StyledPopper}
                ListboxComponent={ListboxComponent}
                options={opciones}
                renderOption={(props, option) => (
                  <Box component="li" {...props} key={option._id}>
                    {getLabel(option, opcionBusqueda)}
                  </Box>
                )}
                groupBy={(option) => `--${option[groupBy]}--`}
                getOptionLabel={(option) => getLabel(option, opcionBusqueda)}
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
                  marginTop: 1, width: 300, backgroundColor: 'white', input: { color: 'black' }, borderRadius: 1, overflow: 'auto',
                }}
                renderInput={(params) => (<TextField {...params} label="" />)}

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

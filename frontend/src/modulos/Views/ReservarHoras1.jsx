/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import { Container, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { COLOR_BASE_2 } from '../../constantes';
import Stepper from '../Componentes/Stepper';
import api from '../../API/api';

function ReservarHoras1() {
  const OpcionesDeBusqueda = ['Por Área Medica', 'Por Medico Especialista'];
  const [OpcionesDeBusquedaSeleccionada, setOpcionesDeBusquedaSeleccionada] = useState(OpcionesDeBusqueda[0]);
  const [areaMedica, setAreaMedica] = useState([]);

  useEffect(() => {
    setAreaMedica(api.getSpecs());
  }, []);
  function AutocompleteAreaMedica() {
    return (
      <Autocomplete
        options={areaMedica}
        groupBy={(option) => `--${option.profesion}--`}
        getOptionLabel={(option) => option.especializacion}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="With categories" />}
      />
    );
  }
  return (
    <Container>
      <Stepper step={1} search={OpcionesDeBusquedaSeleccionada} />
      <Box sx={{ marginTop: 5 }}>
        <FormControl>
          <FormLabel sx={{ color: 'black' }}>Metodo de Busqueda</FormLabel>
          <RadioGroup
            row
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
            {OpcionesDeBusquedaSeleccionada}
          </FormLabel>
          <Box sx={{ backgroundColor: COLOR_BASE_2 }}>
            <FormLabel sx={{ color: 'white' }}>
              Seleccione Área Medica
            </FormLabel>
            {AutocompleteAreaMedica()}
          </Box>
        </FormControl>
      </Box>
    </Container>
  );
}

export default ReservarHoras1;

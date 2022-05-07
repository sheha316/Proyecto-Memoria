/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Radio, RadioGroup, FormLabel, FormControlLabel,
} from '@mui/material';
import {
  RUTAS_RESERVAR_HORA_AREA, RUTAS_RESERVAR_HORA_CON_MEDICO,
} from '../../constantes';
import Stepper from '../Componentes/Stepper';
import api from '../../API/api';
import AutocompleteForm from '../Componentes/AutocompleteForm';

function ReservarHoras() {
  const history = useNavigate();
  const OpcionesDeBusqueda = ['Área Médica', 'Médico Especialista'];
  const [OpcionesDeBusquedaSeleccionada,
    setOpcionesDeBusquedaSeleccionada] = useState(OpcionesDeBusqueda[0]);

  const [areaMedica, setAreaMedica] = useState([]);
  const [medicos, setMedicos] = useState([]);

  const [AreaSeleccionada, setAreaSeleccionada] = useState({});
  const [medicoSeleccionado, setMedicoSeleccionado] = useState({});

  useEffect(() => {
    async function getData() {
      setAreaMedica(await api.getSpecs());
      setMedicos(await api.getMedicos());
    }
    getData();
  }, []);
  const handleSubmitEspecialista = (values) => {
    console.log(values);
    history(
      RUTAS_RESERVAR_HORA_CON_MEDICO,
      {
        state: {
          medico: [values.medicoSeleccionado],
          OpcionesDeBusquedaSeleccionada,
        },
      },
    );
  };
  const handleSubmitAreaMedica = (values) => {
    history(
      RUTAS_RESERVAR_HORA_AREA,
      {
        state: {
          area: values.areaSeleccionada,
          OpcionesDeBusquedaSeleccionada,
        },
      },
    );
  };
  return (
    <Container>
      <Stepper step={0} search={`por ${OpcionesDeBusquedaSeleccionada}`} />
      <Box sx={{ marginTop: 5, width: '100%' }}>
        <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>Método de Búsqueda</FormLabel>
        <RadioGroup
          row
          sx={{ marginBottom: 2 }}
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue={OpcionesDeBusqueda[0]}
          onChange={(e) => setOpcionesDeBusquedaSeleccionada(e.target.value)}
        >
          <FormControlLabel
            value={OpcionesDeBusqueda[0]}
            control={<Radio />}
            label={OpcionesDeBusqueda[0]}
          />
          <FormControlLabel
            value={OpcionesDeBusqueda[1]}
            control={<Radio />}
            label={OpcionesDeBusqueda[1]}
          />
        </RadioGroup>

        <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>
          Buscar por
          {' '}
          {OpcionesDeBusquedaSeleccionada}
        </FormLabel>

        {OpcionesDeBusqueda[0] === OpcionesDeBusquedaSeleccionada
         && areaMedica.length > 0 && (
         <AutocompleteForm
           handleSubmit={handleSubmitAreaMedica}
           opcionBusqueda={OpcionesDeBusquedaSeleccionada}
           opciones={areaMedica}
           seter={setAreaSeleccionada}
         />
        )}
        {OpcionesDeBusqueda[1] === OpcionesDeBusquedaSeleccionada
         && medicos.length > 0
         && (
         <AutocompleteForm
           handleSubmit={handleSubmitEspecialista}
           opcionBusqueda={OpcionesDeBusquedaSeleccionada}
           opciones={medicos}
           seter={setMedicoSeleccionado}
         />
         )}
      </Box>
    </Container>
  );
}

export default ReservarHoras;

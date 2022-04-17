/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable max-len */
import { Container, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Calendario from '../Componentes/Calendario';
import TablaMedicos from '../Componentes/TablaMedicos';
import {
  COLOR_BASE_2, COLOR_BUTTON_1, COLOR_BUTTON_2, SUCURSAL_1, SUCURSAL_2, SUCURSAL_3, SUCURSAL_4,
} from '../../constantes';
import Stepper from '../Componentes/Stepper';
import api from '../../API/api';

function ReservarHorasArea() {
  const history = useNavigate();
  const { OpcionesDeBusquedaSeleccionada, area } = useLocation().state;
  const [sucursal, setSucursal] = useState(SUCURSAL_1);

  console.log(area, OpcionesDeBusquedaSeleccionada);

  const optionsSucursales = () => {
    const sucursales = [SUCURSAL_1, SUCURSAL_2, SUCURSAL_3, SUCURSAL_4];
    return (
      <Box>
        <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>Seleccione Sucursal</FormLabel>
        <RadioGroup
          defaultValue={sucursales[0]}
          onChange={(e) => setSucursal(e.target.value)}
        >
          {sucursales.map((sucursalOptions) => (
            <FormControlLabel key={sucursalOptions} value={sucursalOptions} control={<Radio />} label={sucursalOptions} />
          ))}
        </RadioGroup>
      </Box>
    );
  };
  const optionCalendario = () => (
    <Box>
      <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>Seleccione Fecha</FormLabel>
      <Calendario />
    </Box>
  );
  const optionMedicos = () => (
    <Box>
      <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>Seleccione Profesional y Hora</FormLabel>
      <TablaMedicos />
    </Box>
  );
  return (
    <Container>
      <Stepper step={1} search={OpcionesDeBusquedaSeleccionada} />
      <Box sx={{ marginTop: 5, width: '100%' }}>
        {optionsSucursales()}
        {optionCalendario()}
        {optionMedicos()}
      </Box>
    </Container>
  );
}

export default ReservarHorasArea;

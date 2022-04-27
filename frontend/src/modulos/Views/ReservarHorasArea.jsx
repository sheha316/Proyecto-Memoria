/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container, Box, Radio, RadioGroup, FormLabel, FormControlLabel, Grid,
} from '@mui/material';
import Calendario from '../Componentes/Calendario';
import TablaMedicos from '../Componentes/TablaMedicos';
import api from '../../API/api';
import {
  SUCURSAL_1, SUCURSAL_2, SUCURSAL_3, SUCURSAL_4,
} from '../../constantes';
import Stepper from '../Componentes/Stepper';

function ReservarHorasArea() {
  const { OpcionesDeBusquedaSeleccionada, area } = useLocation().state;
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
  const [sucursalBase, setSucursalBase] = useState(-1);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date(2022, 3, 19));
  const [medicos, setMedicos] = useState({});
  const [agendasMedicos, setAgendasMedicos] = useState({});

  const sucursales = [SUCURSAL_1, SUCURSAL_2, SUCURSAL_3, SUCURSAL_4];

  const getBaseSucursal = () => {
    for (let i = 0; i < sucursales.length; i++) {
      if (medicos[sucursales[i].split(',')[0]] !== undefined && medicos[sucursales[i].split(',')[0]].length !== 0) {
        setSucursalBase(i);
        setSucursalSeleccionada(sucursales[i]);
        return;
      }
    }
  };
  useEffect(async () => {
    setMedicos(await api.getAllMedicosBySpec(area.especializacion));
  }, []);
  useEffect(() => {
    getBaseSucursal(sucursales);
  }, [medicos]);
  useEffect(async () => {
    // setAgendasMedicos({});
    if (Object.keys(medicos).length !== 0) {
      setAgendasMedicos(await api.getAgendas(medicos[sucursalSeleccionada.split(',')[0]]));
    }
  }, [sucursalSeleccionada]);

  const optionsSucursales = () => (
    <Box>
      <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>Seleccione Sucursal</FormLabel>

      <RadioGroup
        defaultValue={sucursales[sucursalBase]}
        sx={{ marginTop: 1 }}
        onChange={(e) => setSucursalSeleccionada(e.target.value)}
      >
        {sucursales.map((sucursalOptions) => (
          <FormControlLabel
            style={{ width: 'fit-content' }}
            key={sucursalOptions}
            value={sucursalOptions}
            control={<Radio />}
            label={sucursalOptions}
            disabled={medicos[sucursalOptions.split(',')[0]].length === 0}
          />
        ))}
      </RadioGroup>

    </Box>
  );
  const optionCalendario = () => (
    <Box>
      <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>Seleccione Fecha</FormLabel>
      <Calendario
        agendasMedicos={agendasMedicos}
        fecha={fechaSeleccionada}
        setFecha={setFechaSeleccionada}
      />
    </Box>
  );
  const optionMedicos = () => (
    <Box>
      <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>Seleccione Profesional y Hora</FormLabel>
      <TablaMedicos
        dia={fechaSeleccionada}
        agendasMedicos={agendasMedicos}
        medicos={medicos[sucursalSeleccionada.split(',')[0]]}
        OpcionesDeBusquedaSeleccionada={OpcionesDeBusquedaSeleccionada}
        area={area}
      />
    </Box>
  );
  return (
    <Container>
      <Stepper step={1} search={`${OpcionesDeBusquedaSeleccionada}: ${area.especializacion}`} />
      <Box sx={{ marginTop: 5, width: '100%' }}>
        <Grid container spacing={2}>

          {sucursalBase !== -1 && (
            <Grid item xs={6}>
              {optionsSucursales()}
            </Grid>
          )}

          {Object.keys(agendasMedicos).length !== 0 && (
            <Grid item xs={6}>
              {optionCalendario()}
            </Grid>
          )}
          {Object.keys(agendasMedicos).length !== 0 && (
          <Grid item xs={12}>
            {optionMedicos()}
          </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default ReservarHorasArea;

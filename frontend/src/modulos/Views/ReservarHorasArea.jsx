/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container, Box, Radio, RadioGroup, FormLabel, FormControlLabel, Grid,
} from '@mui/material';
import api from '../../API/api';
import {
  SUCURSAL_1, SUCURSAL_2, SUCURSAL_3, SUCURSAL_4,
} from '../../constantes';
import Stepper from '../Componentes/Stepper';
import newDate from '../../utilities/newDate';
import Calendario from '../Componentes/Calendario';
import TablaMedicos from '../Componentes/TablaMedicos';

function ReservarHorasArea() {
  const { OpcionesDeBusquedaSeleccionada, area } = useLocation().state;
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
  const [sucursalBase, setSucursalBase] = useState(-1);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [medicos, setMedicos] = useState({});
  const [agendasMedicos, setAgendasMedicos] = useState({});
  const [medicosFiltrados, setMedicosFiltrados] = useState({});
  const [agendasMedicosFiltrados, setAgendasMedicosFiltrados] = useState({});

  const sucursales = [SUCURSAL_1, SUCURSAL_2, SUCURSAL_3, SUCURSAL_4];
  function FiltrarDatos() {
    if (sucursalSeleccionada === '') {
      return;
    }
    if (sucursalSeleccionada === 'cualquiera') {
      setMedicosFiltrados(null);
      setAgendasMedicosFiltrados(null);
    } else {
      const FirstDate = agendasMedicos[sucursalSeleccionada.split(',')[0]].primerDia.split('-');
      setFechaSeleccionada(new Date(FirstDate[0], FirstDate[1] - 1, FirstDate[2]));
      setMedicosFiltrados(medicos[sucursalSeleccionada.split(',')[0]]);
      setAgendasMedicosFiltrados(agendasMedicos[sucursalSeleccionada.split(',')[0]]);
    }
  }
  useEffect(() => {
    const getBaseSucursal = (medicox) => {
      for (let i = 0; i < sucursales.length; i++) {
        if (medicox[sucursales[i].split(',')[0]] !== undefined && medicox[sucursales[i].split(',')[0]].length !== 0) {
          return i;
        }
      }
      return 0;
    };
    async function getData() {
      console.log('Init', new Date());
      const medicosAux = await api.getAllMedicosBySpec(area.especializacion);
      setMedicos(medicosAux);
      const sucursalAux = getBaseSucursal(medicosAux);
      const agendasAux = await api.getAgendas(sucursales, medicosAux);
      setAgendasMedicos(agendasAux);
      const FirstDate = agendasAux[sucursales[sucursalAux].split(',')[0]].primerDia.split('-');
      setFechaSeleccionada(new Date(FirstDate[0], FirstDate[1] - 1, FirstDate[2]));
      setSucursalBase(sucursalAux);
      setSucursalSeleccionada(sucursales[sucursalAux]);
      console.log('End', new Date());
    }
    getData();
  }, []);
  useEffect(() => {
    FiltrarDatos();
  }, [sucursalSeleccionada]);
  const optionsSucursales = () => (

    <RadioGroup
      row
      defaultValue={sucursales[sucursalBase]}
      sx={{ marginTop: 1 }}
      onChange={(e) => { setSucursalSeleccionada(e.target.value); }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={1}> hola2</Grid>
        {sucursales.map((sucursalOptions) => (
          <Grid key={sucursalOptions} item xs={2}>
            <FormControlLabel
              style={{ width: 'fit-content' }}
              key={sucursalOptions}
              value={sucursalOptions}
              control={<Radio />}
              label={sucursalOptions}
              disabled={medicos[sucursalOptions.split(',')[0]]?.length === 0}
            />
          </Grid>
        ))}
        <Grid item xs={1}> hola2</Grid>
      </Grid>
    </RadioGroup>

  );
  const optionCalendario = () => (
    <Box>
      <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>Seleccione Fecha y Profesional</FormLabel>
      <Calendario
        agendasMedicos={agendasMedicosFiltrados}
        fecha={fechaSeleccionada}
        setFecha={setFechaSeleccionada}
      />
      <TablaMedicos
        dia={fechaSeleccionada}
        agendasMedicos={agendasMedicosFiltrados}
        medicos={medicosFiltrados}
        OpcionesDeBusquedaSeleccionada={OpcionesDeBusquedaSeleccionada}
        area={area}
        sucursalSeleccionada={sucursalSeleccionada}
      />
    </Box>
  );
  return (
    <Container>
      <Stepper step={1} search={`${OpcionesDeBusquedaSeleccionada}: ${area.especializacion}`} />
      <Box sx={{ marginTop: 5, width: '100%' }}>
        <Grid container spacing={2}>

          {sucursalBase !== -1 && (
            <Grid item xs={12}>
              <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>Seleccione Sucursal</FormLabel>
              {optionsSucursales()}
            </Grid>
          )}

          {Object.keys(medicosFiltrados).length !== 0 && Object.keys(agendasMedicosFiltrados).length !== 0 && fechaSeleccionada !== '' && (
            <Grid item xs={12}>
              {optionCalendario()}
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default ReservarHorasArea;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container, Box, Radio, RadioGroup, FormLabel, FormControlLabel, Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import api from '../../API/api';
import {
  SUCURSAL_1, SUCURSAL_2, SUCURSAL_3, SUCURSAL_4,
} from '../../constantes';
import Stepper from '../Componentes/Stepper';
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
  const theme = useTheme();
  const cellphone = useMediaQuery(theme.breakpoints.down('md'));
  const sucursales = [SUCURSAL_1, SUCURSAL_2, SUCURSAL_3, SUCURSAL_4];
  function FiltrarDatos() {
    if (sucursalSeleccionada === '') {
      return;
    }
    if (sucursalSeleccionada === 'Todas Las Sucursales') {
      setMedicosFiltrados(
        medicos[SUCURSAL_1.split(',')[0]]
          .concat(
            medicos[SUCURSAL_2.split(',')[0]],
            medicos[SUCURSAL_3.split(',')[0]],
            medicos[SUCURSAL_4.split(',')[0]],
          ),
      );
      setAgendasMedicosFiltrados({
        Medicos: agendasMedicos[SUCURSAL_1.split(',')[0]].Medicos
          .concat(
            agendasMedicos[SUCURSAL_2.split(',')[0]].Medicos,
            agendasMedicos[SUCURSAL_3.split(',')[0]].Medicos,
            agendasMedicos[SUCURSAL_4.split(',')[0]].Medicos,
          ),
        agendas: agendasMedicos[SUCURSAL_1.split(',')[0]].agendas
          .concat(
            agendasMedicos[SUCURSAL_2.split(',')[0]].agendas,
            agendasMedicos[SUCURSAL_3.split(',')[0]].agendas,
            agendasMedicos[SUCURSAL_4.split(',')[0]].agendas,
          ),
        primerDia: Math.min(agendasMedicos[SUCURSAL_1.split(',')[0]].primerDia
          .concat(
            agendasMedicos[SUCURSAL_2.split(',')[0]].primerDia,
            agendasMedicos[SUCURSAL_3.split(',')[0]].primerDia,
            agendasMedicos[SUCURSAL_4.split(',')[0]].primerDia,
          )),
      });
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
      const medicosAux = await api.getAllMedicosBySpec(area.especializacion);
      setMedicos(medicosAux);
      const sucursalAux = getBaseSucursal(medicosAux);
      const agendasAux = await api.getAgendas(sucursales, medicosAux);
      setAgendasMedicos(agendasAux);
      const FirstDate = agendasAux[sucursales[sucursalAux].split(',')[0]].primerDia.split('-');
      setFechaSeleccionada(new Date(FirstDate[0], FirstDate[1] - 1, FirstDate[2]));
      setSucursalBase(sucursalAux);
      setSucursalSeleccionada(sucursales[sucursalAux]);
    }
    getData();
  }, []);
  useEffect(() => {
    FiltrarDatos();
  }, [sucursalSeleccionada]);
  const optionsSucursales = () => (

    <RadioGroup
      row={cellphone}
      defaultValue={sucursales[sucursalBase]}
      sx={{ marginTop: 2 }}
      onChange={(e) => { setSucursalSeleccionada(e.target.value); }}
    >
      <Grid
        container
        direction={cellphone ? 'column' : 'row'}
        justifyContent="center"
        alignItems={cellphone ? 'flex-start' : 'center'}
      >
        {sucursales.map((sucursalOptions) => (
          <Grid key={sucursalOptions} item xs={2}>
            <FormControlLabel
              style={{ width: 'fit-content' }}
              key={sucursalOptions}
              value={sucursalOptions}
              control={<Radio />}
              label={<span style={{ fontSize: cellphone ? 16 : null }}>{sucursalOptions}</span>}
              disabled={medicos[sucursalOptions.split(',')[0]]?.length === 0}
            />
          </Grid>
        ))}
        <FormControlLabel
          style={{ width: 'fit-content' }}
          value="Todas Las Sucursales"
          control={<Radio />}
          label={<span style={{ fontSize: cellphone ? 16 : null }}>Todas Las Sucursales</span>}
        />

      </Grid>
    </RadioGroup>

  );
  return (
    <Container>
      <Stepper step={1} search={`${OpcionesDeBusquedaSeleccionada}: ${area.especializacion}`} />
      <Box sx={{ marginTop: 5, width: '100%' }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >

          {sucursalBase !== -1 && (
            <Grid item xs={12}>
              <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>Seleccione Sucursal</FormLabel>
              {optionsSucursales()}
            </Grid>
          )}

          {Object.keys(medicosFiltrados).length !== 0 && Object.keys(agendasMedicosFiltrados).length !== 0 && fechaSeleccionada !== '' && (
            <Grid item sx={{ marginTop: 3 }} xs={12}>
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
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default ReservarHorasArea;

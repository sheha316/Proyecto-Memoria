/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container, Box, Radio, RadioGroup, FormControlLabel, Grid, Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import api from '../../API/api';
import {
  SUCURSAL_1, SUCURSAL_2, SUCURSAL_3, SUCURSAL_4,
} from '../../constantes';
import Stepper from '../Componentes/Stepper';
import MostrarCalendarioyMedicos from '../Componentes/MostrarCalendarioyMedicos';

function ReservarHorasArea() {
  const { OpcionesDeBusquedaSeleccionada, area } = useLocation().state;
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [agendasMedicos, setAgendasMedicos] = useState({});
  const [firstDay, setfirstDay] = useState();
  const [lastDay, setlastDay] = useState();
  const [sucursalesHabilitadas, setSucursalesHabilitadas] = useState({});
  const [agendasMedicosFiltrados, setAgendasMedicosFiltrados] = useState('');
  const theme = useTheme();
  const cellphone = useMediaQuery(theme.breakpoints.down('md'));
  const sucursales = [SUCURSAL_1, SUCURSAL_2, SUCURSAL_3, SUCURSAL_4];
  const TODASLASSUCURSALES = 'Todas';
  function FiltrarDatos() {
    if (sucursalSeleccionada === '') {
      return;
    }
    if (sucursalSeleccionada === TODASLASSUCURSALES) {
      let aux = [];
      const FirstDate = agendasMedicos.FirstDayAll.split('-');
      const LastDate = agendasMedicos.LastDayAll.split('-');
      for (let i = 0; i < agendasMedicos.agendas.length; i++) {
        aux = aux.concat(agendasMedicos.agendas[i].medicos);
      }
      setAgendasMedicosFiltrados(aux);
      setfirstDay(new Date(FirstDate[0], FirstDate[1] - 1, FirstDate[2]));
      setlastDay(new Date(LastDate[0], LastDate[1] - 1, LastDate[2]));
      setFechaSeleccionada(new Date(FirstDate[0], FirstDate[1] - 1, FirstDate[2]));
    } else {
      let FirstDate;
      let LastDate;
      for (let i = 0; i < agendasMedicos.diasDisponibles.length; i++) {
        if (sucursalSeleccionada === agendasMedicos.diasDisponibles[i]._id) {
          FirstDate = agendasMedicos.diasDisponibles[i].FirstDay.split('-');
          LastDate = agendasMedicos.diasDisponibles[i].LastDay.split('-');
          setAgendasMedicosFiltrados(agendasMedicos.agendas[i].medicos);
          setfirstDay(new Date(FirstDate[0], FirstDate[1] - 1, FirstDate[2]));
          setlastDay(new Date(LastDate[0], LastDate[1] - 1, LastDate[2]));
          setFechaSeleccionada(new Date(FirstDate[0], FirstDate[1] - 1, FirstDate[2]));
          i = agendasMedicos.diasDisponibles.length;
        }
      }
    }
  }
  useEffect(() => {
    async function getData() {
      const agendasAux = await api.getAgendas(area.especializacion);
      const FirstDate = agendasAux.FirstDayAll.split('-');
      setAgendasMedicos(agendasAux);
      setFechaSeleccionada(new Date(FirstDate[0], FirstDate[1] - 1, FirstDate[2]));
      setSucursalSeleccionada(TODASLASSUCURSALES);

      const aux = {
        [SUCURSAL_1]: 0,
        [SUCURSAL_2]: 0,
        [SUCURSAL_3]: 0,
        [SUCURSAL_4]: 0,
      };
      for (let i = 0; i < agendasAux.diasDisponibles.length; i++) {
        aux[agendasAux.diasDisponibles[i]._id] = 1;
      }
      setSucursalesHabilitadas(aux);
    }
    getData();
  }, []);
  useEffect(() => {
    FiltrarDatos();
  }, [sucursalSeleccionada]);
  const optionsSucursales = () => (
    <Paper
      elevation={4}
      sx={{ padding: 2 }}
    >
      <RadioGroup
        row={cellphone}
        defaultValue={sucursalSeleccionada}
        onChange={(e) => { setSucursalSeleccionada(e.target.value); }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          {sucursales.map((sucursalOptions) => (
            <>
              <Grid key={sucursalOptions} item xs={2}>
                <FormControlLabel
                  style={{ width: 'fit-content' }}
                  key={sucursalOptions}
                  value={sucursalOptions}
                  control={(<Radio />)}
                  label={<span>{sucursalOptions}</span>}
                  disabled={sucursalesHabilitadas[sucursalOptions] === 0}
                />
              </Grid>
              {' '}
            </>
          ))}
          <FormControlLabel
            style={{ width: 'fit-content' }}
            value={TODASLASSUCURSALES}
            control={(<Radio />)}
            label={<span>{TODASLASSUCURSALES}</span>}
          />

        </Grid>
      </RadioGroup>
    </Paper>

  );
  return (
    <Container>
      <Stepper
        step={1}
        search={`${OpcionesDeBusquedaSeleccionada}: 
      ${area.especializacion}`}
        OpcionesDeBusquedaSeleccionada={OpcionesDeBusquedaSeleccionada}
      />
      <Box sx={{ marginTop: 2, width: '100%' }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <MostrarCalendarioyMedicos
            agendasMedicos={agendasMedicosFiltrados}
            sucursalSeleccionada={sucursalSeleccionada}
            area={area}
            fecha={fechaSeleccionada}
            setFecha={setFechaSeleccionada}
            FirstDay={firstDay}
            LastDay={lastDay}
            TODASLASSUCURSALES={TODASLASSUCURSALES}
            OpcionesDeBusquedaSeleccionada={OpcionesDeBusquedaSeleccionada}
            optionsSucursales={optionsSucursales}
            Title="Seleccione Fecha y Profesional"
          />
        </Grid>
      </Box>
    </Container>
  );
}

export default ReservarHorasArea;

/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
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
  COLOR_BASE_1, COLOR_BASE_2,
} from '../../constantes';
import Stepper from '../Componentes/Stepper';
import Calendario from '../Componentes/Calendario';
import TablaMedicos from '../Componentes/TablaMedicos';

function ReservarHorasArea() {
  const { OpcionesDeBusquedaSeleccionada, area } = useLocation().state;
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [agendasMedicos, setAgendasMedicos] = useState({});
  const [sucursalesHabilitadas, setSucursalesHabilitadas] = useState({});
  const [agendasMedicosFiltrados, setAgendasMedicosFiltrados] = useState('');
  const theme = useTheme();
  const cellphone = useMediaQuery(theme.breakpoints.down('md'));
  const sucursales = [SUCURSAL_1, SUCURSAL_2, SUCURSAL_3, SUCURSAL_4];
  const TODASLASSUCURSALES = 'Todas Las Sucursales';
  function FiltrarDatos() {
    if (sucursalSeleccionada === '') {
      return;
    }
    if (sucursalSeleccionada === TODASLASSUCURSALES) {
      let aux = [];
      const FirstDate = agendasMedicos.FirstDayAll.split('-');
      console.log(FirstDate);
      for (let i = 0; i < agendasMedicos.agendas.length; i++) {
        aux = aux.concat(agendasMedicos.agendas[i].medicos);
      }
      setAgendasMedicosFiltrados(aux);
      setFechaSeleccionada(new Date(FirstDate[0], FirstDate[1] - 1, FirstDate[2]));
    } else {
      let FirstDate;
      for (let i = 0; i < agendasMedicos.FirstDay.length; i++) {
        if (sucursalSeleccionada === agendasMedicos.FirstDay[i]._id) {
          FirstDate = agendasMedicos.FirstDay[i].fecha.split('-');
          console.log(agendasMedicos.agendas[i].medicos);
          setAgendasMedicosFiltrados(agendasMedicos.agendas[i].medicos);
          setFechaSeleccionada(new Date(FirstDate[0], FirstDate[1] - 1, FirstDate[2]));
          i = agendasMedicos.FirstDay.length;
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
      setSucursalSeleccionada(SUCURSAL_1);

      const aux = {
        [SUCURSAL_1]: 0,
        [SUCURSAL_2]: 0,
        [SUCURSAL_3]: 0,
        [SUCURSAL_4]: 0,
      };
      for (let i = 0; i < agendasAux.FirstDay.length; i++) {
        aux[agendasAux.FirstDay[i]._id] = 1;
      }
      setSucursalesHabilitadas(aux);
    }
    getData();
  }, []);
  useEffect(() => {
    FiltrarDatos();
  }, [sucursalSeleccionada]);
  const optionsSucursales = () => (
    <RadioGroup
      row={cellphone}
      defaultValue={TODASLASSUCURSALES}
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
              disabled={sucursalesHabilitadas[sucursalOptions] === 0}
            />
          </Grid>
        ))}
        <FormControlLabel
          style={{ width: 'fit-content' }}
          value={TODASLASSUCURSALES}
          control={<Radio />}
          label={<span style={{ fontSize: cellphone ? 16 : null }}>{TODASLASSUCURSALES}</span>}
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

          {sucursalSeleccionada !== '' && (
            <Grid item xs={12}>
              <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>Seleccione Sucursal</FormLabel>
              {optionsSucursales()}
            </Grid>
          )}

          { agendasMedicosFiltrados !== '' && fechaSeleccionada !== '' && (
          <>
            <FormLabel sx={{
              color: 'black',
              fontWeight: 'bold',
              marginTop: 3,
            }}
            >
              Seleccione Fecha y Profesional
            </FormLabel>
            <Grid
              item
              sx={{
                backgroundColor: 'gray',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                marginTop: 1,
              }}
              xs={12}
            >

              <Calendario
                agendasMedicos={agendasMedicosFiltrados}
                fecha={fechaSeleccionada}
                setFecha={setFechaSeleccionada}
              />
              <TablaMedicos
                dia={fechaSeleccionada}
                agendasMedicos={agendasMedicosFiltrados}
                OpcionesDeBusquedaSeleccionada={OpcionesDeBusquedaSeleccionada}
                area={area}
              />
            </Grid>
          </>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default ReservarHorasArea;

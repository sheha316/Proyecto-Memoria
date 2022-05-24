/* eslint-disable consistent-return */
import React from 'react';
import {
  Container, Box,
  Grid, Stack, FormLabel, Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from 'react-router-dom';
import Stepper from '../Componentes/Stepper';
import Fichas from '../Componentes/FichasInformacion';
import Formulario from '../Componentes/FormularioDatosUsuario';
import DatesHour from '../../utilities/Dates&Hour';

function RecordatorioSeleccion(medico, hora, dia, sucursal) {
  const fecha = DatesHour.StringDateToDate(dia.toISOString().split('T')[0]);
  return (
    <Box sx={{ marginTop: 2 }}>
      <Stack spacing={4}>
        {Fichas.FichaProfeional(medico)}
        {Fichas.FichaFecha(hora, fecha)}
        {Fichas.FichaSucursal(sucursal)}
      </Stack>
    </Box>
  );
}
function IngresarDatos() {
  const theme = useTheme();
  const grid = useMediaQuery(theme.breakpoints.down('md')) ? [12, 12] : [5, 6];
  const {
    hora, dia, medico, OpcionesDeBusquedaSeleccionada, area,
  } = useLocation().state;
  const search = OpcionesDeBusquedaSeleccionada === 'Médico Especialista' ? 'Médico Especialista' : `${OpcionesDeBusquedaSeleccionada}: ${area.especializacion}`;
  return (
    <Container>
      <Stepper
        OpcionesDeBusquedaSeleccionada={OpcionesDeBusquedaSeleccionada}
        area={area}
        step={2}
        medico={medico}
        search={search}
      />
      <Box sx={{ marginTop: 5, width: '100%' }}>
        <Grid
          container
          style={{
            display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
          }}
        >
          <Grid item xs={grid[0]}>
            <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>
              Información de la cita
            </FormLabel>
            {RecordatorioSeleccion(medico, hora, dia, medico.sucursal)}
          </Grid>
          <Grid item xs={grid[1]} sx={grid[1] > 6 ? { marginTop: 4 } : {}}>
            <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>
              Ingrese sus datos
            </FormLabel>
            <Formulario medico={medico} hora={hora} dia={dia} />
          </Grid>

        </Grid>
      </Box>
      <Button
        onClick={() => {
          localStorage.clear();
        }}
      >
        algo
      </Button>
    </Container>
  );
}

export default IngresarDatos;

/* eslint-disable camelcase */
import {
  Container, Box, FormLabel, Grid, Stack, Button,
} from '@mui/material';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Fichas from '../Componentes/FichasInformacion';
import {
  COLOR_BUTTON_1, COLOR_BUTTON_2, RUTAS_HOME, COLOR_BUTTON_3, COLOR_BUTTON_4,
  RUTAS_CANCELAR_RESERVAS,
} from '../../constantes';
import DatesHour from '../../utilities/Dates&Hour';

function RecordatorioSeleccion(cita) {
  const { Medico, Bloque, Fecha_cita } = cita;
  const fecha = DatesHour.StringDateToDate(Fecha_cita);
  return (
    <Box sx={{ marginTop: 4 }}>
      <Stack spacing={4}>
        {Fichas.FichaProfeional(Medico, 0)}
        {Fichas.FichaFecha(Bloque, fecha)}
        {Fichas.FichaSucursal(Medico.sucursal)}
      </Stack>
    </Box>
  );
}

function DatosUsuario(cita) {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Stack spacing={4}>
        {Fichas.FichaDatosUsuario(cita)}
      </Stack>
    </Box>
  );
}

function HoraReservada() {
  const history = useNavigate();
  const { cita } = useLocation().state;
  const theme = useTheme();
  const grid = useMediaQuery(theme.breakpoints.up('md')) ? [4, 6] : [12, 12];
  return (
    <Container>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
      >
        <FormLabel
          sx={{
            color: 'green',
            fontWeight: 'bold',
            borderRadius: 3,
            padding: 2,
            fontSize: 25,
          }}
        >
          ¡Su hora ha sido reservada con éxito!
        </FormLabel>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Grid
          container
          style={{
            display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
          }}
        >
          <Grid item xs={grid[0]}>
            {RecordatorioSeleccion(cita)}
          </Grid>
          <Grid item xs={grid[1]}>
            <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>
              {DatosUsuario(cita)}
            </FormLabel>
          </Grid>
        </Grid>
        <Box sx={{
          margin: 6,
          marginTop: 4,
          display: 'flex',
          justifyContent: 'space-between',
        }}
        >
          <Button
            sx={{
              textTransform: 'none',
              backgroundColor: COLOR_BUTTON_3,
              ':hover': { backgroundColor: COLOR_BUTTON_4 },
            }}
            onClick={
              () => {
                history(RUTAS_CANCELAR_RESERVAS);
              }
            }
          >
            <span style={{ color: 'white' }}>CANCELAR HORA</span>
          </Button>

          <Button
            sx={{
              textTransform: 'none',
              backgroundColor: COLOR_BUTTON_1,
              ':hover': { backgroundColor: COLOR_BUTTON_2 },
            }}
            onClick={
              () => {
                history(RUTAS_HOME);
              }
            }
          >
            <span style={{ color: 'white' }}>VOLVER</span>
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default HoraReservada;

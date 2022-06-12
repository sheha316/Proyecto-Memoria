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
  RUTAS_HOME,
  RUTAS_CANCELAR_RESERVAS, success,
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
        alignItems: 'center',
        flexDirection: 'column',
      }}
      >
        <FormLabel
          sx={{
            color: success,
            fontWeight: 'bold',
            borderRadius: 3,
            padding: 2,
            fontSize: 25,
          }}
        >
          ¡Su hora ha sido reservada con éxito!
        </FormLabel>
        <FormLabel
          sx={{
            fontWeight: 'bold',
            borderRadius: 3,
            padding: 2,
            fontSize: 18,
          }}
        >
          Se enviará un correo con la información de la cita
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
            variant="outlined"
            color="secondary"
            style={{
              marginTop: 2,
              alignSelf: 'flex-end',
            }}
            onClick={
              () => {
                history(RUTAS_CANCELAR_RESERVAS);
              }
            }
          >
            ¿Cancelar Hora?
          </Button>
          <Button
            color="success"
            variant="contained"
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

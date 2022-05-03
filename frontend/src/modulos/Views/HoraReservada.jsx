/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import {
  Container, Box, FormLabel, Grid, Stack, Button,
} from '@mui/material';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Fichas from '../Componentes/FichasInformacion';
import {
  COLOR_BASE_1, COLOR_BUTTON_1, COLOR_BUTTON_2, RUTAS_HOME,
} from '../../constantes';

function RecordatorioSeleccion(cita) {
  const { Medico, Bloque, Fecha_cita } = cita;
  const fecha = Fecha_cita.split('-');
  const fechaDate = new Date(fecha[0], fecha[1], fecha[2]);
  return (
    <Box sx={{ marginTop: 4 }}>
      <Stack spacing={4}>
        {Fichas.FichaProfeional(Medico, 0)}
        {Fichas.FichaFecha(Bloque, fechaDate)}
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
  const { mensaje, cita } = useLocation().state;
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
          <Grid item xs={4}>
            {RecordatorioSeleccion(cita)}
          </Grid>
          <Grid item xs={6}>
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
              backgroundColor: 'red',
              ':hover': { backgroundColor: '#cc0000' },
            }}
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

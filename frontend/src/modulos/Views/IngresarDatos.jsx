import React from 'react';
import {
  Container, Box,
  Grid, Stack, FormLabel, Button,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import Stepper from '../Componentes/Stepper';
import Fichas from '../Componentes/FichasInformacion';
import Formulario from '../Componentes/FormularioDatosUsuario';

function RecordatorioSeleccion(medico, hora, dia, sucursal) {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Stack spacing={4}>
        {Fichas.FichaProfeional(medico)}
        {Fichas.FichaFecha(hora, dia)}
        {Fichas.FichaSucursal(sucursal)}
      </Stack>
    </Box>
  );
}
function IngresarDatos() {
  const {
    hora, dia, medico, OpcionesDeBusquedaSeleccionada, area,
  } = useLocation().state;
  console.log(hora, dia, medico, OpcionesDeBusquedaSeleccionada, area);
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
          <Grid item xs={4}>
            {RecordatorioSeleccion(medico, hora, dia, medico.sucursal)}
          </Grid>
          <Grid item xs={6}>
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

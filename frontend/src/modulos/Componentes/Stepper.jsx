/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Stepper, Step, StepButton, Box, FormLabel, Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  RUTAS_RESERVAR_HORA,
  RUTAS_RESERVAR_HORA_AREA,
  RUTAS_RESERVAR_HORA_CON_MEDICO,
  COLOR_BASE_1, COLOR_BASE_2, COLOR_BASE_3,
} from '../../constantes';

function stepper({
  step, search, OpcionesDeBusquedaSeleccionada, area, medico,
}) {
  const history = useNavigate();
  let steps;
  if (area !== 'Médico Especialista') {
    steps = [`Buscar ${search}`, 'Seleccionar Fecha y Profesional', 'Ingresar Datos'];
  } else {
    steps = [`Buscar ${search}`, 'Seleccionar Fecha y Hora', 'Ingresar Datos'];
  }
  const handleStep = (index) => {
    if (index !== step) {
      if (index === 0) {
        history(RUTAS_RESERVAR_HORA);
      } else if (index === 1 && area !== 'Médico Especialista') {
        history(RUTAS_RESERVAR_HORA_AREA, {
          state: {
            area,
            OpcionesDeBusquedaSeleccionada,
          },
        });
      } else if (index === 1 && area === 'Médico Especialista') {
        history(RUTAS_RESERVAR_HORA_CON_MEDICO, {
          state: {
            medico: [medico],
            OpcionesDeBusquedaSeleccionada,
          },
        });
      }
    }
  };
  return (
    <Paper
      elevation={4}
      sx={{
        padding: 1,
        marginTop: 1,
        borderRadius: 2,
        border: 1,
        borderColor: COLOR_BASE_1,
      }}
    >
      <Box sx={{ textAlign: 'center', marginTop: '1%' }}>
        <FormLabel style={{
          color: COLOR_BASE_1, fontWeight: 'bold', padding: 2, fontSize: '200%',
        }}
        >
          Reserva de Hora
        </FormLabel>
      </Box>
      <Box sx={{ textAlign: 'center', marginTop: '1%' }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label, index) => (

            <Step key={label}>
              <StepButton color="inherit" onClick={() => handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Paper>
  );
}

export default stepper;

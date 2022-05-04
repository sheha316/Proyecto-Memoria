import React from 'react';
import {
  Stepper, Step, StepButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RUTAS_RESERVAR_HORA, RUTAS_RESERVAR_HORA_AREA, RUTAS_RESERVAR_HORA_CON_MEDICO } from '../../constantes';

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
    <Stepper activeStep={step} alternativeLabel>
      {steps.map((label, index) => (

        <Step key={label}>
          <StepButton color="inherit" onClick={() => handleStep(index)}>
            {label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
}

export default stepper;

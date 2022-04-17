/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import {
  Stepper, Step, StepButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RUTAS_RESERVAR_HORA } from '../../constantes';

function stepper({ step, search }) {
  const history = useNavigate();
  const steps = [`Buscar por ${search}`, 'Seleccionar Fecha y Profesional', 'Ingresar Datos'];
  const handleStep = (index) => {
    if (index !== step) {
      if (index === 0) {
        history(RUTAS_RESERVAR_HORA);
      } else if (index === 1) {
        history(RUTAS_RESERVAR_HORA);
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

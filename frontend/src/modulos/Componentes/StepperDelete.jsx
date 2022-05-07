/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Stepper, Step, StepButton, Box, FormLabel, Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  RUTAS_RESERVAR_HORA,
  RUTAS_CANCELAR_RESERVAS,
  COLOR_BASE_1,
} from '../../constantes';

function StepperDelete({
  step, id,
}) {
  const history = useNavigate();
  const steps = [`Ingresar su ${id}`, 'Seleccionar cita a Cancelar'];

  const handleStep = (index) => {
    if (index !== step) {
      if (index === 0) {
        history(RUTAS_CANCELAR_RESERVAS);
      }
    }
  };
  const initialValue = {

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
          Cancelar Hora
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

export default StepperDelete;

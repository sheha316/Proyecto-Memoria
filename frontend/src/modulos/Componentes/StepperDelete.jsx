/* eslint-disable react/prop-types */
import React from 'react';
import {
  Stepper, Step, StepButton, Box, FormLabel, Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  RUTAS_CANCELAR_RESERVAS,
  primary,
} from '../../constantes';

function StepperDelete({
  step, id,
}) {
  const history = useNavigate();
  const rutFix = id === 'Rut' ? 'RUT' : id;
  const steps = [`Ingresar su ${rutFix} e Email `, 'Seleccionar Cita a Cancelar'];

  const handleStep = (index) => {
    if (index !== step) {
      if (index === 0) {
        history(RUTAS_CANCELAR_RESERVAS);
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
        borderColor: primary,
      }}
    >
      <Box sx={{ textAlign: 'center', marginTop: '1%' }}>
        <FormLabel style={{
          color: primary, fontWeight: 'bold', padding: 2, fontSize: '200%',
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

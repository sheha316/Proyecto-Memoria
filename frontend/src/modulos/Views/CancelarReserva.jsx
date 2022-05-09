/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, FormLabel,
} from '@mui/material';
import { format } from 'rut.js';
import Stepper from '../Componentes/StepperDelete';
import FormularioDatosCancelarHora from '../Componentes/FormularioDatosCancelarHora';
import {
  RUTAS_CANCELAR_RESERVAS_MIS_RESERVAS,
} from '../../constantes';

function CancelarReserva() {
  const history = useNavigate();
  const getInitialValues = (storedValues) => storedValues || {
    Rut: '',
    Pasaporte: '',
    Nacionalidad: 'Chileno',
  };
  const retrieveLocalWebStore = () => {
    const storedValues = JSON.parse(localStorage.getItem('userForm'));
    const initialValues = getInitialValues(storedValues);
    return initialValues;
  };
  const initialValues = retrieveLocalWebStore();
  const [identificado, setId] = useState(initialValues.Nacionalidad === 'Chileno' ? 'Rut' : 'Pasaporte');

  const handleSubmit = async (values) => {
    console.log(values);
    history(RUTAS_CANCELAR_RESERVAS_MIS_RESERVAS, {
      state: { values: { ...values, Rut: format(values.Rut) } },
    });
  };
  return (
    <Container>
      <Stepper step={0} id={identificado} />
      <Box sx={{ marginTop: 5, width: '100%' }}>
        <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>
          Ingrese su
          {' '}
          {identificado}
        </FormLabel>

        <FormularioDatosCancelarHora
          initialValues={initialValues}
          setId={setId}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Container>
  );
}

export default CancelarReserva;

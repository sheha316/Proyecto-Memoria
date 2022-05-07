/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container, Box, FormLabel,
} from '@mui/material';
import { checkPropTypes } from 'prop-types';
import Stepper from '../Componentes/StepperDelete';
import api from '../../API/api';
import FormularioDatosCancelarHora from '../Componentes/FormularioDatosCancelarHora';

function CancelarReservaMisReservas() {
  const { values } = useLocation().state;
  console.log(values);
  const id = values.Nacionalidad === 'Chileno' ? 'Rut' : 'Pasaporte';
  const [misReservas, setMisReservas] = useState({});
  useEffect(() => {
    async function getMisReservas() {
      setMisReservas(await api.getMisCitas(values));
    }
    getMisReservas();
  }, []);
  return (
    <Container>
      <Stepper step={1} id={id} />
      <Box sx={{ marginTop: 5, width: '100%' }}>
        <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>
          Ingrese su
          {' '}
          {id}
        </FormLabel>
      </Box>

    </Container>
  );
}

export default CancelarReservaMisReservas;

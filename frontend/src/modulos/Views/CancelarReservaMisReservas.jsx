import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container, Box, FormLabel,
} from '@mui/material';
import Stepper from '../Componentes/StepperDelete';
import api from '../../API/api';
import TablaCitas from '../Componentes/TablaCitas';

function CancelarReservaMisReservas() {
  const { values } = useLocation().state;
  const id = values.Nacionalidad === 'Chileno' ? 'Rut' : 'Pasaporte';
  const [misReservas, setMisReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getMisReservas() {
      await setMisReservas(await api.getMisCitas(values));
      setLoading(false);
    }
    getMisReservas();
  }, []);
  const handleCancelDate = async (cita) => {
    await api.postSendEmailDeleteCita(cita);
    window.location.reload(false);
  };
  return (
    <Container>
      <Stepper step={1} id={id} />
      <Box sx={{ marginTop: 5, width: '100%' }}>
        <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>
          Citas Programadas
        </FormLabel>
        {!loading && misReservas.length > 0
        && <TablaCitas handleCancelDate={handleCancelDate} citas={misReservas} />}
        {!loading && misReservas.length < 1
        && (
        <Box sx={{ marginTop: 5, width: '100%' }}>
          <FormLabel sx={{
            color: 'black', fontWeight: 'bold', width: '100%', textAlign: 'center',
          }}
          >
            No se han encontrado citas programadas para usted
          </FormLabel>
        </Box>
        )}
      </Box>

    </Container>
  );
}

export default CancelarReservaMisReservas;

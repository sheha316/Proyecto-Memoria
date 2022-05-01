/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container, Box, FormLabel, Grid,
} from '@mui/material';
import api from '../../API/api';
import Stepper from '../Componentes/Stepper';
import newDate from '../../utilities/newDate';
import Calendario from '../Componentes/Calendario';
import TablaMedicos from '../Componentes/TablaMedicos';

function ReservarConMedico() {
  const { medico, OpcionesDeBusquedaSeleccionada } = useLocation().state;
  console.log(medico, OpcionesDeBusquedaSeleccionada);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [agendaMedico, setAgendaMedico] = useState({});

  useEffect(async () => {
    setAgendaMedico(await api.getAgendas(medico));
  }, []);

  useEffect(() => {
    if (Object.keys(agendaMedico).length !== 0) {
      for (let i = 0; i < agendaMedico.agendas[0].length; i++) {
        for (let j = 0; j < agendaMedico.Medicos.length; j++) {
          if (agendaMedico.agendas[j][i].disponible) {
            const date = newDate.getActualDate();
            const medicodate = newDate.standarDate(new Date(agendaMedico.agendas[j][i].fecha));
            const DifferenceInTime = (medicodate).getTime() - date.getTime();
            const DifferenceInDays = Math.floor(DifferenceInTime / (1000 * 3600 * 24));
            date.setDate(date.getDate() + DifferenceInDays + 1);
            setFechaSeleccionada(date);
            return;
          }
        }
      }
    }
  }, [agendaMedico]);

  const optionCalendario = () => (
    <Box>
      <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>Seleccione Fecha</FormLabel>
      <Calendario
        agendasMedicos={agendaMedico}
        fecha={fechaSeleccionada}
        setFecha={setFechaSeleccionada}
      />
    </Box>
  );
  return (
    <Container>
      <Box sx={{ marginTop: 5, width: '100%' }}>
        <Grid container spacing={2}>

          {Object.keys(agendaMedico).length !== 0 && fechaSeleccionada !== '' && (
            <Grid item xs={6}>
              {optionCalendario()}
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default ReservarConMedico;

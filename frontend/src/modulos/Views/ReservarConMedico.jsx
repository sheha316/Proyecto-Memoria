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
import Fichas from '../Componentes/FichasInformacion';

function ReservarConMedico() {
  const { medico, OpcionesDeBusquedaSeleccionada } = useLocation().state;
  console.log(medico, OpcionesDeBusquedaSeleccionada);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [agendaMedico, setAgendaMedico] = useState({});

  useEffect(() => {
    async function getAgendaMedico() {
      setAgendaMedico(await api.getAgendas(medico));
    }
    getAgendaMedico();
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
      <Calendario
        agendasMedicos={agendaMedico}
        fecha={fechaSeleccionada}
        setFecha={setFechaSeleccionada}
      />
    </Box>
  );
  return (
    <Container>
      <Stepper step={1} search={`${OpcionesDeBusquedaSeleccionada}`} medico={medico} area={OpcionesDeBusquedaSeleccionada} />

      <Box sx={{ marginTop: 5, width: '100%' }}>
        {Object.keys(agendaMedico).length !== 0 && fechaSeleccionada !== '' && (
        <Grid container spacing={0}>
          <Grid item xs={5} sx={{ marginTop: 1 }}>

            {Fichas.FichaProfeional(medico[0], 1)}
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={6}>
            {optionCalendario()}
          </Grid>
        </Grid>
        )}
        {fechaSeleccionada !== ''
        && (
        <>
          <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>Seleccione una Hora</FormLabel>
          <TablaMedicos
            dia={fechaSeleccionada}
            agendasMedicos={agendaMedico}
            medicos={medico}
            OpcionesDeBusquedaSeleccionada={OpcionesDeBusquedaSeleccionada}
            area={OpcionesDeBusquedaSeleccionada}
          />
        </>
        )}
      </Box>
    </Container>
  );
}

export default ReservarConMedico;

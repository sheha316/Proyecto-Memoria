/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container, Box, FormLabel, Grid, Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import api from '../../API/api';
import Stepper from '../Componentes/Stepper';
import Fichas from '../Componentes/FichasInformacion';
import MostrarCalendarioyMedicos from '../Componentes/MostrarCalendarioyMedicos';

function ReservarConMedico() {
  const { medico, OpcionesDeBusquedaSeleccionada } = useLocation().state;
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [firstDay, setfirstDay] = useState();
  const [lastDay, setlastDay] = useState();
  const [agendaMedico, setAgendaMedico] = useState({});
  const theme = useTheme();
  const cellphone = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    async function getAgendaMedico() {
      const agendasAux = await api.getAgendaOfOne(medico);
      setAgendaMedico(agendasAux);
      const FirstDate = agendasAux.FirstDay.split('-');
      const LastDay = agendasAux.LastDay.split('-');
      setlastDay(new Date(LastDay[0], LastDay[1] - 1, LastDay[2]));
      setfirstDay(new Date(FirstDate[0], FirstDate[1] - 1, FirstDate[2]));
      setFechaSeleccionada(new Date(FirstDate[0], FirstDate[1] - 1, FirstDate[2]));
    }
    getAgendaMedico();
  }, []);
  return (
    <Container>
      <Stepper step={1} search={`${OpcionesDeBusquedaSeleccionada}`} medico={medico} area={OpcionesDeBusquedaSeleccionada} />

      <Box sx={{ marginTop: 5, width: '100%' }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/*           {Object.keys(agendaMedico).length !== 0 && fechaSeleccionada !== '' && (
            <Grid item xs={cellphone ? 12 : 5}>
              <Box sx={{ marginTop: 4 }}>
                <Stack spacing={4}>
                  {Fichas.FichaProfeional(medico[0])}
                  {Fichas.FichaSucursal(medico[0].sucursal)}
                </Stack>
              </Box>

            </Grid>

          )} */}
          <MostrarCalendarioyMedicos
            agendasMedicos={[{ agenda: agendaMedico.agenda }]}
            area={OpcionesDeBusquedaSeleccionada}
            fecha={fechaSeleccionada}
            setFecha={setFechaSeleccionada}
            FirstDay={firstDay}
            LastDay={lastDay}
            OpcionesDeBusquedaSeleccionada={OpcionesDeBusquedaSeleccionada}
            Title="Seleccione Fecha y Horario"
          />
        </Grid>
      </Box>
    </Container>
  );
}

export default ReservarConMedico;

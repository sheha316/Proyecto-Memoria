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
import Calendario from '../Componentes/Calendario';
import TablaMedicos from '../Componentes/TablaMedicos';
import Fichas from '../Componentes/FichasInformacion';

function ReservarConMedico() {
  const { medico, OpcionesDeBusquedaSeleccionada } = useLocation().state;
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [agendaMedico, setAgendaMedico] = useState({});
  const theme = useTheme();
  const cellphone = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    async function getAgendaMedico() {
      const agendasAux = await api.getAgendaOfOne(medico);
      setAgendaMedico(agendasAux);
      const FirstDate = agendasAux.primerDia.split('-');
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
          {fechaSeleccionada !== ''
        && (
        <>
          <FormLabel sx={{
            color: 'black',
            fontWeight: 'bold',
            marginTop: 3,
          }}
          >
            Seleccione Fecha y Profesional
          </FormLabel>
          <Grid
            item
            sx={{
              backgroundColor: 'gray',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              marginTop: 1,
            }}
            xs={12}
          >
            <Calendario
              agendasMedicos={[{ agenda: agendaMedico.agendas[0] }]}
              fecha={fechaSeleccionada}
              setFecha={setFechaSeleccionada}
            />
            <TablaMedicos
              dia={fechaSeleccionada}
              agendasMedicos={[{ agenda: agendaMedico.agendas[0] }]}
              OpcionesDeBusquedaSeleccionada={OpcionesDeBusquedaSeleccionada}
              area={OpcionesDeBusquedaSeleccionada}
            />
          </Grid>
        </>
        )}
        </Grid>
      </Box>
    </Container>
  );
}

export default ReservarConMedico;

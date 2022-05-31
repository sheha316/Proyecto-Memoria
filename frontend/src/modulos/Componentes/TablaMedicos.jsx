/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Button,
  Paper,
  Grid,
} from '@mui/material';
import { RUTAS_INGRESAR_DATOS, COLOR_BASE_2 } from '../../constantes';
import '../../css/TablaMedicosStyle.css';
import newDate from '../../utilities/newDate';
import fichas from './FichasInformacion';

export default function ListadoMedicosAgendas({
  dia, agendasMedicos, OpcionesDeBusquedaSeleccionada, area,
}) {
  const theme = useTheme();
  const cellphone = useMediaQuery(theme.breakpoints.down('sm'));
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const history = useNavigate();
  const DifferenceInTime = dia.getTime() - newDate.getActualDate().getTime();
  const DifferenceInDays = Math.floor(DifferenceInTime / (1000 * 3600 * 24)) - 1;
  const onReservar = (hora, medico) => {
    history(RUTAS_INGRESAR_DATOS, {
      state: {
        hora, dia: newDate.standarDate(new Date(dia)), medico, OpcionesDeBusquedaSeleccionada, area,
      },
    });
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      {agendasMedicos.map((agenda) => {
        if (agenda.agenda[DifferenceInDays].disponible) {
          return (
            <Grid
              key={agenda.agenda[DifferenceInDays].id_medico}
              item
              xs={cellphone ? 12 : 5.5}
              sx={{ margin: 1 }}
            >
              {fichas.FichaMedicoAgenda(
                agenda.agenda[DifferenceInDays],
                tablet,
                cellphone,
                onReservar,
              )}
            </Grid>
          );
        }
      })}

    </Grid>
  );
}

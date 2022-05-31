/* eslint-disable react/destructuring-assignment */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  TableRow,
  Button,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  Grid,
} from '@mui/material';
import {
  COLOR_BASE_2, COLOR_BASE_1, COLOR_BUTTON_1, COLOR_BUTTON_2, RUTAS_INGRESAR_DATOS,
} from '../../constantes';
import '../../css/TablaMedicosStyle.css';
import newDate from '../../utilities/newDate';

const BORDERLEFTONLY = {
  borderLeft: 0,
  borderRight: 0.1,
  borderTop: 0,
  borderBottom: 0.1,
  borderColor: 'lightgray',
};
const TITLESSTYLE = {
  color: 'white',
  backgroundColor: COLOR_BASE_1,
  borderColor: 'black',
  fontWeight: 'bold',
};

const STICKYCOLUMN = {
  position: 'sticky',
  left: 0,
  zIndex: 5,
  fontWeight: 'bold',
};
const columns = [
  { id: '08:30', label: '08:30' },
  { id: '09:00', label: '09:00' },
  { id: '09:30', label: '09:30' },
  { id: '10:00', label: '10:00' },
  { id: '10:30', label: '10:30' },
  { id: '11:00', label: '11:00' },
  { id: '11:30', label: '11:30' },
  { id: '12:00', label: '12:00' },
  { id: '12:30', label: '12:30' },
  { id: '14:00', label: '14:00' },
  { id: '14:30', label: '14:30' },
  { id: '15:00', label: '15:00' },
  { id: '15:30', label: '15:30' },
  { id: '16:00', label: '16:00' },
  { id: '16:30', label: '16:30' },
  { id: '17:00', label: '17:00' },
  { id: '17:30', label: '17:30' },
];

function CELDAMEDICO(medico) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={8}>
        <Paper elevation={4}>
          <img
            style={{
              width: 100, height: 100,
            }}
            alt=""
            src={medico.genero === 'm'
              ? 'https://img.freepik.com/foto-gratis/doctor-brazos-cruzados-sobre-fondo-blanco_1368-5790.jpg?w=2000'
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIIMvIYUfgxZwSZRb3XHS1umgQjcMuaE9N9Q&usqp=CAU'}
          />
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <span style={{ display: 'flex', justifyContent: 'center' }}>
          {medico.nombre}
          {' '}
        </span>
        <span style={{ display: 'flex', justifyContent: 'center' }}>
          {medico.apellido}
          {' '}
        </span>
      </Grid>
    </Grid>
  );
}
function BOTONRESERVA(column, MedicoIndex, IndexBloques, onReservar, disabled) {
  return (
    <TableCell
      key={column._id}
      disabled={disabled}
      sx={[BORDERLEFTONLY, { backgroundColor: MedicoIndex % 2 === 0 ? 'white' : COLOR_BASE_2, textAlignLast: 'center' }]}
    >
      <Button
        sx={{
          color: 'white',
          backgroundColor: disabled ? 'gray' : COLOR_BUTTON_1,
          ':hover': { backgroundColor: COLOR_BUTTON_2 },
        }}
        onClick={() => onReservar(IndexBloques + 1, column)}
      >
        Reservar
      </Button>
    </TableCell>
  );
}

function ModoEspecialista(area) {
  if (area === 'Médico Especialista') {
    return true;
  }
}
export default function TablaMedicos({
  medicos, dia, OpcionesDeBusquedaSeleccionada, area, agendasMedicos,
}) {
  const theme = useTheme();
  const cellphone = useMediaQuery(theme.breakpoints.down('sm'));
  const modoEspecialista = ModoEspecialista(area);
  const history = useNavigate();
  let MedicoIndex = -1;

  const getAviableDates = () => {
    MedicoIndex = -1;
    const now = newDate.getActualDate();
    medicos.map((medico) => {
      const DifferenceInTime = dia.getTime() - now.getTime();
      const DifferenceInDays = Math.floor(DifferenceInTime / (1000 * 3600 * 24)) - 1;
      for (let i = 0; i < agendasMedicos.agendas.length; i++) {
        if (agendasMedicos.agendas[i][DifferenceInDays].id_medico === medico._id) {
          medico.disponible = agendasMedicos.agendas[i][DifferenceInDays].disponible;
          medico.dates = agendasMedicos.agendas[i][DifferenceInDays].bloques;
        }
      }
      return {};
    });
  };

  const onReservar = (hora, medico) => {
    history(RUTAS_INGRESAR_DATOS, {
      state: {
        hora, dia: newDate.standarDate(new Date(dia)), medico, OpcionesDeBusquedaSeleccionada, area,
      },
    });
  };
  getAviableDates();
  MedicoIndex = -1;
  return (
    <Paper elevation={4}>
      <TableContainer sx={{
        maxHeight: cellphone ? 600 : 800,
        maxWidth: cellphone ? 450 : '100%',
      }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            {!modoEspecialista && (
            <TableRow>
              <TableCell
                sx={[
                  TITLESSTYLE,
                  BORDERLEFTONLY,
                  STICKYCOLUMN,
                  { width: '1%', zIndex: 6 }]}
              >
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                  Horarios
                </span>

              </TableCell>
              {medicos
                .map((column) => {
                  if (column.disponible) {
                    MedicoIndex += 1;
                    return (
                      <TableCell
                        key={column._id}
                        sx={[
                          TITLESSTYLE,
                          BORDERLEFTONLY,
                          {
                            backgroundColor: MedicoIndex % 2 === 0 ? 'white' : COLOR_BASE_2,
                            color: MedicoIndex % 2 === 0 ? 'black' : 'white',
                            minWidth: cellphone ? 15 : 200,
                            maxWidth: cellphone ? 300 : 200,
                          },
                        ]}
                      >
                        {CELDAMEDICO(column)}
                      </TableCell>
                    );
                  }
                })}
            </TableRow>
            )}
          </TableHead>
          <TableBody>
            {columns.map((row, IndexBloques) => {
              MedicoIndex = -1;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  style={{ backgroundColor: COLOR_BASE_2 }}
                >
                  <TableCell sx={[TITLESSTYLE, BORDERLEFTONLY, STICKYCOLUMN, { height: 80 }]}>
                    <span style={{ display: 'flex', justifyContent: 'center' }}>
                      {row.label}
                    </span>
                  </TableCell>

                  {medicos
                    .map((column) => {
                      if (column.disponible) {
                        MedicoIndex += 1;
                        return BOTONRESERVA(column, MedicoIndex, IndexBloques, onReservar, column.dates[IndexBloques] !== '');
                      }
                    })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

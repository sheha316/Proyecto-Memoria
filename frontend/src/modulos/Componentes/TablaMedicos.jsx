/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TableRow,
  Button,
  TablePagination,
  Box,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
} from '@mui/material';
import {
  COLOR_BASE_2, COLOR_BASE_1, COLOR_BUTTON_1, COLOR_BUTTON_2, RUTAS_INGRESAR_DATOS,
} from '../../constantes';
import '../../css/TablaMedicosStyle.css';
import newDate from '../../utilities/newDate';

const columns = [
  { id: 'Profesionales', label: 'Profesionales', minWidth: 100 },
  { id: '08:30', label: '08:30', minWidth: 65 },
  { id: '09:00', label: '09:00', minWidth: 40 },
  { id: '09:30', label: '09:30', minWidth: 40 },
  { id: '10:00', label: '10:00', minWidth: 40 },
  { id: '10:30', label: '10:30', minWidth: 40 },
  { id: '11:00', label: '11:00', minWidth: 40 },
  { id: '11:30', label: '11:30', minWidth: 40 },
  { id: '12:00', label: '12:00', minWidth: 40 },
  { id: '12:30', label: '12:30', minWidth: 40 },
  { id: '14:00', label: '14:00', minWidth: 40 },
  { id: '14:30', label: '14:30', minWidth: 40 },
  { id: '15:00', label: '15:00', minWidth: 40 },
  { id: '15:30', label: '15:30', minWidth: 40 },
  { id: '16:00', label: '16:00', minWidth: 40 },
  { id: '16:30', label: '16:30', minWidth: 40 },
  { id: '17:00', label: '17:00', minWidth: 40 },
  { id: '17:30', label: '17:30', minWidth: 40 },
];
const BORDERLEFTONLY = {
  borderLeft: 0,
  borderRight: 0.1,
  borderTop: 0,
  borderBottom: 0,
  borderColor: 'lightgray',
};
const STICKYCOLUMN = (index) => {
  let color = COLOR_BASE_1;
  let z = 5;
  if (index !== -1) {
    color = index % 2 === 0 ? 'white' : COLOR_BASE_2;
    z = 1;
  }
  return (
    {
      position: 'sticky',
      left: 0,
      zIndex: z,
      backgroundColor: color,
      fontWeight: 'bold',
    });
};
export default function TablaMedicos({
  medicos, dia, OpcionesDeBusquedaSeleccionada, area, agendasMedicos,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const history = useNavigate();
  let TableRowIndex = -1;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getAviableDates = () => {
    TableRowIndex = -1;
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
  return (
    <Paper sx={{ marginTop: 1 }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={[
                    {
                      color: 'white',
                      minWidth: column.minWidth,
                      backgroundColor: COLOR_BASE_1,
                      borderColor: 'black',
                    },
                    BORDERLEFTONLY,
                    { borderTop: 1 },
                    index === 0 ? STICKYCOLUMN(-1) : {}]}
                >
                  <Box>
                    <span style={{ display: 'flex', justifyContent: 'center' }}>{column.label}</span>
                  </Box>

                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {medicos.length > 0 && medicos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                if (!row.disponible) {
                  return;
                }
                TableRowIndex += 1;
                // eslint-disable-next-line consistent-return
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row._id}
                    style={{ backgroundColor: TableRowIndex % 2 === 0 ? 'white' : COLOR_BASE_2 }}
                  >
                    {columns.map((column, indexColumn) => {
                      if (indexColumn === 0) {
                        return (
                          <TableCell key={column.id} align={column.align} sx={[BORDERLEFTONLY, { display: 'grid' }, STICKYCOLUMN(TableRowIndex)]}>
                            <Box sx={{
                              display: 'flex', justifyContent: 'center', flexFlow: 'column', textAlign: 'center',
                            }}
                            >
                              <Paper elevation={4} sx={{ display: 'flex', marginBottom: 1, justifyContent: 'center' }}>
                                <img
                                  style={{
                                    width: 100, height: 100,
                                  }}
                                  alt=""
                                  src={row.genero === 'm'
                                    ? 'https://img.freepik.com/foto-gratis/doctor-brazos-cruzados-sobre-fondo-blanco_1368-5790.jpg?w=2000'
                                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIIMvIYUfgxZwSZRb3XHS1umgQjcMuaE9N9Q&usqp=CAU'}
                                />
                              </Paper>
                              <span style={{ color: TableRowIndex % 2 === 0 ? 'black' : 'white' }}>
                                {`${row.nombre}
                            ${row.apellido}`}
                              </span>
                            </Box>
                          </TableCell>
                        );
                      }
                      if (row.dates[indexColumn - 1] === '') {
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={BORDERLEFTONLY}
                          >
                            <Button
                              sx={{
                                width: 80,
                                fontSize: 12,
                                color: 'white',
                                backgroundColor: COLOR_BUTTON_1,
                                ':hover': { backgroundColor: COLOR_BUTTON_2 },
                              }}
                              onClick={() => onReservar(indexColumn, row)}
                            >
                              Reservar
                            </Button>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={[BORDERLEFTONLY, { width: 80 }]}
                        >
                          <Button
                            disabled
                            sx={{
                              width: 80,
                              fontSize: 12,
                              color: 'ffffff',
                              backgroundColor: 'gray',
                            }}
                          >
                            Reservar
                          </Button>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={medicos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

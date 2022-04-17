/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import { COLOR_BASE_2, COLOR_BASE_1 } from '../../constantes';

const columns = [
  { id: 'Profesionales', label: 'Profesionales', minWidth: 100 },
  { id: '08:00', label: '08:00', minWidth: 40 },
  { id: '08:30', label: '08:30', minWidth: 40 },
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
  { id: '18:00', label: '18:00', minWidth: 40 },
  { id: '18:30', label: '18:30', minWidth: 40 },
  { id: '19:00', label: '19:00', minWidth: 40 },
  { id: '19:30', label: '19:30', minWidth: 40 },
  { id: '20:00', label: '20:00', minWidth: 40 },
  { id: '20:30', label: '20:30', minWidth: 40 },
];

export default function StickyHeadTable({ medicos }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getAviableDates = () => {
    medicos.map((medico) => {
      medico.dates = [true, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
    });
    console.log('cambio de medico', medicos);
    return medicos;
  };
  getAviableDates();
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440, backgroundColor: 'gray' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ color: 'white', minWidth: column.minWidth, backgroundColor: COLOR_BASE_1 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {medicos.length > 0 && medicos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, indexRow) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id} style={{ backgroundColor: indexRow % 2 === 0 ? 'white' : COLOR_BASE_2 }}>
                  {columns.map((column, indexColumn) => {
                    console.log('toy cachando', row);
                    const value = row;
                    if (indexColumn === 0) {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <img style={{ width: 80, height: 80 }} alt="" src="https://img.freepik.com/foto-gratis/doctor-brazos-cruzados-sobre-fondo-blanco_1368-5790.jpg?w=2000" />
                          <span>Dr(a):</span>
                          <span>
                            {`${row.nombre}
                            ${row.apellido}`}
                          </span>
                        </TableCell>
                      );
                    }
                    if (row.dates[indexColumn]) {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Button>Hola</Button>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align={column.align} />
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
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

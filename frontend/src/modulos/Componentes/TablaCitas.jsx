/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import {
  TableRow,
  TablePagination,
  Box,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  Button,
} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/Delete';
import {
  secondary,
} from '../../constantes';
import '../../css/TablaMedicosStyle.css';
import DatesHour from '../../utilities/Dates&Hour';

const columns = [
  { id: 'Medico', label: 'Profesional', width: '20%' },
  { id: 'sucursal', label: 'Sucursal', width: '20%' },
  { id: 'Fecha_cita', label: 'Fecha', width: '25%' },
  { id: 'Bloque', label: 'Hora', width: '10%' },
  { id: 'Cancelar', label: '', width: '10%' },
];
function TextoColumna(column, cita, handleCancelDate, cellphone) {
  const { id } = column;
  if (id === 'Medico') {
    return `${cita[id].nombre} ${cita[id].apellido}`;
  } if (id === 'sucursal') {
    return cita.Medico[id];
  } if (id === 'Fecha_cita') {
    return DatesHour.StringDateToDate(cita[id]);
  } if (id === 'Bloque') {
    return DatesHour.ObtenerHoraSegunBloque(cita[id]);
  } if (id === 'Cancelar') {
    const fontSize = cellphone ? 12 : 22;
    return (
      <Button onClick={() => handleCancelDate(cita)} style={{ color: 'white', backgroundColor: 'red' }}>
        <DeleteOutlinedIcon sx={{ fontSize }} />
      </Button>
    );
  }
}
export default function TablaMedicos({ citas, handleCancelDate, cellphone }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const fontSize = cellphone ? '0.6rem' : '0.85rem';
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ marginTop: 1 }}>
      <TableContainer sx={{ maxHeight: 600, width: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  width={column.width}
                  sx={{
                    color: 'white',
                    backgroundColor: secondary,
                    borderColor: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  <Box>
                    <span style={{ display: 'flex', justifyContent: 'center', fontSize }}>{column.label}</span>
                  </Box>

                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {citas.length > 0 && citas
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, TableRowIndex) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row._id}
                  style={{
                    backgroundColor:
                    TableRowIndex % 2 === 0 ? 'white' : secondary,
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={[{ textAlign: 'center', color: TableRowIndex % 2 === 0 ? 'black' : 'white', fontSize }]}
                    >
                      {TextoColumna(column, row, handleCancelDate, cellphone)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      { citas.length > rowsPerPage && (
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={citas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      )}
    </Paper>
  );
}

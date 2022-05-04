/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from 'react';
import { Box, FormLabel, Paper } from '@mui/material';
import * as dateFns from 'date-fns';
import es from 'date-fns/locale/es';
import { COLOR_BASE_1 } from '../../constantes';
import newDate from '../../utilities/newDate';

function ObtenerHoraSegunBloque(bloque) {
  let horafinal = 8 + Math.floor(bloque / 2);
  if (horafinal > 12) {
    horafinal += 1;
  }
  let textoHora = '';
  if (horafinal < 10) {
    textoHora = `0${horafinal}:`;
  } else {
    textoHora = `${horafinal}:`;
  }
  return `${textoHora}${bloque % 2 === 0 ? '00' : '30'}`;
}
function RecordatorioSeleccionLabel(texto) {
  return (
    <FormLabel sx={{ color: 'black', margin: 1, marginLeft: 2 }}>{texto}</FormLabel>
  );
}
function FichaTitulo(texto) {
  return (
    <Box sx={{ display: 'grid' }}>
      <FormLabel sx={{
        color: 'White',
        backgroundColor: COLOR_BASE_1,
        borderRadius: 5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        padding: 2,
        fontWeight: 'bold',
      }}
      >
        {texto}
      </FormLabel>
    </Box>
  );
}
function FichaProfeional(medico, tipo) {
  const {
    genero, nombre, apellido, especializacion, sucursal,
  } = medico;
  const Maxheight = tipo === 1 ? 180 : 90;
  return (
    <Paper
      elevation={4}
      sx={{
        display: 'grid',
        borderRadius: 5,
      }}
    >
      {FichaTitulo('Profesional')}
      <Box sx={{ display: 'inline-flex' }}>

        <Paper
          elevation={4}
          sx={{
            display: 'flex', marginTop: 1, marginLeft: 2, height: (Maxheight / 3) * 2,
          }}
        >

          <img
            style={{
              width: (Maxheight / 3) * 2, height: (Maxheight / 3) * 2,
            }}
            alt=""
            src={genero === 'm'
              ? 'https://img.freepik.com/foto-gratis/doctor-brazos-cruzados-sobre-fondo-blanco_1368-5790.jpg?w=2000'
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIIMvIYUfgxZwSZRb3XHS1umgQjcMuaE9N9Q&usqp=CAU'}
          />
        </Paper>
        <Box sx={{ display: 'grid', marginLeft: 2, padding: 1 }}>
          {RecordatorioSeleccionLabel(`${genero === 'm' ? 'Dr:' : 'Dra:'} ${nombre} ${apellido}`)}
          {RecordatorioSeleccionLabel(`Especialidad: ${especializacion}`)}
          {tipo === 1 && RecordatorioSeleccionLabel(`Dirección: ${sucursal}`)}
        </Box>
      </Box>

    </Paper>
  );
}
function FichaFecha(Bloque, Fecha) {
  const horafinal = ObtenerHoraSegunBloque(Bloque);
  const date = newDate.standarDate(new Date(Fecha));
  const fecha = dateFns.format(date, 'PPPPpppp', { locale: es }).split(' a las')[0];
  return (
    <Paper
      elevation={4}
      sx={{
        display: 'grid',
        borderRadius: 5,
      }}
    >
      {FichaTitulo('Fecha y Hora')}
      {RecordatorioSeleccionLabel(`Fecha: ${fecha}`)}
      {RecordatorioSeleccionLabel(`Hora: ${horafinal}`)}
    </Paper>
  );
}
function FichaSucursal(sucursal) {
  return (
    <Paper
      elevation={4}
      sx={{
        display: 'grid',
        borderRadius: 5,
      }}
    >
      {FichaTitulo('Sucursal')}

      {RecordatorioSeleccionLabel(`Dirección: ${sucursal}`)}
    </Paper>
  );
}
function FichaDatosUsuario(cita) {
  const {
    Nacionalidad, Rut, Pasaporte, Nombres, Apellidos, Email, Teléfono, Previsión, Fecha_nacimiento,
  } = cita;
  return (
    <Paper
      elevation={4}
      sx={{
        display: 'grid',
        borderRadius: 5,
      }}
    >
      {FichaTitulo('Datos del Paciente')}
      {Nacionalidad !== 'Extranjero'
        ? RecordatorioSeleccionLabel(`Rut: ${Rut}`)
        : RecordatorioSeleccionLabel(`Pasaporte: ${Pasaporte}`)}
      {RecordatorioSeleccionLabel(`Nombres: ${Nombres}`)}
      {RecordatorioSeleccionLabel(`Apellidos: ${Apellidos}`)}
      {RecordatorioSeleccionLabel(`Email: ${Email}`)}
      {RecordatorioSeleccionLabel(`Teléfono: (+56) ${Teléfono}`)}
      {RecordatorioSeleccionLabel(`Previsión: ${Previsión}`)}
      {RecordatorioSeleccionLabel(`Fecha nacimiento: ${Fecha_nacimiento}`)}
    </Paper>
  );
}
export default {
  FichaProfeional,
  FichaFecha,
  FichaSucursal,
  FichaDatosUsuario,
};

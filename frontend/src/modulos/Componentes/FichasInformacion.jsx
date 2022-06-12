/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React from 'react';
import {
  Box, FormLabel, Paper, Grid, Button,
} from '@mui/material';
import {
  primary, secondary,
} from '../../constantes';
import DatesHour from '../../utilities/Dates&Hour';

function RecordatorioSeleccionLabel(texto) {
  return (
    <FormLabel sx={{ color: 'black', margin: 1, marginLeft: 2 }}>{texto}</FormLabel>
  );
}
function FichaTitulo(texto) {
  return (
    <Box sx={{ display: 'grid' }}>
      <FormLabel sx={{
        color: 'white',
        backgroundColor: primary,
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
  return (
    <Paper
      elevation={4}
      sx={{
        display: 'grid',
        borderRadius: 5,
      }}
    >
      {FichaTitulo('Profesional')}
      <Grid
        container
        style={{
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        }}
      >
        <Grid item xs={4}>
          <Paper
            elevation={4}
            sx={{
              display: 'flex',
              margin: 1,
              marginLeft: 2,
              width: '80%',
            }}
          >

            <img
              style={{
                width: '100%', height: '100%',
              }}
              alt=""
              src={genero === 'm'
                ? 'https://img.freepik.com/foto-gratis/doctor-brazos-cruzados-sobre-fondo-blanco_1368-5790.jpg?w=2000'
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIIMvIYUfgxZwSZRb3XHS1umgQjcMuaE9N9Q&usqp=CAU'}
            />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ display: 'grid' }}>
            {RecordatorioSeleccionLabel(`${genero === 'm' ? 'Dr:' : 'Dra:'} ${nombre} ${apellido}`)}
            {RecordatorioSeleccionLabel(`Especialidad: ${especializacion}`)}
            {tipo === 1 && RecordatorioSeleccionLabel(`Dirección: ${sucursal}`)}
          </Box>
        </Grid>
      </Grid>

    </Paper>
  );
}
function FichaFecha(Bloque, Fecha) {
  const horafinal = DatesHour.ObtenerHoraSegunBloque(Bloque);
  return (
    <Paper
      elevation={4}
      sx={{
        display: 'grid',
        borderRadius: 5,
      }}
    >
      {FichaTitulo('Fecha y Hora')}
      {RecordatorioSeleccionLabel(`Fecha: ${Fecha}`)}
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
        width: '100%',
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
function FichaTituloAgenda(texto) {
  return (
    <Box sx={{ display: 'grid' }}>
      <FormLabel sx={{
        color: 'white',
        backgroundColor: secondary,
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
function BotonesReserva(id, bloques, grid, onReservar, medico) {
  function GetHour(index) {
    let hora = Math.floor(index / 2) + 8;
    if (hora < 10) {
      return `0${hora}`;
    }
    if (hora >= 13) {
      hora += 1;
    }
    return `${hora}`;
  }
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      {bloques.map((bloque, index) => {
        const Disabled = bloque !== '';
        const hour = `${GetHour(index + 1)}:${index % 2 !== 0 ? '00' : '30'}`;
        return (
          <Grid key={`${id}_${hour}`} item xs={grid[2]} sx={{ marginTop: 1, marginLeft: 1 }}>
            <Button
              disabled={Disabled}
              variant="contained"
              onClick={() => onReservar(index + 1, medico)}
              color="success"
            >
              {hour}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
}
function LabelAgenda(label, texto) {
  return (
    <>
      <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>
        {label}
        {' '}
      </FormLabel>
      <FormLabel sx={{ color: 'black' }}>{texto}</FormLabel>
    </>
  );
}
function FichaMedicoAgenda(agenda, tablet, cellphone, onReservar) {
  const medico = {
    nombre: agenda.nombre,
    apellido: agenda.apellido,
    genero: agenda.genero,
    profesion: agenda.profesion,
    sucursal: agenda.sucursal,
    especializacion: agenda.especializacion,
    _id: agenda.id_medico,
  };
  let grid;
  if (cellphone) {
    grid = [3.5, 8.5, 3];
  } else if (tablet) {
    grid = [3.5, 8.5, 3];
  } else {
    grid = [3, 9, 1.8];
  }

  return (
    <Paper
      elevation={4}
      sx={{
        display: 'grid',
        borderRadius: 5,
        width: '100%',
      }}
    >
      {FichaTituloAgenda(`${agenda.nombre} ${agenda.apellido}`)}
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ p: 1 }}
      >
        <Grid item xs={grid[0]} sx={{ marginBottom: 1 }}>
          <Paper elevation={4}>
            <img
              style={{
                width: '100%',
              }}
              alt=""
              src={agenda.genero === 'm'
                ? 'https://img.freepik.com/foto-gratis/doctor-brazos-cruzados-sobre-fondo-blanco_1368-5790.jpg?w=2000'
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIIMvIYUfgxZwSZRb3XHS1umgQjcMuaE9N9Q&usqp=CAU'}
            />
          </Paper>
        </Grid>

        <Grid item xs={grid[1]} sx={{ textAlign: 'left' }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
          >
            <Grid item xs={10}>
              {LabelAgenda('Sucursal:', agenda.sucursal)}
            </Grid>
            <Grid item xs={10}>
              {LabelAgenda('Especialidad:', agenda.especializacion)}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {LabelAgenda('Horarios:')}
        </Grid>
        <Grid item xs={12}>
          {BotonesReserva(agenda.id_medico, agenda.bloques, grid, onReservar, medico)}
        </Grid>
      </Grid>
    </Paper>
  );
}
export default {
  FichaProfeional,
  FichaFecha,
  FichaSucursal,
  FichaDatosUsuario,
  FichaMedicoAgenda,
};

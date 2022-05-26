/* eslint-disable max-len */
import {
  Box, FormLabel, Grid, Paper,
} from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  COLOR_BASE_1,
  COLOR_BASE_2,
} from '../../constantes';
import logo from '../../assets/logo512.png';

function tarjetita(Titulo, descripcion) {
  return (
    <Paper elevation={4}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <FormLabel
          sx={{
            color: COLOR_BASE_1,
            fontWeight: 'bold',
            borderRadius: 3,
            padding: 2,
            fontSize: 26,
          }}
        >
          {Titulo}
        </FormLabel>
        <FormLabel
          sx={{
            color: 'black',
            borderRadius: 3,
            padding: 2,
            fontSize: 22,
            margin: '5%',
          }}
        >
          {descripcion}
        </FormLabel>
      </Grid>
    </Paper>
  );
}
function QuienesSomos() {
  const theme = useTheme();
  const grid = useMediaQuery(theme.breakpoints.up('md')) ? [6, 6] : [12, 12];
  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
      >
        <FormLabel
          sx={{
            color: COLOR_BASE_1,
            fontWeight: 'bold',
            borderRadius: 3,
            padding: 2,
            fontSize: 25,
          }}
        >
          Quiénes Somos
        </FormLabel>
      </Box>
      <Box sx={{ width: '100%', backgroundColor: COLOR_BASE_2 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs={grid[0]}
            style={{
              display: 'flex', justifyContent: 'center', alignContent: 'center',
            }}
          >
            <img
              src={logo}
              style={{ width: '25%', height: '25%', margin: 20 }}
              alt="logo"
            />
          </Grid>
          <Grid
            item
            xs={grid[1]}
            style={{ padding: 30 }}
          >
            <FormLabel
              sx={{
                color: 'white',
                fontWeight: 'bold',
                borderRadius: 3,
                fontSize: 16,

              }}
            >
              <span style={{ padding: 30 }}>
                {' '}
                Este centro de salud es parte de una sociedad por acciones denominada Grupo Reservas SpA,
                entidad sin fines de lucro creada en 2000.
                La constante política de reinversión de utilidades de Clínica Reservas de Santiago ha
                permitido un crecimiento sostenido de acuerdo a las necesidades de los nuevos tiempos.

                Este centro de salud cuenta con cuatro sedes en el sector oriente de la capital, donde se ha reunido un equipo
                profesional multidisciplinario y la más avanzada tecnología para el diagnóstico y tratamiento en todas las especialidades de la medicina.

              </span>
            </FormLabel>
          </Grid>
        </Grid>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid
          item
          xs={grid[0] === 12 ? 10 : 5}
          style={{ marginTop: 30 }}
        >
          {tarjetita('Mision', 'Nuestra misión consiste en realizar aplicaciones de calidad, confiables y que otorguen buenos resultados.')}
        </Grid>
        <Grid
          item
          xs={grid[0] === 12 ? 10 : 5}
          style={{ marginTop: 30 }}
        >
          {tarjetita('Visión', 'Nuestra visión es lograr una cuota de mercado considerable a nivel latinoamericano en todos nuestros proyectos.')}
        </Grid>
      </Grid>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'column',
        marginTop: 2,
      }}
      >
        <FormLabel
          sx={{
            color: COLOR_BASE_1,
            fontWeight: 'bold',
            padding: 2,
            fontSize: 25,
          }}
        >
          Mail de contacto
        </FormLabel>
        <FormLabel
          sx={{
            padding: 2,
            fontSize: 18,
          }}
        >
          reservas.cl@hotmail.com
        </FormLabel>
      </Box>
    </>
  );
}
export default QuienesSomos;

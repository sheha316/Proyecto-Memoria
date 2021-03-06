/* eslint-disable max-len */
import {
  Box, FormLabel, Grid, Container,
} from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  primary,
  secondary,
} from '../../constantes';
import sucursal1 from '../../assets/sucursal-1.jpg';
import sucursal2 from '../../assets/sucursal-2.jpg';
import sucursal3 from '../../assets/sucursal-3.jpg';
import sucursal4 from '../../assets/sucursal-4.jpg';

function INFOPERSUCURSAL(IMG, TEXT, grid, par, title) {
  return (
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
          display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column',
        }}
      >
        <FormLabel
          sx={{
            color: !par ? 'black' : 'white',
            fontWeight: 'bold',
            borderRadius: 3,
            fontSize: 16,

          }}
        >
          {title}
        </FormLabel>
        <img
          src={IMG}
          style={{ width: '40%' }}
          alt="logo"
          label={title}
        />

      </Grid>
      <Grid
        item
        xs={grid[1]}
        style={{ padding: 30 }}
      >
        <FormLabel
          sx={{
            color: !par ? 'black' : 'white',
            fontWeight: 'bold',
            borderRadius: 3,
            fontSize: 16,

          }}
        >
          <span style={{ padding: 30 }}>{TEXT}</span>
        </FormLabel>
      </Grid>
    </Grid>
  );
}
function Sucursales() {
  const theme = useTheme();
  const grid = useMediaQuery(theme.breakpoints.up('md')) ? [6, 6] : [12, 12];
  const padding = 5;
  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
      >
        <FormLabel
          sx={{
            color: primary,
            fontWeight: 'bold',
            borderRadius: 3,
            padding: 2,
            fontSize: 25,
          }}
        >
          Sucursales
        </FormLabel>
      </Box>
      <Container>
        <FormLabel
          sx={{
            fontWeight: 'bold',
            borderRadius: 3,
            fontSize: 16,
          }}
        >
          Este centro de salud cuenta con cuatro sedes en el sector oriente de la capital, donde se ha reunido un equipo
          profesional multidisciplinario y la m??s avanzada tecnolog??a para el diagn??stico y tratamiento en todas las especialidades de la medicina.
        </FormLabel>
      </Container>
      <Box sx={{ width: '100%' }} style={{ marginTop: 20 }}>
        <Box sx={{ backgroundColor: secondary, padding }}>
          {INFOPERSUCURSAL(
            sucursal1,
            'El edificio principal est?? ubicado en Vitacura y, adem??s de ofrecer servicios cl??nicos, '
          + 'hospitalizaci??n y ex??menes, contempla una torre de 12 pisos destinada a las consultas m??dicas y procedimientos ambulatorios. '
          + 'Luego, frente a esta estructura, est?? el Edificio Manquehue Oriente, inaugurado en 2013, '
          + 'que alberga la Maternidad y otros servicios m??dico quir??rgicos. Asimismo, desde 1999, cuenta con la Cl??nica Alemana de La Dehesa.',
            grid,
            true,
            'Vitacura, El Canal 4500',
          )}
        </Box>
        <Box sx={{ backgroundColor: 'white', padding }}>
          {INFOPERSUCURSAL(
            sucursal2,
            'Tambi??n en Cl??nica Alemana de La ??u??oa, durante 2019 se inaugura Alemana Sport, '
          + 'un Centro de Traumatolog??a y Medicina Deportiva con un innovador enfoque, tecnolog??a de punta y el mejor equipo multidisciplinario de especialistas. '
          + 'En conjunto, estos edificios suman 400 camas, 22 pabellones quir??rgicos y 202 mil mt2 construidos. '
          + 'Adem??s, en sus instalaciones, se ofrece la atenci??n de m??s de 1.000 m??dicos especialistas.',
            grid,
            false,
            '??u??oa, Antonio Varas 3250',
          )}
        </Box>
        <Box sx={{ backgroundColor: secondary, padding }}>
          {INFOPERSUCURSAL(
            sucursal3,
            'El edificio principal est?? ubicado en Macul y, adem??s de ofrecer servicios cl??nicos, '
          + 'hospitalizaci??n y ex??menes, contempla una torre de 16 pisos destinada a las consultas m??dicas y procedimientos ambulatorios. ',
            grid,
            true,
            'Macul, Olga Poblete 3720',
          )}
        </Box>
        <Box sx={{ backgroundColor: 'white', padding }}>
          {INFOPERSUCURSAL(
            sucursal4,
            'Tambi??n en Cl??nica Alemana de La Cisterna, durante 2019 se inaugura Alemana Sport, '
          + 'un Centro de Traumatolog??a y Medicina Deportiva con un innovador enfoque, tecnolog??a de punta y el mejor equipo multidisciplinario de especialistas. '
          + 'En conjunto, estos edificios suman 400 camas, 22 pabellones quir??rgicos y 202 mil mt2 construidos. '
          + 'Adem??s, en sus instalaciones, se ofrece la atenci??n de m??s de 1.000 m??dicos especialistas.',
            grid,
            false,
            'La Cisterna, Livio Morra 2770',
          )}
        </Box>
      </Box>
    </>
  );
}
export default Sucursales;

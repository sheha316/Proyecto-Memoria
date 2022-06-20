import React from 'react';
import {
  Box, Stack, Button, Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '../../assets/logo512.png';
import {
  RUTAS_RESERVAR_HORA, RUTAS_CANCELAR_RESERVAS,
  primary,
  RUTAS_HOME,
  RUTAS_SUCURSALES,
  RUTAS_QUIENES_SOMOS,
} from '../../constantes';

function Header() {
  const theme = useTheme();
  const cellphone = useMediaQuery(theme.breakpoints.down('sm'));
  const midWindow = useMediaQuery(theme.breakpoints.down('md'));
  const colorDeFondo = primary;
  let fontSizeL = 28;
  let fontSizeM = 18;
  let imgStyle = { width: '80px', height: '80px' };
  let direction = 'row';
  let grid = [6, 6];
  if (cellphone) {
    fontSizeL = 16;
    fontSizeM = 10;
    imgStyle = {
      width: '30px', height: '30px',
    };
    direction = 'column';
    grid = [3, 9];
  } else if (midWindow) {
    fontSizeL = 24;
    fontSizeM = 14;
  }
  const history = useNavigate();
  return (
    <Box style={{ width: '100%', backgroundColor: colorDeFondo }}>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item xs={grid[0]}>
          <Button
            sx={{ textTransform: 'none' }}
            onClick={() => {
              history(RUTAS_HOME);
            }}
          >
            <Stack
              direction={direction}
              alignItems="center"
            >
              <img
                alt=""
                src={logo}
                style={imgStyle}
              />

              <span style={{ color: 'white', fontSize: fontSizeL }}>Reservas.cl</span>
            </Stack>
          </Button>
        </Grid>
        <Grid item xs={grid[1]}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              sx={{ textTransform: 'none' }}
              onClick={() => {
                history(RUTAS_SUCURSALES);
              }}
            >
              <span style={{ color: 'white', fontSize: fontSizeM }}>Sucursales</span>

            </Button>
            <Button
              sx={{ textTransform: 'none' }}
              onClick={() => {
                history(RUTAS_QUIENES_SOMOS);
              }}
            >
              <span style={{ color: 'white', fontSize: fontSizeM }}>Quiénes Somos</span>
            </Button>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ p: 2 }}
            >
              <Button
                variant="contained"
                color="success"
                style={{ fontSize: fontSizeM }}
                onClick={() => history(RUTAS_RESERVAR_HORA)}
              >
                Reserva de Hora
              </Button>
              <Button
                variant="outlined"
                color="success"
                style={{ fontSize: fontSizeM - 3 }}
                onClick={() => history(RUTAS_CANCELAR_RESERVAS)}
              >
                Cancelar Hora
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;

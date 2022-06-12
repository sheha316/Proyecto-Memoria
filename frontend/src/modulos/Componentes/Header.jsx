import React from 'react';
import {
  Box, Stack, Button, Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import BasicPopover from './BasicPopover';
import logo from '../../assets/logo512.png';
import {
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
  let fontSizeL = 34;
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
    fontSizeL = 28;
    fontSizeM = 16;
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
            <BasicPopover fontSizeM={fontSizeM} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;

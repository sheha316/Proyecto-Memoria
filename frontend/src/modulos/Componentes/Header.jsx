import React from 'react';
import { Box, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useMediaQuery } from '@material-ui/core';
import BasicPopover from './BasicPopover';
import logo from '../../assets/Logo.png';
import {
  COLOR_BASE_1,
  RUTAS_HOME,
  RUTAS_SUCURSALES,
  RUTAS_QUIENES_SOMOS,
} from '../../constantes';

function Header() {
  const fontSizeL = 40;
  const fontSizeM = 20;
  const history = useNavigate();
  const isMobile = useMediaQuery(({ theme }) => theme.breakpoints.down('md'));
  // const isMobile = false;
  const Breakpoint = styled('img')(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '80px',
      height: '80px',
      // backgroundColor: 'blue',
    },
    [theme.breakpoints.up('md')]: {
      width: '160px',
      height: '160px',
      // backgroundColor: 'red',
    },
  }));
  return (
    <Box style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: COLOR_BASE_1,
    }}
    >
      <Button
        sx={{ textTransform: 'none' }}
        onClick={() => {
          history(RUTAS_HOME);
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
        >
          <Breakpoint
            alt=""
            src={logo}
            style={{
              width: '80px',
              height: '80px',
            }}
          />

          <span style={{ color: 'white', fontSize: fontSizeL }}>Reservas.cl</span>
        </Stack>
      </Button>

      <Stack style={{ margin: '10px', marginRight: '50px' }} direction={!isMobile ? 'row' : 'vertical'} spacing={5} alignItems="center">
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
        <BasicPopover />
      </Stack>
    </Box>
  );
}

export default Header;

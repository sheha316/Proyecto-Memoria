import React from 'react';
import { Box, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png';

import {
  COLOR_BASE_1, COLOR_BUTTON_1, COLOR_BUTTON_2, COLOR_BUTTON_3, COLOR_BUTTON_4,
  RUTAS_HOME,
  RUTAS_SUCURSALES,
  RUTAS_QUIENES_SOMOS,
  RUTAS_RESERVAR_HORA,
  RUTAS_CANCELAR_RESERVAS,
} from '../../constantes';

function Header() {
  const fontSizeL = 40;
  const fontSizeM = 20;
  const history = useNavigate();
  return (
    <>
      <Box style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px',
      }}
      >
        <Button
          sx={{ textTransform: 'none', ':hover': { backgroundColor: 'white' } }}
          onClick={() => {
            history(RUTAS_HOME);
          }}
        >
          <Stack direction="row" spacing={3} alignItems="center">
            <img alt="" src={logo} style={{ width: '80px', height: '80px' }} />
            <span style={{ color: COLOR_BASE_1, fontSize: fontSizeL }}>Reservas.cl</span>
          </Stack>
        </Button>
        <Stack>
          <span style={{ color: 'gray', fontSize: fontSizeL - 10 }}>Call Center</span>
          <span style={{ color: 'gray', fontSize: fontSizeL - 10 }}>(+56) 22847 9821</span>
        </Stack>
      </Box>

      <Box style={{
        display: 'flex',
        backgroundColor: COLOR_BASE_1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '10px',
      }}
      >
        <Stack style={{ margin: '10px', marginRight: '50px' }} direction="row" spacing={10} alignItems="center">
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
          <Button
            variant="outlined"
            sx={{ textTransform: 'none', backgroundColor: COLOR_BUTTON_1, ':hover': { backgroundColor: COLOR_BUTTON_2 } }}
            onClick={() => {
              history(RUTAS_RESERVAR_HORA);
            }}
          >
            <span style={{ color: 'white', fontSize: fontSizeM }}>Reservar Hora</span>
          </Button>
          <Button
            variant="outlined"
            sx={{ textTransform: 'none', backgroundColor: COLOR_BUTTON_3, ':hover': { backgroundColor: COLOR_BUTTON_4 } }}
            onClick={() => {
              history(RUTAS_CANCELAR_RESERVAS);
            }}
          >
            <span style={{ color: 'white', fontSize: fontSizeM }}>Cancelar Hora</span>
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default Header;

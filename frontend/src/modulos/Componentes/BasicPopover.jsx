/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BUTTON_1,
  COLOR_BUTTON_2,
  COLOR_BUTTON_3,
  RUTAS_RESERVAR_HORA,
  RUTAS_CANCELAR_RESERVAS,
} from '../../constantes';

export default function BasicPopover() {
  const history = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        onMouseEnter={(e) => handleClick(e)}
        sx={{ p: 1, backgroundColor: COLOR_BUTTON_1, ':hover': { backgroundColor: COLOR_BUTTON_2 } }}
      >
        Reserva de Hora
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack>
          <Button
            sx={{ p: 2, color: COLOR_BASE_1, textTransform: 'none' }}
            onClick={() => {
              handleClose();
              history(RUTAS_RESERVAR_HORA);
            }}
          >
            Reservar una Hora
          </Button>
          <Button
            sx={{ p: 2, textTransform: 'none' }}
            onClick={() => {
              handleClose();
              history(RUTAS_CANCELAR_RESERVAS);
            }}
          >
            Cancelar una Hora
          </Button>
        </Stack>
      </Popover>
    </div>
  );
}

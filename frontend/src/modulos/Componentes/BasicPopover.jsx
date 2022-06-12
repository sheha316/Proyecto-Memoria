/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  RUTAS_RESERVAR_HORA,
} from '../../constantes';

export default function BasicPopover({ fontSizeM }) {
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
    <Button
      variant="contained"
      color="success"
      onClick={() => history(RUTAS_RESERVAR_HORA)}
    >
      Reserva de Hora
    </Button>
  );
}

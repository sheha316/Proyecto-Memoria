/* eslint-disable react/prop-types */
import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { secondary } from '../../constantes';

export default function BasicPopover({
  sucursalSeleccionada,
  TODASLASSUCURSALES, optionsSucursales,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        variant="outlined"
        color="secondary"
        style={{
          color: 'white', fontWeight: 'bold', whiteSpace: 'break-spaces', border: 'solid', borderColor: secondary,
        }}
        onClick={handleClick}
      >
        <FilterAltIcon color="white" />
        Sucursal:
        <span>
          {sucursalSeleccionada !== TODASLASSUCURSALES ? sucursalSeleccionada.split(',')[0] : sucursalSeleccionada}
        </span>
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
        {optionsSucursales()}
      </Popover>
    </div>
  );
}

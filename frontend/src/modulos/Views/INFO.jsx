import {
  FormLabel, Grid, Container,
} from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  primary,
} from '../../constantes';

function INFO() {
  const {
    Titulo,
    texto,
    imagen,
  } = useLocation().state;
  const theme = useTheme();
  const cellphone = useMediaQuery(theme.breakpoints.down('md'));
  const grid = cellphone ? [12, 0, 12] : [4, 3, 4];
  return (
    <Container>
      <FormLabel
        sx={{
          color: primary,
          fontWeight: 'bold',
          borderRadius: 3,
          padding: 2,
          fontSize: 25,
        }}
      >
        {Titulo}
      </FormLabel>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={grid[0]}>
          <img alt="" src={imagen} />
        </Grid>
        <Grid item xs={grid[1]} />
        <Grid item xs={grid[2]}>
          {texto}
        </Grid>
      </Grid>
    </Container>
  );
}
export default INFO;

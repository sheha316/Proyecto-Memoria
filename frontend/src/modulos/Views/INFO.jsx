/* eslint-disable max-len */
import {
  FormLabel, Grid, Container,
} from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  primary,
} from '../../constantes';

function INFO() {
  const {
    Titulo,
    texto,
    imagen,
  } = useLocation().state;
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
        <Grid item xs={4}>
          <img alt="" src={imagen} />
        </Grid>
        <Grid item xs={4}>
          {texto}
        </Grid>
      </Grid>
    </Container>
  );
}
export default INFO;

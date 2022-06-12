/* eslint-disable max-len */
import {
  FormLabel, Grid, Container,
} from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  primary,
} from '../../constantes';
import NewsCards from '../Componentes/NewsCards';
import imagen1 from '../../assets/new-1.jpg';
import imagen2 from '../../assets/new-2.jpg';
import imagen3 from '../../assets/new-3.jpg';
import imagen4 from '../../assets/new-4.jpg';
import imagen5 from '../../assets/new-5.jpg';
import imagen6 from '../../assets/new-6.jpg';

function Home() {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.up('md')) ? 4 : 10;
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
        Infórmate Aqui
        {' '}
      </FormLabel>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={xs}>
          {NewsCards(
            imagen1,
            '¿Qué es la viruela del mono?',
            'La viruela del mono se transmite de animales a seres humanos y está causando preocupación a nivel mundial.',
          )}
        </Grid>
        <Grid item xs={xs}>
          {NewsCards(
            imagen2,
            'Qué es la hipertensión arterial',
            'La hipertensión suele ser asintomática y requiere, por tanto, que las personas se hagan chequeos preventivos de manera regular para pesquisarla.',
          )}
        </Grid>
        <Grid item xs={xs}>
          {NewsCards(
            imagen3,
            'Alimentación saludable',
            'Voluntarios de Clínica trabajaron durante tres jornadas en la recuperación de huerto en colegio de Colina',
          )}
        </Grid>
        <Grid item xs={xs}>
          {NewsCards(
            imagen4,
            'Dolor de cabeza: ¿cuánto afecta a la población?',
            'La mitad de las personas sufrirían dolores de cabeza y los síntomas son más usuales en mujeres que en hombres.',
          )}
        </Grid>
        <Grid item xs={xs}>
          {NewsCards(
            imagen5,
            'Hepatitis aguda grave en niños',
            'La OMS emitió una alerta internacional frente a un aumento inusual de casos de hepatitis aguda severa de causa desconocida en niños.',
          )}
        </Grid>
        <Grid item xs={xs}>
          {NewsCards(
            imagen6,
            'Teleconsulta pediátrica',
            'Atención y beneficios similares a una consulta presencial, pero sin salir al frío. Con telemedicina, ayudamos a evaluar a tu hija o hijo y a identificar si es necesario ir a Urgencia.',
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
export default Home;

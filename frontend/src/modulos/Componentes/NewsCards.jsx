import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { RUTAS_INFO } from '../../constantes';

export default function MediaCard(imagen, Titulo, texto) {
  const history = useNavigate();
  return (
    <Card sx={{ width: '80%', height: '100%' }}>
      <CardMedia
        component="img"
        height="35%"
        image={imagen}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {Titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {texto}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="secondary"
          onClick={() => history(RUTAS_INFO, {
            state: {
              Titulo,
              texto,
              imagen,
            },
          })}
        >
          Leer Más
        </Button>
      </CardActions>
    </Card>
  );
}

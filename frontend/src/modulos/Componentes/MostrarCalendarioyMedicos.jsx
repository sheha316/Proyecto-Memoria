/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, FormLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Calendario from './Calendario';
import TarjetasMedicos from './TarjetasMedicos';
import loadingGif from '../../assets/loading.gif';

function MostrarCalendarioyMedicos({
  agendasMedicos, area, fecha, setFecha, FirstDay, LastDay, Title, OpcionesDeBusquedaSeleccionada,
}) {
  const theme = useTheme();
  const imgWidth = useMediaQuery(theme.breakpoints.down('sm')) ? '80%' : '';

  return (
    <>
      { agendasMedicos !== '' && fecha !== '' && (
      <>
        <FormLabel sx={{
          color: 'black',
          fontWeight: 'bold',
          marginTop: 3,
        }}
        >
          {Title}
        </FormLabel>
        <Grid
          item
          sx={{
            backgroundColor: '#c5c5c5',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginTop: 1,
          }}
          xs={12}
        >

          <Calendario
            agendasMedicos={agendasMedicos}
            fecha={fecha}
            setFecha={setFecha}
            FirstDay={FirstDay}
            LastDay={LastDay}
          />
          <TarjetasMedicos
            dia={fecha}
            agendasMedicos={agendasMedicos}
            OpcionesDeBusquedaSeleccionada={OpcionesDeBusquedaSeleccionada}
            area={area}
          />
        </Grid>
      </>
      )}
      {(agendasMedicos === '' || fecha === '') && (
      <Grid
        item
        sx={{
          textAlignLast: 'center',
          marginTop: 1,
        }}
        xs={12}
      >
        <img style={{ width: imgWidth }} src={loadingGif} alt="" />
      </Grid>
      )}
    </>
  );
}

export default MostrarCalendarioyMedicos;

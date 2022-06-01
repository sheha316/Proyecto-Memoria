/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, FormLabel } from '@mui/material';
import Calendario from './Calendario';
import TarjetasMedicos from './TarjetasMedicos';

function MostrarCalendarioyMedicos({
  agendasMedicos, area, fecha, setFecha, FirstDay, LastDay, Title, OpcionesDeBusquedaSeleccionada,
}) {
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
        <img src="https://thumbs.gfycat.com/PepperyMediumBrahmancow-size_restricted.gif" alt="" />
      </Grid>
      )}
    </>
  );
}

export default MostrarCalendarioyMedicos;

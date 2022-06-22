/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, FormLabel, Grid, Divider, FormControlLabel, Radio, RadioGroup, Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  RUTAS_RESERVAR_HORA_AREA, RUTAS_RESERVAR_HORA_CON_MEDICO, primary, secondary, success,
} from '../../constantes';
import Stepper from '../Componentes/Stepper';
import api from '../../API/api';
import AutocompleteForm from '../Componentes/AutocompleteForm';
import loadingGif from '../../assets/loading.gif';

function ReservarHoras() {
  const history = useNavigate();
  const OpcionesDeBusqueda = ['Área Médica', 'Nombre del Médico'];
  const [OpcionesDeBusquedaSeleccionada,
    setOpcionesDeBusquedaSeleccionada] = useState(OpcionesDeBusqueda[0]);
  const theme = useTheme();
  const imgWidth = useMediaQuery(theme.breakpoints.down('sm')) ? '80%' : '';
  const SearchOptionsVertical = useMediaQuery(theme.breakpoints.down('lg'));
  console.log(OpcionesDeBusquedaSeleccionada);
  const [areaMedica, setAreaMedica] = useState([]);
  const [medicos, setMedicos] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [AreaSeleccionada, setAreaSeleccionada] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [medicoSeleccionado, setMedicoSeleccionado] = useState({});

  useEffect(() => {
    async function getData() {
      setAreaMedica(await api.getSpecs());
      setMedicos(await api.getMedicos());
    }
    getData();
  }, []);
  const handleSubmitEspecialista = (values) => {
    history(
      RUTAS_RESERVAR_HORA_CON_MEDICO,
      {
        state: {
          medico: [values.medicoSeleccionado],
          OpcionesDeBusquedaSeleccionada: 'Médico Especialista',
        },
      },
    );
  };
  const handleSubmitAreaMedica = (values) => {
    history(
      RUTAS_RESERVAR_HORA_AREA,
      {
        state: {
          area: values.areaSeleccionada,
          OpcionesDeBusquedaSeleccionada: 'Área Médica',
        },
      },
    );
  };

  return (
    <Container>
      <Stepper
        step={0}
        search="Método de Búsqueda"
        OpcionesDeBusquedaSeleccionada={OpcionesDeBusquedaSeleccionada}
      />
      <Box sx={{ marginTop: 5, width: '100%' }}>
        <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>
          Elija Método de Búsqueda
        </FormLabel>
        {(areaMedica.length > 0 && medicos.length > 0)
          ? (
            <RadioGroup
              defaultValue={OpcionesDeBusqueda[0]}
              onChange={(e) => { setOpcionesDeBusquedaSeleccionada(e.target.value); }}
              value={OpcionesDeBusquedaSeleccionada}
            >
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: 5 }}
              >
                <Grid
                  item
                  xs={SearchOptionsVertical ? 12 : 5.8}
                  onClick={() => {
                    setOpcionesDeBusquedaSeleccionada(OpcionesDeBusqueda[0]);
                  }}
                >
                  <FormControlLabel value={OpcionesDeBusqueda[0]} control={<Radio />} />
                  <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>
                    Buscar por
                    {' '}
                    {OpcionesDeBusqueda[0]}
                  </FormLabel>
                  <AutocompleteForm
                    OpcionesDeBusqueda={OpcionesDeBusqueda}
                    handleSubmit={handleSubmitAreaMedica}
                    opcionBusqueda={OpcionesDeBusqueda[0]}
                    setOpcionBusqueda={setOpcionesDeBusquedaSeleccionada}
                    opciones={areaMedica}
                    seter={setAreaSeleccionada}
                    selected={OpcionesDeBusquedaSeleccionada === OpcionesDeBusqueda[0]}
                  />
                </Grid>
                {!SearchOptionsVertical && (
                <Divider orientation="vertical" flexItem>
                  o
                </Divider>
                )}
                {SearchOptionsVertical && (
                <Grid item xs={10} sx={{ margin: 1 }}>
                  <Divider flexItem>
                    o
                  </Divider>
                </Grid>
                )}
                <Grid
                  item
                  xs={SearchOptionsVertical ? 12 : 5.9}
                  onClick={() => {
                    setOpcionesDeBusquedaSeleccionada(OpcionesDeBusqueda[1]);
                  }}
                >
                  <FormControlLabel value={OpcionesDeBusqueda[1]} control={<Radio />} />
                  <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>
                    Buscar por
                    {' '}
                    {OpcionesDeBusqueda[1]}
                  </FormLabel>
                  <AutocompleteForm
                    OpcionesDeBusqueda={OpcionesDeBusqueda}
                    handleSubmit={handleSubmitEspecialista}
                    opcionBusqueda={OpcionesDeBusqueda[1]}
                    setOpcionBusqueda={setOpcionesDeBusquedaSeleccionada}
                    opciones={medicos}
                    seter={setMedicoSeleccionado}
                    selected={OpcionesDeBusquedaSeleccionada === OpcionesDeBusqueda[1]}
                  />
                </Grid>

              </Grid>
            </RadioGroup>
          )
          : (
            <Box
              sx={{
                textAlignLast: 'center',
                marginTop: 1,
              }}
            >
              <img style={{ width: imgWidth }} src={loadingGif} alt="" />
            </Box>
          )}
      </Box>
    </Container>
  );
}

export default ReservarHoras;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container, Box, FormLabel, Modal, Typography, Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoadingButton from '@mui/lab/LoadingButton';
import Stepper from '../Componentes/StepperDelete';
import api from '../../API/api';
import TablaCitas from '../Componentes/TablaCitas';
import DatesHour from '../../utilities/Dates&Hour';
import { COLOR_BUTTON_4 } from '../../constantes';

function CancelarReservaMisReservas() {
  const { values } = useLocation().state;
  const id = values.Nacionalidad === 'Chileno' ? 'Rut' : 'Pasaporte';
  const [misReservas, setMisReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const widthModal = useMediaQuery(theme.breakpoints.down('sm')) ? '70%' : 400;
  const [open, setOpen] = useState(false);
  const [cita, setCita] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    async function getMisReservas() {
      await setMisReservas(await api.getMisCitas(values));
      setLoading(false);
    }
    getMisReservas();
  }, []);
  const handleCancelDate = (citaACancelr) => {
    setCita(citaACancelr);
    handleOpen();
  };
  const cancelarCitaBackend = async () => {
    await api.postSendEmailDeleteCita(cita);
    window.location.reload(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: widthModal,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Container>
      <Stepper step={1} id={id} />
      <Box sx={{ marginTop: 5, width: '100%' }}>
        {open
          && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                ¿Cancelar Hora?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Médico:
                {' '}
                {cita.Medico.nombre}
                {' '}
                {cita.Medico.apellido}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Sucursal:
                {' '}
                {cita.Medico.sucursal}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Fecha de la cita:
                {' '}
                {DatesHour.StringDateToDate(cita.Fecha_cita)}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Hora de la cita:
                {' '}
                {DatesHour.ObtenerHoraSegunBloque(cita.Bloque)}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                ¿Está seguro que desea cancelar su hora?
              </Typography>
              <Box style={{ justifyContent: 'space-around', display: 'flex' }}>
                <Button
                  sx={{
                    marginTop: 2,
                  }}
                  onClick={handleClose}
                >
                  Volver
                </Button>
                <LoadingButton
                  onClick={() => { setIsLoading(true); cancelarCitaBackend(); }}
                  loading={isLoading}
                  sx={{
                    marginTop: 2, color: 'white', backgroundColor: 'red', ':hover': { backgroundColor: COLOR_BUTTON_4 },
                  }}
                >
                  Cancelar Hora
                </LoadingButton>

              </Box>
            </Box>
          </Modal>
          )}
        <FormLabel sx={{ color: 'black', fontWeight: 'bold' }}>
          Citas Programadas
        </FormLabel>
        {!loading && misReservas.length > 0
        && <TablaCitas handleCancelDate={handleCancelDate} citas={misReservas} />}
        {!loading && misReservas.length < 1
        && (
        <Box sx={{ marginTop: 5, width: '100%' }}>
          <FormLabel sx={{
            color: 'black', fontWeight: 'bold', width: '100%', textAlign: 'center',
          }}
          >
            No se han encontrado citas programadas para usted
          </FormLabel>
        </Box>
        )}
      </Box>

    </Container>
  );
}

export default CancelarReservaMisReservas;

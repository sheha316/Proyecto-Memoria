/* eslint-disable max-len */
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import reportWebVitals from './reportWebVitals';
import Layout from './Layout';
import ReservarHoras from './modulos/Views/ReservarHoras';
import ReservarHorasArea from './modulos/Views/ReservarHorasArea';
import IngresarDatos from './modulos/Views/IngresarDatos';
import HoraReservada from './modulos/Views/HoraReservada';
import QuienesSomos from './modulos/Views/QuienesSomos';
import Sucursales from './modulos/Views/Sucursales';
import ReservarConMedico from './modulos/Views/ReservarConMedico';
import Home from './modulos/Views/Home';
import CancelarReserva from './modulos/Views/CancelarReserva';
import CancelarReservaMisReservas from './modulos/Views/CancelarReservaMisReservas';
import ScrollToTop from './ScrollToTop';
import {
  RUTAS_HOME,
  RUTAS_SUCURSALES,
  RUTAS_QUIENES_SOMOS,
  RUTAS_RESERVAR_HORA,
  RUTAS_RESERVAR_HORA_AREA,
  RUTAS_INGRESAR_DATOS,
  RUTAS_HORA_RESERVADA,
  RUTAS_RESERVAR_HORA_CON_MEDICO,
  RUTAS_CANCELAR_RESERVAS,
  RUTAS_CANCELAR_RESERVAS_MIS_RESERVAS,
  primary,
  secondary,
  success,
  error,
} from './constantes';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  palette: {
    primary: { main: primary },
    secondary: { main: secondary },
    success: { main: success, contrastText: 'white' },
    error: { main: error },
  },
});
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>

        <ScrollToTop />
        <Routes path="/">

          <Route exact path={RUTAS_HOME} element={<Layout component={<Home />} />} />
          <Route exact path={RUTAS_SUCURSALES} element={<Layout component={<Sucursales />} />} />
          <Route exact path={RUTAS_QUIENES_SOMOS} element={<Layout component={<QuienesSomos />} />} />

          <Route exact path={RUTAS_RESERVAR_HORA} element={<Layout component={<ReservarHoras />} />} />
          <Route exact path={RUTAS_RESERVAR_HORA_AREA} element={<Layout component={<ReservarHorasArea />} />} />
          <Route exact path={RUTAS_RESERVAR_HORA_CON_MEDICO} element={<Layout component={<ReservarConMedico />} />} />

          <Route exact path={RUTAS_INGRESAR_DATOS} element={<Layout component={<IngresarDatos />} />} />

          <Route exact path={RUTAS_HORA_RESERVADA} element={<Layout component={<HoraReservada />} />} />

          <Route exact path={RUTAS_CANCELAR_RESERVAS} element={<Layout component={<CancelarReserva />} />} />
          <Route exact path={RUTAS_CANCELAR_RESERVAS_MIS_RESERVAS} element={<Layout component={<CancelarReservaMisReservas />} />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(cnsole.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

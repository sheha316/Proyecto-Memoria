/* eslint-disable max-len */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Layout from './Layout';

import ReservarHoras from './modulos/Views/ReservarHoras';
import ReservarHorasArea from './modulos/Views/ReservarHorasArea';
import IngresarDatos from './modulos/Views/IngresarDatos';
import HoraReservada from './modulos/Views/HoraReservada';
import ReservarConMedico from './modulos/Views/ReservarConMedico';

import {
  RUTAS_HOME,
  RUTAS_SUCURSALES,
  RUTAS_QUIENES_SOMOS,
  RUTAS_RESERVAR_HORA,
  RUTAS_RESERVAR_HORA_AREA,
  RUTAS_INGRESAR_DATOS,
  RUTAS_HORA_RESERVADA,
  RUTAS_RESERVAR_HORA_CON_MEDICO,
} from './constantes';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes path="/">

        <Route exact path={RUTAS_HOME} element={<Layout component={<>hola</>} />} />
        <Route exact path={RUTAS_SUCURSALES} element={<Layout component={<>hola</>} />} />
        <Route exact path={RUTAS_QUIENES_SOMOS} element={<Layout component={<>hola</>} />} />

        <Route exact path={RUTAS_RESERVAR_HORA} element={<Layout component={<ReservarHoras />} />} />
        <Route exact path={RUTAS_RESERVAR_HORA_AREA} element={<Layout component={<ReservarHorasArea />} />} />
        <Route exact path={RUTAS_RESERVAR_HORA_CON_MEDICO} element={<Layout component={<ReservarConMedico />} />} />

        <Route exact path={RUTAS_INGRESAR_DATOS} element={<Layout component={<IngresarDatos />} />} />

        <Route exact path={RUTAS_HORA_RESERVADA} element={<Layout component={<HoraReservada />} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(cnsole.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

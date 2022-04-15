/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Layout from './Layout';

import ReservarHoras1 from './modulos/Views/ReservarHoras1';
import {
  RUTAS_HOME,
  RUTAS_SUCURSALES,
  RUTAS_QUIENES_SOMOS,
  RUTAS_RESERVAR_HORA,
} from './constantes';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes path="/">
        <Route exact path={RUTAS_HOME} element={<Layout component={<>hola</>} />} />
        <Route exact path={RUTAS_SUCURSALES} element={<Layout component={<>hola</>} />} />
        <Route exact path={RUTAS_QUIENES_SOMOS} element={<Layout component={<>hola</>} />} />
        <Route exact path={RUTAS_RESERVAR_HORA} element={<Layout component={<ReservarHoras1 />} />} />
        <Route exact path="" element={<Layout component={<>hola</>} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

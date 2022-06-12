/* eslint-disable array-callback-return */
import axios from 'axios';
import newDate from '../utilities/newDate';

const baseUrl = process.env.REACT_APP_API_URL;

async function getMedicos() {
  const response = await axios.get(`${baseUrl}/medicos/obtenerMedicos`);
  return response.data.response;
}

async function getSpecs() {
  const response = await axios.get(`${baseUrl}/spec/obtenerSpecs`);
  return response.data.response;
}
async function getAgendas(area) {
  console.log('getAgendas init ');
  const hoy = newDate.getActualDate();
  const fecha = `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}`;
  const response = await axios.get(`${baseUrl}/agendas/getAgendas`, { params: { area, diaLocal: fecha } });
  console.log('getAgendas end ', response.data);
  return response.data;
}
async function getAgendaOfOne(medicos) {
  const hoy = newDate.getActualDate();
  const fecha = `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}`;
  const response = await axios.get(`${baseUrl}/agendas/getAgenda`, { params: { medicos, diaLocal: fecha } });
  return response.data;
}
async function postCreateCita(datos) {
  const response = await axios.post(`${baseUrl}/citas/postCreateCita`, datos);
  return response.data;
}
async function getMisCitas(datos) {
  const response = await axios.get(`${baseUrl}/citas/getMisCitas`, { params: { datos } });
  return response.data.cita;
}
async function postSendEmailDeleteCita(datos) {
  const response = await axios.post(`${baseUrl}/citas/sendEmailDeleteCita`, datos);
  return response.data;
}
export default {
  getMedicos,
  getSpecs,
  postCreateCita,
  getAgendas,
  getMisCitas,
  postSendEmailDeleteCita,
  getAgendaOfOne,
};

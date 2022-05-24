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
async function getAllMedicosBySpec(spec) {
  const response = await axios.get(`${baseUrl}/medicos/getAllMedicosBySpec`, { params: { spec } });
  return response.data;
}
async function getAgendas(sucursales, medicos) {
  console.log('init getAgendas', new Date());
  const hoy = newDate.getActualDate();
  const fecha = `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}`;
  const [s1, s2, s3, s4] = await Promise.all([
    axios.get(`${baseUrl}/agendas/getAgendas`, { params: { medicos: medicos[sucursales[0].split(',')[0]], diaLocal: fecha } }),
    axios.get(`${baseUrl}/agendas/getAgendas`, { params: { medicos: medicos[sucursales[1].split(',')[0]], diaLocal: fecha } }),
    axios.get(`${baseUrl}/agendas/getAgendas`, { params: { medicos: medicos[sucursales[2].split(',')[0]], diaLocal: fecha } }),
    axios.get(`${baseUrl}/agendas/getAgendas`, { params: { medicos: medicos[sucursales[3].split(',')[0]], diaLocal: fecha } }),
  ]);
  console.log('end getAgendas', new Date());
  return {
    [sucursales[0].split(',')[0]]: s1.data,
    [sucursales[1].split(',')[0]]: s2.data,
    [sucursales[2].split(',')[0]]: s3.data,
    [sucursales[3].split(',')[0]]: s4.data,
  };
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
  getAllMedicosBySpec,
  postCreateCita,
  getAgendas,
  getMisCitas,
  postSendEmailDeleteCita,
};

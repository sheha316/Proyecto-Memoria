import axios from 'axios';

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
  console.log('getAllMedicosBySpec', response.data);
  return response.data;
}
async function getAgendas(medicos) {
  const hoy = new Date();
  const fecha = `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}`;
  console.log('getAgendas', medicos);
  const response = await axios.get(`${baseUrl}/agendas/getAgendas`, { params: { medicos, diaLocal: fecha } });
  console.log('getAgendas', response.data);
  return response.data;
}
async function postCreateCita(datos) {
  console.log('postCreateCita');
  const response = await axios.post(`${baseUrl}/medicos/getAllMedicosBySpec`, datos);
  console.log('postCreateCita', response.data);
  return response.data;
}
export default {
  getMedicos,
  getSpecs,
  getAllMedicosBySpec,
  postCreateCita,
  getAgendas,
};

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
async function getMedicosBySpec(spec) {
  const response = await axios.get(`${baseUrl}/medicos/obtenerMedicosBySpec`, { params: { spec } });
  return response.data.response;
}
export default { getMedicos, getSpecs, getMedicosBySpec };

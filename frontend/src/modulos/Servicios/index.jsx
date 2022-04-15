import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getCitas() {
  try {
    const response = await axios({
      url: `${baseUrl}/citas`,
      method: 'GET',
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function saveCita(productdata) {
  try {
    const formdata = new FormData();
    formdata.append('nombre_p', productdata.nombre);
    formdata.append('apellido_p', productdata.apellido);
    formdata.append('rut', productdata.rut);
    formdata.append('image', productdata.image);
    console.log(productdata);
    console.log(formdata);
    const response = await axios({
      url: `${baseUrl}/citas`,
      method: 'POST',
      data: formdata,
    });
    return response;
  } catch (e) {
    console.log(e);
  }`${baseUrl}/summon`;
}

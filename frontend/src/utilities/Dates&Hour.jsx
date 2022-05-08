import * as dateFns from 'date-fns';
import es from 'date-fns/locale/es';

function ObtenerHoraSegunBloque(bloque) {
  let horafinal = 8 + Math.floor(bloque / 2);
  if (horafinal > 12) {
    horafinal += 1;
  }
  let textoHora = '';
  if (horafinal < 10) {
    textoHora = `0${horafinal}:`;
  } else {
    textoHora = `${horafinal}:`;
  }
  return `${textoHora}${bloque % 2 === 0 ? '00' : '30'}`;
}
function StringDateToDate(datestring) {
  const fechas = datestring.split('-');
  const date = new Date(fechas[0], fechas[1] - 1, fechas[2]);
  const finaldate = dateFns.format(date, 'PPPPpppp', { locale: es }).split(' a las')[0];
  return finaldate;
}
export default {
  ObtenerHoraSegunBloque,
  StringDateToDate,
};

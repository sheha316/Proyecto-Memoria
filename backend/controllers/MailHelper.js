const {format} = require('date-fns')
const es = require('date-fns/locale/es')
const primary = '#0B7A75';
const secondary = '#3cb371';
const padding="0.5%"
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
function getMensaje(Nombres,Apellidos,Medico,fecha,Bloque,texto){
  const imagen="cid:logo@cid"
  return ( 
  "<div>Hola "+Nombres+" "+Apellidos+texto+"</div>"+
  "<div>&nbsp;</div>"+
  "<div style=\"padding-left: 10%; width: 75%;\">"+
  "<div style=\"text-align-last: center;\">"+
  "<img width=\"15%\" src=\""+imagen+"\" alt=\"Logo\"/>"+
  "<span style=\'display: block;font-size:48px;color:"+primary+";\'> Reservas.cl </span></div>"+
  "<div style=\'margin-top:1%;padding:"+padding+";font-size:24px;font-family:\"Arial\",sans-serif;background:"+secondary+";border-radius: 30px 30px 0 0;\'>"+
  "<p  style=\'text-align:center;background:"+secondary+";\'>"+
  "<span style=\'color:white;\'>Informaci&oacute;n de la cita</span></p></div>"+
  "<div style=\'background:#EEEEEE;padding:"+padding+";font-size:24px;font-family:\"Arial\",sans-serif;\'>"+
  "<p><span style=\'color:#222222;\'>Médico: "+Medico.nombre+" "+Medico.apellido+"</span></p>"+
  "<p><span style=\'color:#222222;\'>Especialidad: "+Medico.especializacion+"</span></p>"+
  "<p><span style=\'color:#222222;\'>Dirección: "+Medico.sucursal+"</span></p>"+
  "<p><span style=\'color:#222222;\'>Fecha: "+fecha+"</span></p>"+
  "<p><span style=\'color:#222222;\'>Hora: "+ObtenerHoraSegunBloque(Bloque)+"</span></p>"+
  "</div></div>"+
  "<p style=\'text-align: left;\' >Si quiere ver sus citas puede hacerlo en nuestra página <a href=\"https://reservas.inf.santiago.usm.cl/cancelar-reserva\">Reservas.cl</a></p>"
  )
}
function ObtenerMailDeRecordatorio(Nombres,Apellidos,Medico,Bloque,Fecha_cita){
    const fechas= Fecha_cita.split("-")
    const date=new Date(fechas[0],fechas[1]-1,fechas[2]);
    const fecha = format(date, 'PPPPpppp', { locale: es }).split(' a las')[0];
    const mensaje=getMensaje(Nombres,Apellidos,Medico,fecha,Bloque,", esto es un recordatorio para su cita.")
    return mensaje;
}
function MailParaBorrarCita(Nombres,Apellidos,Medico,Bloque,Fecha_cita){
  const fechas= Fecha_cita.split("-")
  const date=new Date(fechas[0],fechas[1]-1,fechas[2]);
  const fecha = format(date, 'PPPPpppp', { locale: es }).split(' a las')[0];
  const mensaje=getMensaje(Nombres,Apellidos,Medico,fecha,Bloque,", se ha cancelado la siguiente cita médica.")
  return mensaje;
}

module.exports= {ObtenerMailDeRecordatorio,MailParaBorrarCita}
const {format} = require('date-fns')
const es = require('date-fns/locale/es')
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
function ObtenerMailDeRecordatorio(Nombres,Apellidos,Medico,Bloque,Fecha_cita){
    const fechas= Fecha_cita.split("-")
    const date=new Date(fechas[0],fechas[1]-1,fechas[2]);
    const fecha = format(date, 'PPPPpppp', { locale: es }).split(' a las')[0];
    const imagen="cid:logo@cid"
    const mensaje=
    "<div>Hola "+Nombres+" "+Apellidos+", esto es un recordatorio para su cita.</div><div>&nbsp;</div><div style=\"padding-left: 10%; width: 80%;\">"+
    "<div style=\"background-color: #ffffff; color: #ffffff; border-top-left-radius: 30px; border-top-right-radius: 30px;\">"+
    "<p style=\'margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:107%;font-size:15px;font-family:\"Calibri\",sans-serif;text-align:center;\'>"+
    "<img width=\"100%\" src=\""+imagen+"\" alt=\"Logo\"></p>"+
    "<p style=\'padding:2%;border-top-left-radius:20px;border-top-right-radius:20px;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:\"Calibri\",sans-serif;text-align:center;background:#0077FF;\'><span style='font-size:24px;font-family:\"Arial\",sans-serif;color:white;\'>Informaci&oacute;n De la cita</span></p>"+
    "<p style=\'padding:2%;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:\"Calibri\",sans-serif;background:#EEEEEE;'><span style='font-size:24px;font-family:\"Arial\",sans-serif;color:#222222;\'>Médico: "+Medico.nombre+" "+Medico.apellido+"</span></p>"+
    "<p style=\'padding:2%;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:\"Calibri\",sans-serif;background:#EEEEEE;'><span style='font-size:24px;font-family:\"Arial\",sans-serif;color:#222222;\'>Especialidad: "+Medico.especializacion+"</span></p>"+
    "<p style=\'padding:2%;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:\"Calibri\",sans-serif;background:#EEEEEE;'><span style='font-size:24px;font-family:\"Arial\",sans-serif;color:#222222;\'>Dirección: "+Medico.sucursal+"</span></p>"+
    "<p style=\'padding:2%;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:\"Calibri\",sans-serif;background:#EEEEEE;'><span style='font-size:24px;font-family:\"Arial\",sans-serif;color:#222222;\'>Fecha: "+fecha+"</span></p>"+
    "<p style=\'padding:2%;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:\"Calibri\",sans-serif;background:#EEEEEE;'><span style='font-size:24px;font-family:\"Arial\",sans-serif;color:#222222;\'>Hora: "+ObtenerHoraSegunBloque(Bloque)+"</span></p>"+
    "<div>&nbsp;</div></div></div><p style=\'text-align: left;\' >Si quiere ver más en detalle su cita puede hacerlo en nuestra página <a href=\""+process.env.APP_HOST+"/canelar-reserva\"> Reservas.cl</a></p>"
    return mensaje;
}
function MailParaBorrarCita(Nombres,Apellidos,Medico,Bloque,Fecha_cita){
  const fechas= Fecha_cita.split("-")
  const date=new Date(fechas[0],fechas[1]-1,fechas[2]);
  const fecha = format(date, 'PPPPpppp', { locale: es }).split(' a las')[0];
  const imagen="cid:logo@cid"
  const mensaje=
  "<div>Hola "+Nombres+" "+Apellidos+", se ha cancelado la siguiente cita médica.</div><div>&nbsp;</div><div style=\"padding-left: 10%; width: 80%;\">"+
  "<div style=\"background-color: #ffffff; color: #ffffff; border-top-left-radius: 30px; border-top-right-radius: 30px;\">"+
  "<p style=\'margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:107%;font-size:15px;font-family:\"Calibri\",sans-serif;text-align:center;\'>"+
  "<img width=\"100%\" src=\""+imagen+"\" alt=\"Logo\"></p>"+
  "<p style=\'padding:2%;border-top-left-radius:20px;border-top-right-radius:20px;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:\"Calibri\",sans-serif;text-align:center;background:#0077FF;\'><span style='font-size:24px;font-family:\"Arial\",sans-serif;color:white;\'>Informaci&oacute;n De la cita</span></p>"+
  "<p style=\'padding:2%;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:\"Calibri\",sans-serif;background:#EEEEEE;'><span style='font-size:24px;font-family:\"Arial\",sans-serif;color:#222222;\'>Médico: "+Medico.nombre+" "+Medico.apellido+"</span></p>"+
  "<p style=\'padding:2%;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:\"Calibri\",sans-serif;background:#EEEEEE;'><span style='font-size:24px;font-family:\"Arial\",sans-serif;color:#222222;\'>Especialidad: "+Medico.especializacion+"</span></p>"+
  "<p style=\'padding:2%;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:\"Calibri\",sans-serif;background:#EEEEEE;'><span style='font-size:24px;font-family:\"Arial\",sans-serif;color:#222222;\'>Dirección: "+Medico.sucursal+"</span></p>"+
  "<p style=\'padding:2%;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:\"Calibri\",sans-serif;background:#EEEEEE;'><span style='font-size:24px;font-family:\"Arial\",sans-serif;color:#222222;\'>Fecha: "+fecha+"</span></p>"+
  "<p style=\'padding:2%;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:\"Calibri\",sans-serif;background:#EEEEEE;'><span style='font-size:24px;font-family:\"Arial\",sans-serif;color:#222222;\'>Hora: "+ObtenerHoraSegunBloque(Bloque)+"</span></p>"+
  "<div>&nbsp;</div></div></div>"
  return mensaje;
}
module.exports= {ObtenerMailDeRecordatorio,MailParaBorrarCita}
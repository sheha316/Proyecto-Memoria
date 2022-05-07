const agendas = require('../models/agendas')
const citas = require('../models/citas')
const nodemailer = require('nodemailer');
const MailHelper= require('./MailHelper');


function aunHayHoras(agenda){
	for(let i=0;i<agenda.bloques.length;i++){
		if(agenda.bloques[i]===""){
			return true
		}
	}
	return false;
}

async function sendEmailConfirmDate(cita){
	const {
		Nombres, 
		Apellidos,
		Email,
		Bloque,
		Fecha_cita,
		Medico
		}=cita
	const transport = nodemailer.createTransport({
		service: 'outlook',
		auth: {
			user: `${process.env.EMAIL_ADDRESS}`,
			pass: `${process.env.EMAIL_PASSWORD}`,
		},
	});
	console.log("hola1")
	const options = {
		from: `${process.env.EMAIL_ADDRESS}`,
		to: `${Email}`,
		subject: 'Reserva de Hora',
		html:MailHelper.ObtenerMailDeRecordatorio(Nombres,Apellidos,Medico,Bloque,Fecha_cita),
		attachments:[
			{
			content:process.env.LOGO,
            encoding: 'base64',
			cid: 'logo@cid',
			contentDisposition:"no"
			}
		]

	};
	console.log("hola2")
	await transport.sendMail(options, function(error, info){
		if (error) {
		console.log("error :cwa",error);
		} else {
		console.log('Email sent: ' + info.response);
		}
	});

}
async function postCreateCita(req,res){
	let values = req.body
	const test=false;
	try{
		const newCita=new citas(values)
		const agenda=await agendas.findOne({
			"id_medico":values.Medico._id,
			"fecha":values.Fecha_cita
		})
		await sendEmailConfirmDate(newCita);
		if(agenda.disponible && agenda.bloques[newCita.Bloque-1]===""){
			agenda.bloques[newCita.Bloque-1]=newCita._id
			if(!aunHayHoras(agenda)){
				agenda.disponible=false;
			}
			await agenda.save()
			await newCita.save()
			res.status(200).send({message:"done",cita:newCita})
		}else{
			res.status(201).send({message:"error"})
		}
	}catch(e){
		console.log("hola, errores :D",e.message)
		res.status(500).send({message:e.message})
	}
	return 
}
async function getMisCitas(req,res){
	let {Nacionalidad,Rut,Passaporte} = JSON.parse(req.query.datos);
	let hoy = new Date()
	const maxDate = (new Date(hoy.getFullYear(), hoy.getMonth() + 5, 0)).toISOString().split("T")[0]
	hoy=hoy.toISOString().split("T")[0]
	if(Nacionalidad==="Extranjero"){
		try{
			console.log(
				await citas.find({
					"Nacionalidad":Nacionalidad,
					"Pasaporte":Passaporte,
					"Fecha_cita":{$gt: hoy}
				})
			)
		}catch(e){
			console.log("error",e)
			res.status(500).send({message:e.message})
		}
		
	}else{
		try{
			console.log(
				await citas.find({
					"Nacionalidad":Nacionalidad,
					"Rut":Rut,
					"Fecha_cita":{$gt: hoy}
					})
			)
		}catch(e){
			console.log("error",e)
			res.status(500).send({message:e.message})
		}
	}
	
}
module.exports= {postCreateCita,getMisCitas}
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
	await transport.sendMail(options, function(error, info){
		if (error) {
		console.log("error :",error);
		} else {
		console.log('email enviado: ' + info.response);
		}
	});

}
async function postCreateCita(req,res){
	let values = req.body
	try{
		const newCita=new citas(values)
		const agenda=await agendas.findOne({
			"id_medico":values.Medico._id,
			"fecha":values.Fecha_cita
		})
		if(agenda.disponible && agenda.bloques[newCita.Bloque-1]===""){
			agenda.bloques[newCita.Bloque-1]=newCita._id
			if(!aunHayHoras(agenda)){
				agenda.disponible=false;
			}
			await sendEmailConfirmDate(newCita);
			await agenda.save()
			await newCita.save()
			res.status(200).send({message:"done",cita:newCita})
		}else{
			res.status(201).send({message:"error"})
		}
	}catch(e){
		res.status(500).send({message:e.message})
	}
	return 
}
async function deleteCita(citaPaciente){
	try{
		const cita=await citas.findOne({
			"_id":citaPaciente._id,
		})
		const agenda=await agendas.findOne({
			"fecha":cita.Fecha_cita,
			"id_medico":cita.Medico._id
		})
		agenda.bloques[cita.Bloque-1]="";
		agenda.disponible=true;
		await agenda.save()
		await citas.deleteOne({ _id: cita._id });
	}catch(e){
		console.log("error ",e)
	}
	return 
}
async function sendEmailDeleteCita(req,res){
	const {
		Nombres, 
		Apellidos,
		Email,
		Bloque,
		Fecha_cita,
		Medico,
		}=req.body
	const transport = nodemailer.createTransport({
		service: 'outlook',
		auth: {
			user: `${process.env.EMAIL_ADDRESS}`,
			pass: `${process.env.EMAIL_PASSWORD}`,
		},
	});
	const options = {
		from: `${process.env.EMAIL_ADDRESS}`,
		to: `${Email}`,
		subject: 'Cita Médica Cancelada',
		html:MailHelper.MailParaBorrarCita(Nombres,Apellidos,Medico,Bloque,Fecha_cita),
		attachments:[
			{
			content:process.env.LOGO,
            encoding: 'base64',
			cid: 'logo@cid',
			contentDisposition:"no"
			}
		]

	};
	await deleteCita(req.body);
	await transport.sendMail(options, function(error, info){
		if (error) {
		res.status(201).send({message:"error"})
		} else {
		res.status(200).send({message:"done"})
		}
	});
	

}
async function getMisCitas(req,res){
	let {Nacionalidad,Rut,Pasaporte,Email} = JSON.parse(req.query.datos);
	let hoy = new Date()
	const maxDate = (new Date(hoy.getFullYear(), hoy.getMonth() + 5, 0)).toISOString().split("T")[0]
	hoy=hoy.toISOString().split("T")[0]
	if(Nacionalidad==="Extranjero"){
		try{
			const cita=await citas.find({
					"Nacionalidad":Nacionalidad,
					"Pasaporte":Pasaporte,
					"Fecha_cita":{$gte: hoy},
					"Email":Email,
				}).sort({"Fecha_cita":1,"Bloque":1})
			res.status(200).send({message:"done",cita})
		}catch(e){
			res.status(500).send({message:e.message})
		}
		
	}else{
		try{
			const cita=await citas.find({
					"Nacionalidad":Nacionalidad,
					"Rut":Rut,
					"Fecha_cita":{$gte: hoy},
					"Email":Email,
					}).sort({"Fecha_cita":1,"Bloque":1})
			res.status(200).send({message:"done",cita})
		}catch(e){
			res.status(500).send({message:e.message})
		}
	}
	
}
module.exports= {postCreateCita,getMisCitas,deleteCita,sendEmailDeleteCita}
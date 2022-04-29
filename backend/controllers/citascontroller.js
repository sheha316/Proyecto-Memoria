const agendas = require('../models/agendas')
const citas = require('../models/citas')

function aunHayHoras(agenda){
	for(let i=0;i<agenda.bloques.length;i++){
		if(agenda.bloques[i]===""){
			return true
		}
	}
	return false;
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
			console.log(agenda)
			console.log(newCita)
			await agenda.save()
			await newCita.save()
			res.status(200).send({message:"done"})
		}else{
			console.log("hola?2 el retorno")
			res.status(201).send({message:"error"})
		}
	}catch(e){
		console.log("hola?3",e)
		res.status(500).send({message:e.message})
	}
	return 
}


module.exports= {postCreateCita}
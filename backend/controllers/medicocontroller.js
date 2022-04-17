const medicos = require('../models/medicos')

async function getMedicos(req,res){
	try{
		const  response= await medicos.find().lean().exec()
		res.status(200).send({response})
	}catch(e){
		res.status(500).send({message:e.message})
	}
}
async function getMedicosBySpec(req,res){
	try{
		console.log("hola, me llego: ",req)
		const  response= await medicos.find({"especializacion":req.query.spec}).lean().exec()
		res.status(200).send({response})
	}catch(e){
		res.status(500).send({message:e.message})
	}
}


module.exports= {getMedicos,getMedicosBySpec}
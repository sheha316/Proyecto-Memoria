const medicos = require('../models/medicos')

async function getMedicos(req,res){
	try{
		const  response= await medicos.find().lean().exec()
		res.status(200).send({response})
	}catch(e){
		res.status(500).send({message:e.message})
	}
}


module.exports= {getMedicos}
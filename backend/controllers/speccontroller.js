const spec = require('../models/spec')

async function getSpecs(req,res){
	console.log("hola?")
	try{
		const response= await spec.find().lean().exec()
		res.status(200).send({response})
	}catch(e){
		res.status(500).send({message:e.message})
	}
}


module.exports= {getSpecs}
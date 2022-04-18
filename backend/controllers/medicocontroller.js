const medicos = require('../models/medicos')

async function getMedicos(req,res){
	try{
		const  response= await medicos.find().lean().exec()
		res.status(200).send({response})
	}catch(e){
		res.status(500).send({message:e.message})
	}
}
async function getAllMedicosBySpec(req,res){
	try{
		console.log("hola, me llego: ",req.query)
		const  cisterna= await medicos.find(
			{"especializacion":req.query.spec,
			"sucursal":"La Cisterna, Livio Morra 2770"
		}).lean().exec()
		const  ñuñoa= await medicos.find(
			{"especializacion":req.query.spec,
			"sucursal":"Ñuñoa, Antonio Varas 3250"
		}).lean().exec()
		const  vitacura= await medicos.find(
			{"especializacion":req.query.spec,
			"sucursal":"Vitacura, El Canal 4500"
		}).lean().exec()
		const  macul= await medicos.find(
			{"especializacion":req.query.spec,
			"sucursal":'Macul, Olga Poblete 3720'
		}).lean().exec()
		console.log({cisterna,ñuñoa,vitacura,macul})
		res.status(200).send({cisterna,ñuñoa,vitacura,macul})
	}catch(e){
		res.status(500).send({message:e.message})
	}
}


module.exports= {getMedicos,getAllMedicosBySpec}
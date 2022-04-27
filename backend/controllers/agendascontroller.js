const agendas = require('../models/agendas')

async function getAgendas(req,res){
	const hoy = new Date(req.query.diaLocal)
	const maxDate = new Date(hoy.getFullYear(), hoy.getMonth() + 5, 0);
	let agendasMedicos=[]
	let Medicos=[]
	console.log(req.query)
	try{
		req.query.medicos.map(async(medicoI)=>{
			const medico=JSON.parse(medicoI)
			agendasMedicos.push(
				agendas.find({
					$and: [
						{"fecha": {$lte: maxDate.toISOString()}},
						{"fecha": {$gt: hoy.toISOString()}},
						{"id_medico":medico._id},
					]
				}).sort({fecha:1}).lean().exec()
			)
		})
		Promise.all(agendasMedicos).then(
			(agendas)=>{
				agendas.map((agenda)=>{
					Medicos.push(agenda[0].id_medico)
				})
				res.status(200).send({agendas,Medicos})
			}	
		)
		
	}catch(e){
		console.log("error",e)
		res.status(500).send({message:e.message})
	}
}


module.exports= {getAgendas}
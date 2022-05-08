const agendas = require('../models/agendas')

async function getAgendas(req,res){
	let hoy = new Date(req.query.diaLocal)
	const maxDate = (new Date(hoy.getFullYear(), hoy.getMonth() + 5, 0)).toISOString().split("T")[0]
	hoy=hoy.toISOString().split("T")[0]
	let agendasMedicos=[]
	let Medicos=[]
	try{
		req.query.medicos.map(async(medicoI)=>{
			const medico=JSON.parse(medicoI)
			agendasMedicos.push(
				agendas.find({
					$and: [
						{"fecha": {$lte: maxDate}},
						{"fecha": {$gt: hoy}},
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
		res.status(500).send({message:e.message})
	}
}


module.exports= {getAgendas}
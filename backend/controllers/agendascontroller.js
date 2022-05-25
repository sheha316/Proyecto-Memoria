const agendas = require('../models/agendas')

async function getAgendas(req,res){
	let hoy = new Date(req.query.diaLocal)
	const maxDate = (new Date(hoy.getFullYear(), hoy.getMonth() + 3, 0)).toISOString().split("T")[0]
	hoy=hoy.toISOString().split("T")[0]
	let agendasMedicos=[]
	let Medicos=[]
	try{
		if(req.query.medicos?.length>0){
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
			async(agendasM)=>{
				agendasM.map((agenda)=>{
					Medicos.push(agenda[0].id_medico)
				})
				const FDATE=await agendas.find({
						$and: [
							{"fecha": {$lte: maxDate}},
							{"fecha": {$gt: hoy}},
							{"id_medico":{$in:Medicos}},
							{"disponible":true}
						]
					}).sort({fecha:1}).limit(1).lean().exec()
				res.status(200).send({agendas:agendasM,Medicos,primerDia:FDATE[0].fecha})
			}	
		)
		}
		else{
			res.status(200).send({agendas:agendasMedicos,Medicos,primerDia:'2025-10-03'})
		}
	}catch(e){
		res.status(500).send({message:e.message})
	}
}


module.exports= {getAgendas}
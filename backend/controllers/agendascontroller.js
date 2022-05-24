const agendas = require('../models/agendas')

async function getAgendas(req,res){
	let hoy = new Date(req.query.diaLocal)
	const maxDate = (new Date(hoy.getFullYear(), hoy.getMonth() + 3, 0)).toISOString().split("T")[0]
	hoy=hoy.toISOString().split("T")[0]
	let agendasMedicos=[]
	let Medicos=[]
	let FirstDate=[]
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
			FirstDate.push(
				agendas.find({
					$and: [
						{"fecha": {$lte: maxDate}},
						{"fecha": {$gt: hoy}},
						{"id_medico":medico._id},
						{"disponible":true}
					]
				}).sort({fecha:1}).limit(1).lean().exec()
			)
			
		})
		const mindate=await Promise.all(FirstDate).then((fd)=>{
				var lowest ='99999-12-25';
				var tmp;
				for (var i=fd.length-1; i>=0; i--) {
					tmp = fd[i][0].fecha;
					if (tmp < lowest) lowest = tmp;
				}
				return lowest
		})
		Promise.all(agendasMedicos).then(
			(agendas)=>{
				agendas.map((agenda)=>{
					Medicos.push(agenda[0].id_medico)
				})
				res.status(200).send({agendas,Medicos,primerDia:mindate})
			}	
		)
		
	}catch(e){
		res.status(500).send({message:e.message})
	}
}


module.exports= {getAgendas}
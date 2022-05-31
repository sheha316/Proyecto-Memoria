const agendas = require('../models/agendas')
  
async function getAgendas(req,res){
	let hoy = new Date(req.query.diaLocal)
	const maxDate = (new Date(hoy.getFullYear(), hoy.getMonth() + process.env.MAXMESES, 0)).toISOString().split("T")[0]
	hoy=hoy.toISOString().split("T")[0]
	const aggAgendas = [
		{
		  '$match': {
			'$and': [
			  {
				'especializacion': req.query.area
			  }, {
				'fecha': {
				  '$lte': maxDate
				}
			  }, {
				'fecha': {
				  '$gt': hoy
				}
			  }
			]
		  }
		}, {
		  '$sort': {
			'fecha': 1
		  }
		}, {
		  '$group': {
			'_id': {
                'id_medico': '$id_medico', 
                'sucursal': '$sucursal'
            }, 
			'agendas': {
			  '$push': {
				'id_medico': '$id_medico', 
				'fecha': '$fecha', 
				'genero': '$genero', 
				'apellido': '$apellido', 
				'nombre': '$nombre', 
				'especializacion': '$especializacion', 
				'profesion': '$profesion', 
				'sucursal': '$sucursal', 
				'disponible': '$disponible', 
				'bloques': '$bloques'
			  }
			}
		  }
		}, {
		  '$group': {
			'_id': '$_id.sucursal', 
			'medicos': {
			  '$push': {
				'agenda': '$agendas'
			  }
			}
		  }
		}, {
			'$sort': {
				'_id': 1
			}
		}
	  ];
	  const aggFirstDay = [
		{
		  '$match': {
			'$and': [
			  {
				'especializacion': req.query.area
			  }, {
				'fecha': {
				  '$lte': maxDate
				}
			  }, {
				'fecha': {
				  '$gt': hoy
				}
			  }, {
				'disponible': true
			  }
			]
		  }
		}, {
		  '$sort': {
			'fecha': 1
		  }
		}, {
		  '$group': {
			'_id': '$sucursal', 
			'fecha': {
			  '$first': '$fecha'
			}
		  }
		}, {
		  '$sort': {
			'_id': 1
		  }
		}
	  ];
	try{
		const MedicosAgendas= agendas.aggregate(aggAgendas)
		const FirstDaySucursales= await agendas.aggregate(aggFirstDay)
		let firstDate='9999-99-99'
		for(let i=0;i<FirstDaySucursales.length;i++){
			if(firstDate>FirstDaySucursales[i].fecha){
				firstDate=FirstDaySucursales[i].fecha;
			}
		}
		res.status(200).send({agendas:await MedicosAgendas,FirstDay:FirstDaySucursales,FirstDayAll:firstDate})
	}catch(e){
		res.status(500).send({message:e.message})
	}
}

async function getAgenda(req,res){
	let hoy = new Date(req.query.diaLocal)
	const maxDate = (new Date(hoy.getFullYear(), hoy.getMonth() + process.env.MAXMESES, 0)).toISOString().split("T")[0]
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


module.exports= {getAgendas,getAgenda}
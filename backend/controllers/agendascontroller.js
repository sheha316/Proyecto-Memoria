const agendas = require('../models/agendas')
const MAXMESES=3
async function getAgendas(req,res){
	let hoy = new Date(req.query.diaLocal)
	const maxDate = (new Date(hoy.getFullYear(), hoy.getMonth() + MAXMESES, 0)).toISOString().split("T")[0]
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
	  const aggtDaysDisponibles = [
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
			'FirstDay': {
				'$first': '$fecha'
			}, 
			'LastDay': {
				'$last': '$fecha'
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
		const diasDisponibles= await agendas.aggregate(aggtDaysDisponibles)
		let firstDate=diasDisponibles[0].FirstDay;
		let lastDate=diasDisponibles[0].LastDay;
		for(let i=1;i<diasDisponibles.length;i++){
			if(firstDate>diasDisponibles[i].FirstDay){
				firstDate=diasDisponibles[i].FirstDay;
			}
			if(lastDate<diasDisponibles[i].LastDay){
				lastDate=diasDisponibles[i].LastDay;
			}
		}
		res.status(200).send({agendas:
			await MedicosAgendas,
			diasDisponibles:diasDisponibles,
			FirstDayAll:firstDate,
			LastDayAll:lastDate,})
	}catch(e){
		res.status(500).send({message:e.message})
	}
}

async function getAgenda(req,res){
	let hoy = new Date(req.query.diaLocal)
	const maxDate = (new Date(hoy.getFullYear(), hoy.getMonth() + MAXMESES, 0)).toISOString().split("T")[0]
	hoy=hoy.toISOString().split("T")[0]
	let agenda;
	const medico=JSON.parse(req.query.medicos[0])
	const filter = {
		'$and': [ {
			'id_medico': medico._id
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
	  };
	  let sort = {
		'fecha': 1
	  };
	try{
		agenda=agendas.find({
					$and: [
						{"fecha": {$lte: maxDate}},
						{"fecha": {$gt: hoy}},
						{"id_medico":medico._id},
					]
				}).sort(sort).lean().exec()
		const Days=awaitagendas.find(filter).sort(sort)
		res.status(200).send({
			agenda:await agenda,
			FirstDay: Days[0].fecha,
			LastDay:Days[Days.length-1].fecha,
		})
	}catch(e){
		console.log(e.message)
		res.status(500).send({message:e.message})
	}
}


module.exports= {getAgendas,getAgenda}
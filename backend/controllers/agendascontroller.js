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
	  const LastDayarg = [
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
			'fecha': -1
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
		const LastDaySucursales= await agendas.aggregate(LastDayarg)
		
		let firstDate=FirstDaySucursales[0].fecha;
		let lastDate=LastDaySucursales[0].fecha;;
		for(let i=1;i<FirstDaySucursales.length;i++){
			if(firstDate>FirstDaySucursales[i].fecha){
				firstDate=FirstDaySucursales[i].fecha;
			}
		}
		for(let i=1;i<LastDaySucursales.length;i++){
			if(lastDate<LastDaySucursales[i].fecha){
				lastDate=LastDaySucursales[i].fecha;
			}
		}
		res.status(200).send({agendas:
			await MedicosAgendas,
			FirstDay:FirstDaySucursales,
			FirstDayAll:firstDate,
			LastDay:LastDaySucursales,
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
	  const limit = 1;
	  
	try{
		agenda=await agendas.find({
					$and: [
						{"fecha": {$lte: maxDate}},
						{"fecha": {$gt: hoy}},
						{"id_medico":medico._id},
					]
				}).sort({fecha:1}).lean().exec()
		const FirstDay=await agendas.find(filter).sort(sort).limit(limit)
		sort = {
			'fecha': -1
		};
		const LastDay=await agendas.find(filter).sort(sort).limit(limit)
		res.status(200).send({
			agenda:agenda,
			FirstDay:FirstDay[0].fecha,
			LastDay:LastDay[0].fecha,
		})
	}catch(e){
		console.log(e.message)
		res.status(500).send({message:e.message})
	}
}


module.exports= {getAgendas,getAgenda}
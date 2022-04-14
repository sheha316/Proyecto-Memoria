const citas = require('../models/citas')

async function addcita(req,res){
	try{
		console.log(req)
		console.log(req.body)
		const{
			nombre_p,
			apellido_p,
			rut,
			fecha_cita
		}=req.body

		const cita= citas({nombre_p,
			apellido_p,
			rut,
			fecha_cita})

		if(req.file){
			const {filename}=req.file
			cita.setImgUrl(filename)
		}

		const cstored=await cita.save()
		res.status(201).send({cstored})
	}catch(e){
		res.status(500).send({message:e.message})
	}
}
async function getcita(req,res){
	try{
		const cita= await citas.find().lean().exec()
		res.status(200).send({cita})
	}catch(e){
		res.status(500).send({message:e.message})
	}
}

async function deletecita (req, res) {
	console.log(req.query._id)
    await citas.findOneAndDelete({ _id: req.query._id }, (err, product) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }

    if (!product) {
        return res
            .status(404)
            .json({ success: false, error:"Product not found", request: req })
    }

    return res.status(200).json({ success: true, data: product })
    }).catch(err => console.log(err))
}
module.exports= {addcita,getcita,deletecita}
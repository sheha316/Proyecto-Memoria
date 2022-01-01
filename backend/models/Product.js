const mongoose=require('mongoose')

const Schema=mongoose.Schema

const citasSchema=Schema({
	nombre_p: String,
	apellido_p: String,
	rut: String,
	fecha_cita: Date,
},{
	timestamps:true
})

module.exports=mongoose.model('citas',citasSchema)
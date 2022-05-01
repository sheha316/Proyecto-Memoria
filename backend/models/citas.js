const mongoose=require('mongoose')

const Schema=mongoose.Schema

const CitasSchema=Schema({
	Rut: String,
	Pasaporte: String,
	Nombres: String,
	Apellidos: String,
	Email:String,
	Teléfono: Number,
	Nacionalidad:String,
	Previsión:String,
	Bloque:Number,
	Fecha_cita:String,
	Fecha_nacimiento:String,
	Medico:{
		nombre: String,
		apellido: String,
		genero: String,
		profesion: String,
		sucursal:String,
		especializacion: String,
	},
},{
	timestamps:true
})

module.exports=mongoose.model('citas',CitasSchema)
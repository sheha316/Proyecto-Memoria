const mongoose=require('mongoose')

const Schema=mongoose.Schema

const MedicosSchema=Schema({
	nombre: String,
	apellido: String,
	genero: String,
	profesion: String,
	sucursal:String,
	especializacion: String,
},{
	timestamps:true
})

module.exports=mongoose.model('medicos',MedicosSchema)
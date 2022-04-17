const mongoose=require('mongoose')

const Schema=mongoose.Schema

const medicosSchema=Schema({
	nombre: String,
	apellido: String,
	genero: String,
	profesion: String,
	especializacion: String,
},{
	timestamps:true
})

module.exports=mongoose.model('medicos',medicosSchema)
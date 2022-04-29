const mongoose=require('mongoose')

const Schema=mongoose.Schema

const AgendaSchema=Schema({
	fecha: String,
	id_medico: String,
	disponible: Boolean,
	bloques: [String],

},{
	timestamps:true
})

module.exports=mongoose.model('agendas',AgendaSchema)
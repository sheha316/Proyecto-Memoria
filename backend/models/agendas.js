const mongoose=require('mongoose')

const Schema=mongoose.Schema

const agendaSchema=Schema({
	fecha: Date,
	id_medico: Schema.Types.ObjectId,
	disponible: Boolean,
	bloques: [String],

},{
	timestamps:true
})

module.exports=mongoose.model('agendas',agendaSchema)
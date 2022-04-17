const mongoose=require('mongoose')

const Schema=mongoose.Schema

const specSchema=Schema({
	profesion: String,
	especializacion: String,
},{
	timestamps:true
})

module.exports=mongoose.model('especializaciones',specSchema)
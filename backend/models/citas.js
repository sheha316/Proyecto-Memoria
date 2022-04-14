const mongoose=require('mongoose')
const {appConfig}=require('../config')

const Schema=mongoose.Schema

const CitasSchema=Schema({
	nombre_p: String,
	apellido_p: String,
	rut: String,
	fecha_cita: Date,
	imgUrl: String,
},{
	timestamps:true
})
CitasSchema.methods.setImgUrl= function setImgUrl (filename){
	const {host,port} = appConfig
	this.imgUrl =`${host}:${port}/public/${filename}`
}
module.exports=mongoose.model('citas',CitasSchema)
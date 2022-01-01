const mongoose =require('mongoose')

mongoose.connection.on('open',()=>console.log("DB connected"))

async function connectionDB({host, port, dbName}){
	const uri= `mongodb://${host}:${port}/${dbName}`
	await mongoose.connect(uri,{useNewUrlParser:true})
}

module.exports =connectionDB
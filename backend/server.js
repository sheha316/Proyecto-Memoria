require('dotenv').config()

const app = require('./app')
const {appConfig,dbConfig}= require('./config')
const connectionDB = require('./db/mongodb')

async function initApp(appConfig,dbConfig){
	try{
		await connectionDB(dbConfig)
		app.listen(appConfig.port,()=> console.log("corriendo yay",appConfig.port))
	}catch(e){
		console.error(e)
		proccess.exit(0)
	}
}

initApp(appConfig,dbConfig)
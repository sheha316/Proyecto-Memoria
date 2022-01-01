require('dotenv').config()

const express = require('express')
const {appConfig,dbConfig}= require('./config')
const connectionDB = require('./db/mongodb')
const app = express()


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
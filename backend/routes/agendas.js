const express = require('express')
const api = express.Router()

const {getAgendas,getAgenda}=require('../controllers/agendascontroller')

api.get("/getAgendas",getAgendas)
api.get("/getAgenda",getAgenda)

module.exports= api
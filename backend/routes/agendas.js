const express = require('express')
const api = express.Router()

const {getAgendas}=require('../controllers/agendascontroller')

api.get("/getAgendas",getAgendas)

module.exports= api
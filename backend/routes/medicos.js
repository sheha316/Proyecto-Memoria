const express = require('express')
const {getMedicos,getMedicosBySpec}=require('../controllers/medicocontroller')
const api = express.Router()

api.get("/obtenerMedicos",getMedicos)
api.get("/obtenerMedicosBySpec",getMedicosBySpec)
module.exports= api
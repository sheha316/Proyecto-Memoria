const express = require('express')
const {getMedicos,getAllMedicosBySpec}=require('../controllers/medicocontroller')
const api = express.Router()

api.get("/obtenerMedicos",getMedicos)
api.get("/getAllMedicosBySpec",getAllMedicosBySpec)
module.exports= api
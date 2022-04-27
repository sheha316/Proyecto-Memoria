const express = require('express')
const api = express.Router()

const {getMedicos,getAllMedicosBySpec}=require('../controllers/medicocontroller')

api.get("/obtenerMedicos",getMedicos)
api.get("/getAllMedicosBySpec",getAllMedicosBySpec)

module.exports= api
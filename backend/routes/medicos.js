const express = require('express')
const {getMedicos}=require('../controllers/medicocontroller')
const api = express.Router()

api.get("/obtenerMedicos",getMedicos)
module.exports= api
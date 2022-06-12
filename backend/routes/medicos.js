const express = require('express')
const api = express.Router()

const {getMedicos}=require('../controllers/medicocontroller')

api.get("/obtenerMedicos",getMedicos)
module.exports= api
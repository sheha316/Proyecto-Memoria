const express = require('express')
const api = express.Router()

const {getSpecs}=require('../controllers/speccontroller')

api.get("/obtenerSpecs",getSpecs)

module.exports= api
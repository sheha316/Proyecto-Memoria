const express = require('express')
const api = express.Router()

const {postCreateCita}=require('../controllers/citascontroller')

api.post("/postCreateCita",postCreateCita)

module.exports= api
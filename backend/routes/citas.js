const express = require('express')
const api = express.Router()

const {postCreateCita,getMisCitas,sendEmailDeleteCita}=require('../controllers/citascontroller')

api.post("/postCreateCita",postCreateCita)
api.get("/getMisCitas",getMisCitas)
api.post("/sendEmailDeleteCita",sendEmailDeleteCita)

module.exports= api
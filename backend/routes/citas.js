const express = require('express')
const api = express.Router()

const {postCreateCita,getMisCitas}=require('../controllers/citascontroller')

api.post("/postCreateCita",postCreateCita)
api.get("/getMisCitas",getMisCitas)

module.exports= api
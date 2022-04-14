const express = require('express')
const upload = require('../libs/storage')
const {addcita,getcita,deletecita}=require('../controllers/citacontroller')
const api = express.Router()

api.post('/citas',upload.single('image'),addcita)
api.get("/citas",getcita)
api.delete("/citas",deletecita)
module.exports= api
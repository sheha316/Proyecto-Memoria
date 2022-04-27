const express = require('express')
const bodyparser=require('body-parser')
const cors = require('cors')

const medicosroutes= require('./routes/medicos')
const specroutes= require('./routes/spec')
const agendasroutes= require('./routes/agendas')


const app = express()

app.use(cors())

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use('/v1/medicos',medicosroutes)
app.use('/v1/spec',specroutes)
app.use('/v1/agendas',agendasroutes)
module.exports = app
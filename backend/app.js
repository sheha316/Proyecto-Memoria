const express = require('express')
const citasroutes= require('./routes/citas')
const bodyparser=require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use('/public',express.static(__dirname+'/storage/imgs'))
app.use('/v1',citasroutes)
module.exports = app
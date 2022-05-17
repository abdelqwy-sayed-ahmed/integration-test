const express = require('express');
const app = express()

const bodyParser=require('body-parser')

//body-parser

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./startup/routes')(app)
require('./startup/db')()



const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`server started at ${port}`))

module.exports = server;
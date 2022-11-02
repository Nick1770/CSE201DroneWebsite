"use strict"
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swagger.js')
const { sessionConfig } = require('./config/express-session.js')
const { errorHandler } = require('./middleware/errors.js')

const host = process.env.HOST ?? "localhost"
const port = process.env.PORT ?? 8000

let app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())
app.use(session(sessionConfig))

app.use("/auth", require('./routes/auth.js'))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(errorHandler())

app.listen(port, () => {
    console.log(`Listening on: http://${host}:${port}`)
    console.log(`Documentation at: http://${host}:${port}/docs`)
})
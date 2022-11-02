"use strict"
const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API for CSE201',
    version: '1.0.0',
    description: ''
  },
  servers: [
    {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Development'
    }
  ]
}

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec
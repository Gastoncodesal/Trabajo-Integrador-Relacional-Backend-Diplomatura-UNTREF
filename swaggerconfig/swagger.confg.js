const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
definition: {
    openapi: '3.0.0',
    info: {
    title: 'CRUD integrador',
    version: '1.0.0',
    description: 'Documentación generada con Swagger para el CRUD integrador',
    },
    servers: [
    {
        url: 'http://localhost:3000',
    },
    ], 
},
apis: ['./routes/*.js', './models/*.js'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)
  
module.exports = { swaggerDocs, swaggerUi }
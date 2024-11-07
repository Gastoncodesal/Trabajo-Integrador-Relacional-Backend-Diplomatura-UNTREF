const express = require('express')
const sequelize = require('./config/database')
const RTcontenido = require('./routes/contenido.routes')
const RTactores = require('./routes/actores.routes')
const RTid = require('./routes/id.routes')
const RTfiltrar = require('./routes/filtrar.routes')
const bodyParser = require('body-parser')
const { swaggerUi, swaggerDocs } = require('./swaggerconfig/swagger.confg')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('¡Hola mundo!')
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(bodyParser.json())
app.use('', RTcontenido)
app.use('', RTfiltrar)
app.use('', RTactores)
app.use('', RTid)



app.listen(port, async () => {
  await sequelize.authenticate()
  console.log(`server funcionando en http://localhost:${port}`)
  console.log(`Docuentación de la API en http://localhost:${port}/api-docs`)
})
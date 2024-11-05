const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./config/database')
const Actor = require('./models/Actor')
const Contenido = require('./models/Contenido')
const Contenido_actores = require('./models/Contenido_actores')
const Categorias = require('./models/Categorias')
const Generos = require('./models/Generos')


const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hoal mundo !')
})

app.get('/actors', async (req, res) => {
  try {
    const actors = await Actor.findAll()
    res.json(actors)
  } catch (error) {
    res.status(500).send({ error: 'no se pudieron traers los actores' })
  }
})

app.get('/contenido', async (req, res) => {
  try {
    const contenido = await Contenido.findAll()
    res.json(contenido)
  } catch (error) {
    res.status(500).send({ error: 'no se pudieron traers los actores' })
  }
})


app.post('/contenido', async (req, res) => {
  try {

    // eslint-disable-next-line
    const { id_contenido, poster, trailer_url, busqueda, resumen, temporadas, duracion, reparto, genero, calificacion, titulo, categoria } = req.body
    console.log(req.body.categoria)
    //hacer un select del id a la tabla genero que el nombre = body
    //const id_genero = await Generos.findOne({ where: { nombre: genero } }).then(genero => genero.id)

    //hacer un select del id a la tabla categorias que el nombre = body
    const id_categoria = await Categorias.findOne({ where: { nombre_categoria: req.body.categoria } }).then(async categoria => {
      if (categoria) { 
        console.log ("ya existe la categoria")
        return categoria.id_categoria
      } else {
        console.log ("creando contenido")
        //crear la categoria
        //return Categorias.create({ nombre_categoria: categoria })
        const result = await Categorias.create({ nombre_categoria: req.body.categoria })
        return result.dataValues.id_categoria
      }

    })
    const id_genero = await Generos.findOne({ where: { nombre_genero: req.body.genero } }).then(async genero => {
      if (genero) { 
        console.log ("ya existe el genero")
        console.log (genero.id_genero)
        return genero.id_genero
      } else {
        console.log ("creando contenido")
        //crear la categoria
        //return Categorias.create({ nombre_categoria: categoria })
        const result = await Generos.create({ nombre_genero: req.body.genero })
        console.log (result)
        return result.dataValues.id_genero
      }

    })

    // eslint-disable-next-line
    const contenido = await Contenido.create({ id_contenido, poster, trailer_url, busqueda, resumen, temporadas, duracion, reparto, id_genero, calificacion, titulo, id_categoria })
    res.status(201).json(contenido)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'no se pudo crear el contenido' })
  }
})




app.post('/actors', async (req, res) => {
  try {
    // eslint-disable-next-line
    const { nombre, apellido } = req.body
    // eslint-disable-next-line
    const actor = await Actor.create({ nombre, apellido })
    res.status(201).json(actor)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'no se pudo crear el actor' })
  }
})

app.get('/contenido/:id', async (req, res) => {
  try {
    const { id } = req.params
    const contenido = await Contenido.findByPk(id)
    if (!contenido) {
      return res.status(404).send({ error: 'no se encontro el contenido' })
    }
    res.json(contenido)
  } catch (error) {
    res.status(500).send({ error: 'no se pudo obtener el contenido' })
  }
})


//eliminar un contenido por id 
app.delete('/eliminar/:id', async (req, res) => {
  try {
    const { id } = req.params
    const contenido = await Contenido.findByPk(id)
    if (!contenido) {
      return res.status(404).send({ error: 'no se encontro el contenido' })
    }
    await contenido.destroy()
    res.status(204).send("contenido eliminado con exito")
  } catch (error) {
    res.status(500).send({ error: 'no se pudo eliminar el contenido' })
  }
})

app.get('/films', async (req, res) => {
  try {
    const films = await Film.findAll()
    res.json(films)
  } catch (error) {
    res.status(500).send({ error: 'no se pudieron traers los peliculones' })
  }
})

app.post('/films', async (req, res) => {
  try {
    // eslint-disable-next-line
    const { title, description, release_year } = req.body
    // eslint-disable-next-line
    const film = await Film.create({ title, description, release_year })
    res.status(201).json(film)
  } catch (error) {
    res.status(500).send({ error: 'no se pudo crear la peli' })
  }
})

// Relacionar actor con peli
app.post('/actors/:actorId/films/:filmId', async (req, res) => {
  try {
    const { actorId, filmId } = req.params
    const actor = await Actor.findByPk(actorId)
    const film = await Film.findByPk(filmId)

    if (!actor) {
      res.status(404).send({ error: 'no se encontro el actor ' })
    }
    if (!film) {
      res.status(404).send({ error: 'no se encontro  la peli' })
    }
    await film.addActor(actor)
    res.status(201).json({ message: 'Actor y peli asociada correctamente' })
  } catch (error) {
    res.status(500).send({ error: 'no se pudo crear la peli' })
  }
})

app.get('/actors/films', async (req, res) => {
  try {
    const actors = await Actor.findAll(
      {
        include: {
          model: Film
        }
      }
    )
    res.status(201).json(actors)
  } catch (error) {
    res.status(500).send({ error: 'no se pudo crear la peli' })
  }
})

app.get('/films/actors', async (req, res) => {
  try {
    const films = await Film.findAll(
      {
        include: {
          model: Actor
        }
      }
    )
    res.status(201).json(films)
  } catch (error) {
    res.status(500).send({ error: 'no se pudo crear la peli' })
  }
})

app.get('/actors/:actorId/films', async (req, res) => {
  const { actorId } = req.params
  try {
    const actor = await Actor.findByPk(actorId,
      {
        include: {
          model: Film
        }
      }
    )
    res.status(201).json(actor)
  } catch (error) {
    res.status(500).send({ error: 'no se pudo crear la peli' })
  }
})

app.post('/contenido/bulk', async (req, res) => {
  try {
    const contenido = req.body
    // Validar que sea un array, validar la longitud, validar los parametros
    const createdcontenidos = await contenido.bulkCreate(Contenido)
    res.status(201).json(createdcontenidos)
  } catch (error) {
    res.status(500).send({ error: 'no se pudo crear el contenido' })
  }
})

app.listen(port, async () => {
  await sequelize.authenticate()
  console.log(`server funcando en http://localhost:${port}`)
})

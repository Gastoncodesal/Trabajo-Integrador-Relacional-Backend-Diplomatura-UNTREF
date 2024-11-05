const express = require("express");
const router = express.Router();
const Actor = require("../models/actor");


// Ruta para obtener todos los actores
router.get('/actors', async (req, res) => {
    try {
      const actors = await Actor.findAll()
      res.json(actors)
    } catch (error) {
      res.status(500).send({ error: 'No se pudieron traer los actores' })
    }
  })
  

  // Ruta para crear un nuevo actor
router.post('/actors', async (req, res) => {
    try {
      const { nombre, apellido } = req.body
      const actor = await Actor.create({ nombre, apellido })
      res.status(201).json(actor)
    } catch (error) {
      console.error(error)
      res.status(500).send({ error: 'No se pudo crear el actor' })
    }
  })


  module.exports = router;
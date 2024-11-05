const express = require("express");
const router = express.Router();
const Contenido = require("../models/contenido");


//actualizar un contenido
router.put('/actualizar/:id', async (req, res) => {
    try {
      const { id } = req.params
      const contenido = await Contenido.findByPk(id)
      console.log(contenido)
      // Verifica si el contenido existe
      if (!contenido) {
        return res.status(404).send({ error: 'no se encontro el contenido' })
      }
  
      // Actualiza la instancia encontrada con los datos en req.body
      const updatedContenido = await contenido.update(req.body)
      res.json(updatedContenido)
    } catch (error) {
      console.error(error)
      res.status(500).send({ error: 'no se pudo actualizar el contenido' })
    }
  })


  // Ruta para obtener contenido por ID
router.get('/contenido/:id', async (req, res) => {
    try {
      const { id } = req.params
      const contenido = await Contenido.findByPk(id)
      if (!contenido) {
        return res.status(404).send({ error: 'No se encontró el contenido' })
      }
      res.json(contenido)
    } catch (error) {
      res.status(500).send({ error: 'No se pudo obtener el contenido' })
    }
  })

  
  // Ruta para eliminar un contenido por ID
  router.delete('/eliminar/:id', async (req, res) => {
    try {
      const { id } = req.params
      const contenido = await Contenido.findByPk(id)
      if (!contenido) {
        return res.status(404).send({ error: 'No se encontró el contenido' })
      }
      await contenido.destroy()
      res.status(204).send("Contenido eliminado con éxito")
    } catch (error) {
      res.status(500).send({ error: 'No se pudo eliminar el contenido' })
    }
  })

  module.exports = router;
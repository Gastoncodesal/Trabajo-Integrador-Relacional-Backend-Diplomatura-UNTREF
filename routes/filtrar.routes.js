const express = require("express");
const router = express.Router();
const Contenido = require('../models/contenido')
const Categorias = require('../models/Categorias')
const Generos = require('../models/Generos')

// Ruta para buscar contenido por filtros de categoría, género o título
/**
 * @swagger
 * /contenido/buscar/:
 *   get:
 *     summary: Buscar contenido por filtros
 *     description: Endpoint para buscar contenido en la base de datos usando filtros por categoría, género o título.
 *     parameters:
 *       - name: categoria
 *         in: query
 *         required: false
 *         description: Nombre de la categoría para filtrar el contenido.
 *         schema:
 *           type: string
 *           example: "Aventura"
 *       - name: genero
 *         in: query
 *         required: false
 *         description: Nombre del género para filtrar el contenido.
 *         schema:
 *           type: string
 *           example: "Acción"
 *       - name: titulo
 *         in: query
 *         required: false
 *         description: Título del contenido para buscar.
 *         schema:
 *           type: string
 *           example: "Aventuras en la Selva"
 *     responses:
 *       200:
 *         description: Contenido encontrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contenido'  # Referencia al esquema Contenido definido en swagger.config.js
 *       404:
 *         description: No se encontró contenido para el filtro especificado.
 *         content:
 *           application/json:
 *             example:
 *               error: 'No se encontró el contenido'
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: 'No se pudo encontrar por ese filtro'
 */
router.get('/contenido/buscar/', async (req, res) => {
  try {
    const params = req.query
    let contenido 

    // Filtrar por categoría
    if (params.categoria) {
      console.log (params)
      const id_categoria = await Categorias.findOne({ where: { nombre_categoria: params.categoria } }).then(async categoria => {
        return categoria ? categoria.id_categoria : null
      })
      contenido = await Contenido.findOne({ where: { id_categoria: id_categoria } })
      
    // Filtrar por género
    } else if (params.genero) {
      const id_genero = await Generos.findOne({ where: { nombre_genero: params.genero } }).then(async genero => {
        return genero ? genero.id_genero : null
      })
      contenido = await Contenido.findOne({ where: { id_genero: id_genero } })
      
    // Filtrar por título
    } else if(params.titulo) {
      contenido = await Contenido.findOne({ where: { titulo: params.titulo } })
      
    } else {
      return res.status(404).send({ error: 'No se encontró ese filtro' })
    }

    // Verificar si el contenido no existe
    if (!contenido) {
      return res.status(404).send({ error: 'No se encontró el contenido' })
    }
    return res.json(contenido)

  } catch (error) {
    console.error(error)
    return res.status(500).send({ error: 'No se pudo encontrar por ese filtro' })
  }
})



module.exports = router;
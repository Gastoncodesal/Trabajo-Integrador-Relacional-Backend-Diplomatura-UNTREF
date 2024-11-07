const express = require("express");
const router = express.Router();
const Actor = require("../models/actor");


// Ruta para obtener todos los actores
/**
 * @swagger
 * /actors:
 *   get:
 *     summary: Obtener todos los actores
 *     description: Devuelve una lista de todos los actores en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de actores obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Actor'
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No se pudieron traer los actores"
 */

router.get('/actors', async (req, res) => {
  try {
    const actors = await Actor.findAll()
    res.json(actors)
  } catch (error) {
    res.status(500).send({ error: 'No se pudieron traer los actores' })
  }
})


// Ruta para crear un nuevo actor
/**
* @swagger
* /actors:
*   post:
*     summary: Crear un nuevo actor
*     description: Crea un nuevo actor con nombre y apellido en la base de datos.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               nombre:
*                 type: string
*                 description: Nombre del actor.
*                 example: "Lionel"
*               apellido:
*                 type: string
*                 description: Apellido del actor.
*                 example: "Messi"
*     responses:
*       201:
*         description: Actor creado exitosamente.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Actor'
*       500:
*         description: Error en el servidor.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: "No se pudo crear el actor"
*/
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


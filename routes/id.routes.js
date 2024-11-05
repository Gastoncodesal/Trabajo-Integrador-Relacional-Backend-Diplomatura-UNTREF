const express = require("express");
const router = express.Router();
const Contenido = require("../models/contenido");


//actualizar un contenido
/**
 * @swagger
 * /actualizar/{id}:
 *   put:
 *     summary: Actualizar contenido
 *     description: Endpoint para actualizar el contenido existente por su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del contenido a actualizar.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       description: Datos para actualizar el contenido.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contenido'  # Referencia al esquema Contenido definido en swagger.config.js
 *     responses:
 *       200:
 *         description: Contenido actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contenido'  # Referencia al esquema Contenido
 *       404:
 *         description: No se encontró el contenido con el ID proporcionado.
 *         content:
 *           application/json:
 *             example:
 *               error: 'no se encontro el contenido'
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: 'no se pudo actualizar el contenido'
 */
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
/**
* @swagger
* /contenido/{id}:
*   get:
*     summary: Obtener contenido por ID
*     description: Endpoint para obtener un contenido específico por su ID.
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: ID del contenido a obtener.
*         schema:
*           type: integer
*           example: 1
*     responses:
*       200:
*         description: Contenido encontrado exitosamente.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Contenido'  # Referencia al esquema Contenido
*       404:
*         description: No se encontró el contenido con el ID proporcionado.
*         content:
*           application/json:
*             example:
*               error: 'No se encontró el contenido'
*       500:
*         description: Error en el servidor.
*         content:
*           application/json:
*             example:
*               error: 'No se pudo obtener el contenido'
*/
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
/**
* @swagger
* /eliminar/{id}:
*   delete:
*     summary: Eliminar contenido por ID
*     description: Endpoint para eliminar un contenido específico por su ID.
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: ID del contenido a eliminar.
*         schema:
*           type: integer
*           example: 1
*     responses:
*       204:
*         description: Contenido eliminado con éxito.
*       404:
*         description: No se encontró el contenido con el ID proporcionado.
*         content:
*           application/json:
*             example:
*               error: 'No se encontró el contenido'
*       500:
*         description: Error en el servidor.
*         content:
*           application/json:
*             example:
*               error: 'No se pudo eliminar el contenido'
*/
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
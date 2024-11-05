const express = require("express");
const router = express.Router();
const Contenido = require("../models/contenido");
const Contenido_actores = require("../models/Contenido_actores");
const Categorias = require("../models/Categorias");
const Generos = require("../models/Generos");
const Actor = require("../models/actor");

// Ruta para obtener todo el contenido
/**
 * @swagger
 * /contenido:
 *   get:
 *     summary: Obtener todos los contenidos
 *     description: Endpoint para obtener una lista de todos los contenidos en la base de datos.
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve una lista de contenidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contenido'  # Referencia al esquema Contenido definido en swagger.config.js
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: No se pudo traer el contenido
 */
router.get("/contenido", async (req, res) => {
  try {
    const contenido = await Contenido.findAll();
    res.json(contenido);
  } catch (error) {
    res.status(500).send({ error: "No se pudo traer el contenido" });
  }
});


//ruta para crear contenido
/**
 * @swagger
 * /contenido:
 *   post:
 *     summary: Crear nuevo contenido
 *     description: Endpoint para crear nuevo contenido en la base de datos. Se requiere un array de objetos de contenido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id_contenido:
 *                   type: integer
 *                   description: ID único del contenido (se puede omitir al crear nuevo).
 *                   example: 1
 *                 poster:
 *                   type: string
 *                   description: URL del poster del contenido.
 *                   example: "https://example.com/poster.jpg"
 *                 trailer_url:
 *                   type: string
 *                   description: URL del tráiler del contenido.
 *                   example: "https://example.com/trailer.mp4"
 *                 busqueda:
 *                   type: string
 *                   description: Texto para búsqueda del contenido.
 *                   example: "Una historia de aventura"
 *                 resumen:
 *                   type: string
 *                   description: Resumen del contenido.
 *                   example: "Este es un resumen del contenido."
 *                 temporadas:
 *                   type: integer
 *                   description: Número de temporadas del contenido.
 *                   example: 3
 *                 duracion:
 *                   type: string
 *                   description: Duración del contenido en minutos.
 *                   example: "120"
 *                 reparto:
 *                   type: string
 *                   description: Lista de actores del contenido, separados por comas.
 *                   example: "Actor Uno, Actor Dos"
 *                 genero:
 *                   type: string
 *                   description: Género del contenido.
 *                   example: "Acción"
 *                 calificacion:
 *                   type: number
 *                   format: float
 *                   description: Calificación del contenido.
 *                   example: 8.5
 *                 titulo:
 *                   type: string
 *                   description: Título del contenido.
 *                   example: "Aventuras en la Selva"
 *                 categoria:
 *                   type: string
 *                   description: Categoría del contenido.
 *                   example: "Aventura"
 *     responses:
 *       201:
 *         description: Contenido creado exitosamente.
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: no se pudo crear el contenido
 */
router.post("/contenido", async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(500).send("body incorrecto tiene que ser un array");
    }
    await req.body.forEach(async (element) => {
      let {
        id_contenido,
        poster,
        trailer_url,
        busqueda,
        resumen,
        temporadas,
        duracion,
        reparto,
        genero,
        calificacion,
        titulo,
        categoria,
      } = element;

      const id_categoria = await Categorias.findOne({
        where: { nombre_categoria: element.categoria },
      }).then(async (categoria) => {
        if (categoria) {
          return categoria.id_categoria;
        } else {
          const result = await Categorias.create({
            nombre_categoria: element.categoria,
          });
          return result.dataValues.id_categoria;
        }
      });
      const id_genero = await Generos.findOne({
        where: { nombre_genero: element.genero },
      }).then(async (genero) => {
        if (genero) {
          return genero.id_genero;
        } else {
          const result = await Generos.create({
            nombre_genero: element.genero,
          });
          console.log(result);
          return result.dataValues.id_genero;
        }
      });
      if (temporadas == "N/A") {
        temporadas = 0;
      }
      const contenido = await Contenido.create({
        id_contenido,
        poster,
        trailer_url,
        busqueda,
        resumen,
        temporadas,
        duracion,
        id_genero,
        calificacion,
        titulo,
        id_categoria,
      });

      const actores = reparto.split(",");
      actores.forEach(async (actor) => {
        let [nombre, apellido] = actor.trim().split(" ");
        let idActor;
        if (!nombre) {
          nombre = "";
        }
        if (!apellido) {
          apellido = "";
        }
        const actordb = await Actor.findOne({
          where: { nombre: nombre, apellido: apellido },
        });
        if (actordb) {
          idActor = actordb.id_actor;
        } else {
          const result = await Actor.create({
            nombre: nombre,
            apellido: apellido,
          });
          console.log(result);
          idActor = result.dataValues.id_actor;
        }
        await Contenido_actores.create({
          id_actor: idActor,
          id_contenido: contenido.id_contenido,
        });
      });
    });
    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "no se pudo crear el contenido" });
  }
});

module.exports = router;
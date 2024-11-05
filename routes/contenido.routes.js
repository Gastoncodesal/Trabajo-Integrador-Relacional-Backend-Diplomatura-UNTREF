const express = require("express");
const router = express.Router();
const Contenido = require("../models/contenido");
const Contenido_actores = require("../models/Contenido_actores");
const Categorias = require("../models/Categorias");
const Generos = require("../models/Generos");
const Actor = require("../models/actor");

// Ruta para obtener todo el contenido
router.get("/contenido", async (req, res) => {
  try {
    const contenido = await Contenido.findAll();
    res.json(contenido);
  } catch (error) {
    res.status(500).send({ error: "No se pudo traer el contenido" });
  }
});


//ruta para crear contenido
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
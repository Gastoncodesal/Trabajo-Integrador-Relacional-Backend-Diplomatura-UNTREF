Aquí tienes un ejemplo de archivo README para el proyecto basado en el archivo `server.js` que me proporcionaste:

---

# Proyecto CRUD - API de Contenidos

Este proyecto es una API RESTful construida con Node.js y Express que permite gestionar un sistema de contenidos. Está estructurada con Sequelize para el manejo de bases de datos y utiliza Swagger para la documentación de la API.

## Requisitos

- Node.js v14 o superior
- npm v6 o superior
- Base de datos compatible con Sequelize (MySQL, PostgreSQL, etc.)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <URL-del-repositorio>
   cd <nombre-del-proyecto>
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura la base de datos:

   Edita el archivo de configuración de Sequelize (`./config/database.js`) para ajustar los parámetros de conexión de tu base de datos.

4. Inicia el servidor:

   ```bash
   npm start
   ```

   El servidor estará disponible en `http://localhost:3000`.

## Endpoints Principales

- **GET /** - Endpoint de prueba. Responde con "¡Hola mundo!"
- **Documentación de la API:** Disponible en `http://localhost:3000/api-docs`.

### Rutas

Las principales rutas de la API se dividen de la siguiente manera:

- **/contenido** - Rutas para gestionar los contenidos.
- **/actores** - Rutas para manejar actores relacionados con los contenidos.
- **/filtrar** - Rutas para aplicar filtros específicos en la búsqueda de contenidos.
- **/id** - Rutas para acceder a contenido específico mediante un ID.

## Documentación

La documentación de la API está generada con Swagger. Puedes acceder a ella en `http://localhost:3000/api-docs`.

## Dependencias

- **Express** - Framework web para Node.js.
- **Sequelize** - ORM para Node.js, usado para interactuar con la base de datos.
- **Swagger UI** - Herramienta para documentar y visualizar la API.

## Ejecución en Desarrollo

Para ejecutar el proyecto en modo desarrollo y reiniciar el servidor automáticamente al realizar cambios, usa el siguiente comando:

```bash
npm run dev
```

## Contribuciones

1. Haz un fork del proyecto.
2. Crea una nueva rama con tu mejora: `git checkout -b mejora/mi-mejora`.
3. Haz commit de tus cambios: `git commit -m 'Agrega mi mejora'`.
4. Realiza push a la rama: `git push origin mejora/mi-mejora`.
5. Envía un Pull Request.

## Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT.

---

Este README debería ser un buen punto de partida y puede adaptarse en función de los detalles adicionales del proyecto. Si necesitas más secciones o quieres un enfoque diferente, ¡háblame!
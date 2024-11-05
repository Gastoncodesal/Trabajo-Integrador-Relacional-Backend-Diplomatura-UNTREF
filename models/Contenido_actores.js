const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Contenido_actores = sequelize.define('Contenido_actores', {
  activo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_contenido: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_actor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'contenido_actores',
  timestamps: false
})

module.exports = Contenido_actores

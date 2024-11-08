const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Actor = sequelize.define('Actor', {
  id_actor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'actores',
  timestamps: false
})

module.exports = Actor
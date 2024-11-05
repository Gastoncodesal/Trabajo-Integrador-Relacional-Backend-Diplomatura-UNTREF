const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contenido = sequelize.define('Contenido', {
  id_contenido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  poster: {
    type: DataTypes.TEXT,
    
  },
  trailer_url: {
    type: DataTypes.STRING(255),
    defaultValue: '255'
  },
  busqueda: {
    type: DataTypes.TEXT,
    
  },
  resumen: {
    type: DataTypes.TEXT,
    
  },
  temporadas: {
    type: DataTypes.INTEGER,
    
  },
  duracion: {
    type: DataTypes.TEXT,
    
  },
  id_genero: {
    type: DataTypes.INTEGER,
    
  },
  calificacion: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  titulo: {
    type: DataTypes.STRING(255),
    defaultValue: '255'
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    
  }
}, {
  tableName: 'contenido',
  timestamps: false
});

module.exports = Contenido;

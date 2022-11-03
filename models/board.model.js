const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../db/db');

class Board extends Model { }

Board.init({

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type: { 
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING
  },
  rating: {
    type: DataTypes.INTEGER
  }

}, {
  sequelize: db,
  modelName: 'Board'
}
);

module.exports = Board;
const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../db/db');

class Cheese extends Model { }

Cheese.init({

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: { 
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING
  }  

}, {
  sequelize: db,
  modelName: 'Cheese'
}
);

module.exports = Cheese;
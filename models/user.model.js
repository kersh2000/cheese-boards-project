const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../db/db');

class User extends Model { }

User.init({

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: { 
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING
  }  

}, {
  sequelize: db,
  modelName: 'User'
}
);

module.exports = User;
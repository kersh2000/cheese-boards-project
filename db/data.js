const { Board, Cheese, User } = require('../models/index');
const db = require('./db');

class Data {
  
  static content;
  static models = ['Board', 'Cheese', 'User'];
  static objs = [Board, Cheese, User];

  static async new() {
    Data.content = new Array();

    for (let i = 0; i < Data.models.length; i++) {
      const obj = await Data.objs[i].findAll();
      const data = obj.map(x => x.toJSON());
      Data.content.push(data);
    }

    await db.sync({
      force: true
    });

  }

  static async reset() {

    await db.sync({
      force: true
    });

    for (let i = 0; i < Data.models.length; i++) {
      await Data.objs[i].bulkCreate(Data.content[i]);
    }

  }

}

module.exports = Data;
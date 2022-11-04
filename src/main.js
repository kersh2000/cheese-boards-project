const { Board, Cheese, User } = require('../models/index');
const db = require('../db/db');
const { Op } = require('sequelize')

async function main() {

  await db.sync({
    force: true
  });

  const boards = await Board.bulkCreate([
    {
      type: 'Hard cheeses',
      description: `You'll need a knife`,
      rating: 9
    }
  ]);

  const cheeses = await Cheese.bulkCreate([
    {
      title: 'cheese1',
      description: 'Its tasty!!!'
    },
    {
      title: 'cheese2',
      description: 'Its very tasty!!!'
    }
  ]);

  const users = await User.bulkCreate([
    {
      name: 'Homer Simpson',
      email: 'hommer@hotmail.com'
    },
    {
      name: 'Bradley Kershaw',
      email: 'brad@google.com'
    }
  ]);

}

main();
const { Board, Cheese, User } = require('../models/index');
const db = require('./db');
const { Op } = require('sequelize')

async function seed() {

  await db.sync({
    force: true
  });

  const boards = await Board.bulkCreate([
    {
      type: 'Smoked cheeses',
      description: 'Smoked Gouda, Provolone, and Cheddar.',
      rating: 9
    },
    {
      type: 'Soft cheeses',
      description: 'Goat and Feta Cheese.',
      rating: 4
    },
    {
      type: 'Aged cheeses',
      description: 'Gouda, Sharp Cheddar, Gruyere.',
      rating: 6
    }
  ]);

  const cheeses = await Cheese.bulkCreate([
    {
      title: 'Brie',
      description: 'Brie is a soft, white cheese. It comes in a wheel, sometimes in a small wooden box, and is considered a great dessert cheese. '
    },
    {
      title: 'Cheddar',
      description: 'Its flavor can range from creamy to sharp, and its color can run between a natural white to pumpkin orange.'
    },
    {
      title: 'Emmental',
      description: 'When the cheese curds are cooked and pressed together, bubbles form, which leave the holes in the cheese. It is sweet, tangy and melts well.'
    },
    {
      title: 'Gorgonzola',
      description: 'Gorgonzola is one of the worlds oldest types of blue cheese. It has a soft and soft texture, and its taste can range from creamy to sharp.'
    },
    {
      title: 'Mascarpone',
      description: 'Mascarpone is a thick, soft cheese with a very high fat content. Known for its smooth, creamy to buttery texture and flavor, it can be used in sweet and savory dishes.'
    },
    {
      title: 'Parmesan',
      description: 'Parmesan has a hard, gritty texture and tastes fruity and nutty. It can be grated over pastas, used in soups and more.'
    },
    {
      title: 'Provolone',
      description: 'Provolone is an Italian cheese. It is an aged pasta filata (stretched-curd) cheese originating in Campania near Vesuvius, where it is still produced in many shapes.'
    },
    {
      title: 'Smoked Cheddar',
      description: 'Smoked cheddar can be added to omelettes, pizza, soufflés, au gratins, fondues, etc., adding a smoky sharpness with every bite.'
    }
  ]);

  const users = await User.bulkCreate([
    {
      name: 'Joe Frost',
      email: 'joefrost82@hotmail.com'
    },
    {
      name: 'John Smith',
      email: 'jsmith22@bing.com'
    }
  ]);

  //User-Board connections

  const user1 = await User.findByPk(1);
  const boards1 = await Board.findAll({
    where: {
      [Op.or]: [
        { type: 'Smoked cheeses' },
        { type: 'Aged cheeses' }
      ]
    }
  });
  await user1.addBoards(boards1);

  const user2 = await User.findByPk(2);
  const board2 = await Board.findOne({
    where: { type: 'Soft cheeses' }
  });
  await user2.addBoard(board2);


  //Cheese-Board connections
  const smokyBoard = await Board.findOne({
    where: { type: 'Smoked cheeses' }
  });

  const softBoard = await Board.findOne({
    where: { type: 'Soft cheeses' }
  });

  const agedBoard = await Board.findOne({
    where: { type: 'Aged cheeses' }
  });


  const smokyCheeses = await Cheese.findAll({
    where: {
      [Op.or]: [
        { title: 'Provolone' },
        { title: 'Smoked Cheddar' }
      ]
    }
  });

  const softCheeses = await Cheese.findAll({
    where: {
      [Op.or]: [
        { title: 'Brie' },
        { title: 'Mascarpone' },
        { title: 'Gorgonzola' }
      ]
    }
  });

  const agedCheeses = await Cheese.findAll({
    where: {
      [Op.or]: [
        { title: 'Gorgonzola' },
        { title: 'Provolone' },
        { title: 'Brie' }
      ]
    }
  });

  await smokyBoard.addCheeses(smokyCheeses);
  await softBoard.addCheeses(softCheeses);
  await agedBoard.addCheeses(agedCheeses);

  // await cheeses.find(cheese => cheese.title === 'Provolone').addBoards([smokyBoard, agedBoard]);
  // await cheeses.find(cheese => cheese.title === 'Brie').addBoards([agedBoard, softBoard]);
  // await cheeses.find(cheese => cheese.title === 'Gorgonzola').addBoards([agedBoard, softBoard]);
  // await cheeses.find(cheese => cheese.title === 'Smoked Cheddar').addBoard(smokyBoard);
  // await cheeses.find(cheese => cheese.title === 'Mascarpone').addBoard(softBoard);

}

module.exports = seed;
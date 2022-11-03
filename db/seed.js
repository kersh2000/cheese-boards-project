const { Board, Cheese, User } = require('../models/index');
const db = require('./db');

async function seed() {

  await db.sync({
    force: true
  });

  await Board.bulkCreate([
    {
      type: 'Smoked cheeses',
      description: 'Smoked Gouda, Provolone, and Cheddar.',
      rating: 9
    },
    {
      type: 'Crumbly cheeses',
      description: 'Goat and Feta Cheese.',
      rating: 4
    },
    {
      type: 'Aged cheeses',
      description: 'Gouda, Sharp Cheddar, Gruyere.',
      rating: 6
    }
  ]);

  await Cheese.bulkCreate([
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
      description: 'Gorgonzola is one of the worlds oldest types of blue cheese. It has a crumbly and soft texture, and its taste can range from creamy to sharp.'
    },
    {
      title: 'Mascarpone',
      description: 'Mascarpone is a thick, soft cheese with a very high fat content. Known for its smooth, creamy to buttery texture and flavor, it can be used in sweet and savory dishes.'
    },
    {
      title: 'Parmesan',
      description: 'Parmesan has a hard, gritty texture and tastes fruity and nutty. It can be grated over pastas, used in soups and more.'
    }
  ]);

  await User.bulkCreate([
    {
      name: 'Joe Frost',
      email: 'joefrost82@hotmail.com'
    },
    {
      name: 'John Smith',
      email: 'jsmith22@bing.com'
    }
  ]);

}

seed();
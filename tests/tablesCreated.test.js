const { Board, Cheese, User } = require('../models/index');
const db = require('../db/db');

describe('Can create multiple rows within the Board model/table', () => {

  beforeAll(async () => {
    await db.sync({
      force: true
    });
    await Board.create({
      type: 'Blue cheese',
      description: 'Choose from a wide variety of strong creamy blue cheeses!',
      rating: 7
    });
  });

  test('Can successfully create a single row within board', async () => {
    const numOfRows = await Board.count();
    expect(numOfRows).toBe(1);
  });

  test('Name is successfully created within each row', async () => {
    const board = await Board.findOne();
    expect(board.type).toBe('Blue cheese');
  });

  test('Description is successfully created within each row', async () => {
    const board = await Board.findOne();
    expect(board.description).toBe('Choose from a wide variety of strong creamy blue cheeses!');
  });

  test('Rating is successfully created within each row', async () => {
    const board = await Board.findOne();
    expect(board.rating).toBe(7);
  });

  test('Can create multiple rows within board', async () => {
    await Board.bulkCreate([
      {
        type: 'Soft cheeses',
        description: 'Brie, burrata, stracchino, and mascarpone are all great spreadable cheeses.',
        rating: 10
      },
      {
        type: 'Cheese dips',
        description: 'You can also include a dip made from asadero cheese or another fresh cheese that melts well.',
        rating: 8
      }
    ]);
    const boards = await Board.findAll();
    expect(boards[1].type).toBe('Soft cheeses');
    expect(boards[1].description).toBe('Brie, burrata, stracchino, and mascarpone are all great spreadable cheeses.');
    expect(boards[1].rating).toBe(10);
    expect(boards[2].type).toBe('Cheese dips');
    expect(boards[2].description).toBe('You can also include a dip made from asadero cheese or another fresh cheese that melts well.');
    expect(boards[2].rating).toBe(8);
  });
});

describe('Can create multiple rows within the Cheese model/table', () => {

  beforeAll(async () => {
    await db.sync({
      force: true
    });
    await Cheese.create({
      title: 'Camembert',
      description: 'Rich, buttery, and spreadable, Camembert has a mild, mushroomy aroma.'
    });
  });

  test('Can successfully create a single row within Cheese', async () => {
    const numOfRows = await Cheese.count();
    expect(numOfRows).toBe(1);
  });

  test('Title is successfully created within each row', async () => {
    const cheese = await Cheese.findOne();
    expect(cheese.title).toBe('Camembert');
  });

  test('Description is successfully created within each row', async () => {
    const cheese = await Cheese.findOne();
    expect(cheese.description).toBe('Rich, buttery, and spreadable, Camembert has a mild, mushroomy aroma.');
  });

  test('Can create multiple rows within Cheese', async () => {
    await Cheese.bulkCreate([
      {
        title: 'Cotija',
        description: 'As the cheese ages, it acquires nuttier, tangier flavors and a drier, coarser texture.'
      },
      {
        title: 'Feta',
        description: 'Tangy and moist, feta can range from completely crumbly to moderately creamy and pairs well with fresh summer fruit.'
      },
      {
        title: 'Mozzarella',
        description: 'Fresh and dairy-rich, mozzarella is prized for its texture and mild creamy flavor.'
      }
    ]);
    const cheeses = await Cheese.findAll();
    expect(cheeses[1].title).toBe('Cotija');
    expect(cheeses[1].description).toBe('As the cheese ages, it acquires nuttier, tangier flavors and a drier, coarser texture.');
    expect(cheeses[2].title).toBe('Feta');
    expect(cheeses[2].description).toBe('Tangy and moist, feta can range from completely crumbly to moderately creamy and pairs well with fresh summer fruit.');
    expect(cheeses[3].title).toBe('Mozzarella');
    expect(cheeses[3].description).toBe('Fresh and dairy-rich, mozzarella is prized for its texture and mild creamy flavor.');
  });
});

describe('Can create multiple rows within the User model/table', () => {

  beforeAll(async () => {
    await db.sync({
      force: true
    });
    await User.create({
      name: 'Sam Smith',
      email: 'password123@yahoo.co.uk'
    });
  });

  test('Can successfully create a single row within User', async () => {
    const numOfRows = await User.count();
    expect(numOfRows).toBe(1);
  });

  test('Name is successfully created within each row', async () => {
    const user = await User.findOne();
    expect(user.name).toBe('Sam Smith');
  });

  test('Email is successfully created within each row', async () => {
    const user = await User.findOne();
    expect(user.email).toBe('password123@yahoo.co.uk');
  });

  test('Can create multiple rows within User', async () => {
    await User.bulkCreate([
      {
        name: 'Joe Biden',
        email: 'joebiden7@hotmail.com'
      },
      {
        name: 'Sam White',
        email: 'samwhite1998@gmail.com'
      },
      {
        name: 'Anna Lily',
        email: 'lillyagamer@outlook.com'
      }
    ]);
    const users = await User.findAll();
    expect(users[1].name).toBe('Joe Biden');
    expect(users[1].email).toBe('joebiden7@hotmail.com');
    expect(users[2].name).toBe('Sam White');
    expect(users[2].email).toBe('samwhite1998@gmail.com');
    expect(users[3].name).toBe('Anna Lily');
    expect(users[3].email).toBe('lillyagamer@outlook.com');
  });
});
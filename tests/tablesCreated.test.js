const { Board, Cheese, User } = require('../models/index');
const db = require('../db/db');

describe('Can create multiple rows within the User model/table', () => {

  beforeEach(async () => {
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
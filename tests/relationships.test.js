const { Board, Cheese, User } = require('../models/index');
const db = require('../db/db');
const seed = require('../db/seed');
const Data = require('../db/data');

beforeAll(async () => {
  await Data.new();
  await seed();
});

afterAll(async () => {
  await Data.reset();
});

describe(`Testing 'One User to Many Board' relationship from 'seed' file.`, () => {

  test(`Boards contain correct foreign key (1) from user 'Joe Frost'.`, async () => {
    const user = await User.findOne({where: {name: 'Joe Frost'}});
    const boards = await user.getBoards();
    for( let board of boards) {
      expect(board.UserId).toBe(1);
    }
  });
  test(`User 'Joe Frost' contains 2 boards.`, async () => {
    const user = await User.findOne({where: {name: 'Joe Frost'}});
    const numOfBoards = await user.countBoards();
    expect(numOfBoards).toBe(2);
  });
  test(`User 'John Smith' contains 1 board.`, async () => {
    const user = await User.findOne({where: {name: 'John Smith'}});
    const numOfBoards = await user.countBoards();
    expect(numOfBoards).toBe(1);
  })
})

describe(`Testing 'Many Cheeses to Many Boards' relationship form seed file.`, () => {
  
  test('', async () => {

  })

});
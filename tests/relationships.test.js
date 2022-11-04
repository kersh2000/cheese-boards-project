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

describe(`Testing 'Many Cheeses to Many Boards' relationship from seed file.`, () => {
  
  test(`Board 'Smoked cheeses' contains 2 cheeses`, async () => {
    const board = await Board.findOne({where: {type: 'Smoked cheeses'}});
    const numOfCheeses = await board.countCheeses();
    expect(numOfCheeses).toBe(2);
  });

  test(`'Smoked cheeses' board contains 'Smoked Cheddar' and 'Provolone' cheeses`, async () => {
    const board = await Board.findAll({
      include: {
        model: Cheese
      },
      where: {
        type: 'Smoked cheeses'
      }
    });
    const cheeses = new Array();
    for (let element of board[0].Cheeses) {
      cheeses.push(element.title);
    }
    expect(cheeses.includes("Provolone")).toBeTruthy();
    expect(cheeses.includes("Smoked Cheddar")).toBeTruthy();
  });

  test(`Board 'Soft cheeses' contains 3 cheeses`, async () => {
    const board = await Board.findOne({where: {type: 'Soft cheeses'}});
    const numOfCheeses = await board.countCheeses();
    expect(numOfCheeses).toBe(3);
  });

  test(`'Soft cheeses' board contains 'Brie', 'Mascarpone', and 'Gorgonzola' cheeses`, async () => {
    const board = await Board.findAll({
      include: {
        model: Cheese
      },
      where: {
        type: 'Soft cheeses'
      }
    });
    const cheeses = new Array();
    for (let element of board[0].Cheeses) {
      cheeses.push(element.title);
    }
    expect(cheeses.includes("Brie")).toBeTruthy();
    expect(cheeses.includes("Mascarpone")).toBeTruthy();
    expect(cheeses.includes("Gorgonzola")).toBeTruthy();
  });

  // test(`Board 'Aged cheeses' contains 3 cheeses`, async () => {
  //   const board = await Board.findOne({where: {type: 'Soft cheeses'}});
  //   const numOfCheeses = await board.countCheeses();
  //   expect(numOfCheeses).toBe(3);
  // });

  // test(`'Aged cheeses' board contains 'Gorgonzola', 'Provolone', and 'Brie' cheeses`, async () => {
  //   const board = await Board.findAll({
  //     include: {
  //       model: Cheese
  //     },
  //     where: {
  //       type: 'Aged cheeses'
  //     }
  //   });
  //   const cheeses = new Array();
  //   for (let element of board[0].Cheeses) {
  //     cheeses.push(element.title);
  //   }
  //   expect(cheeses.includes("Gorgonzola")).toBeTruthy();
  //   expect(cheeses.includes("Provolone")).toBeTruthy();
  //   expect(cheeses.includes("Brie")).toBeTruthy();
  // });

  test(`'Brie' cheese contains 2 boards`, async () => {
    const cheese = await Cheese.findOne({where: {title: 'Brie'}});
    const numOfBoards = await cheese.countBoards();
    expect(numOfBoards).toBe(2);
  });

  test(`'Brie' cheese contains both 'Soft' and 'Aged' boards`, async () => {
    const cheese = await Cheese.findAll({
      include: {
        model: Board
      },
      where: {
        title: 'Brie'
      }
    });
    const boards = new Array();
    for (let element of cheese[0].Boards) {
      boards.push(element.type);
    }
    expect(boards.includes('Soft cheeses')).toBeTruthy();
    expect(boards.includes('Aged cheeses')).toBeTruthy();
  });

  test(`'Provolone' cheese contains 2 boards`, async () => {
    const cheese = await Cheese.findOne({where: {title: 'Provolone'}});
    const numOfBoards = await cheese.countBoards();
    expect(numOfBoards).toBe(2);
  });

  test(`'Provolone' cheese contains both 'Smoked' and 'Aged' boards`, async () => {
    const cheese = await Cheese.findAll({
      include: {
        model: Board
      },
      where: {
        title: 'Provolone'
      }
    });
    const boards = new Array();
    for (let element of cheese[0].Boards) {
      boards.push(element.type);
    }
    expect(boards.includes('Smoked cheeses')).toBeTruthy();
    expect(boards.includes('Aged cheeses')).toBeTruthy();
  });

});
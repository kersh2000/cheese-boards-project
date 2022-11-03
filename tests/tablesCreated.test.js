const { Board, Cheese, User } = require('../models/index');
const { db, seed } = require('../db/db');

beforeAll(() => seed());

description('Can create tables and rows from all Models.', () => {
  test('Can create rows within the Board Model', async () => {

  });
});
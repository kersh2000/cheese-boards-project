const { Board, Cheese, User } = require('../models/index');
const db = require('../db/db');

async function main() {
  await db.sync({
    force: true
  });
}

main();
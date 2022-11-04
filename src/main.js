const seed = require('../db/seed');

async function main() {
  await seed();
}

main();
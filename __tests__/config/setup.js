'use strict';

const { db } = require('../../src/auth/models');

module.exports = async () => {
  await db.sync();
  console.log('\n    <----- The Test DB is ready! ----->');
};


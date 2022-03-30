'use strict';

const { db } = require('../../src/auth/models');

module.exports = async () => await db.drop();

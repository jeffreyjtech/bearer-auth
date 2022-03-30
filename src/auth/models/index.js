'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.js');

let DATABASE_URL = '';
switch (process.env.NODE_ENV) {
case 'test':
  DATABASE_URL = 'sqlite:memory:';
  break;

case 'development':
  DATABASE_URL = 'postgresql://localhost:5432/bearer-auth-development';
  break;

case 'production':
  DATABASE_URL = process.env.DATABASE_URL;
  break;
}

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  },
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

module.exports = {
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
};

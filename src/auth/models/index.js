'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.js');

let DATABASE_URL = '';
let DATABASE_CONFIG = {};
switch (process.env.NODE_ENV) {
case 'test':
  DATABASE_URL = 'sqlite:memory';
  DATABASE_CONFIG = {logging: false};
  console.log('\n<----- SQL commands are not being logged ----->\n');
  break;

case 'development':
  DATABASE_URL = 'postgresql://localhost:5432/bearer-auth-development';
  DATABASE_CONFIG = {logging: true};
  console.log('\n<----- SQL commands are being logged ----->\n');
  break;

case 'production':
  DATABASE_URL = process.env.DATABASE_URL;
  DATABASE_CONFIG = {
    dialectOptions: {
      ssl: true,
      rejectUnauthorized: false,
    },
  };
  console.log('\n<----- SQL commands are being logged ----->\n');
  break;
}


// console.log('DB CONFIG:\n ',DATABASE_CONFIG);
// console.log('DB URL:\n ',DATABASE_URL);

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

// console.log('UserSchema create:\n ', userSchema(sequelize, DataTypes));

module.exports = {
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
};

'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.js');

let DATABASE_URL = '';
let sequelizeConfig = {};
switch (process.env.NODE_ENV) {
case 'test':
  DATABASE_URL = 'sqlite:memory';
  sequelizeConfig = {logging: false};
  console.log('\n<----- SQL commands are not being logged ----->\n');
  break;

case 'development':
  DATABASE_URL = 'postgresql://localhost:5432/bearer-auth-development';
  sequelizeConfig = {logging: true};
  console.log('\n<----- SQL commands are being logged ----->\n');
  break;

case 'production':
  DATABASE_URL = process.env.DATABASE_URL;
  sequelizeConfig = {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }, 
    },
  };
  console.log('\n<----- SQL commands are being logged ----->\n');
  break;
}

const sequelize = new Sequelize(DATABASE_URL, sequelizeConfig);

// console.log('UserSchema create:\n ', userSchema(sequelize, DataTypes));

module.exports = {
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
};

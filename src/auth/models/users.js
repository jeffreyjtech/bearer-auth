'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = (sequelize, DataTypes) => {
  let model = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, process.env.SECRET);
      },
    },
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  // Basic AUTH: Validating strings (username, password) 
  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid User');
    return user;
  };

  // Bearer AUTH: Validating a token
  model.authenticateToken = async function (token) {
    const parsedToken = jwt.verify(token, process.env.SECRET);
    const user = await this.findOne({ where: { username: parsedToken.username }});
    if (!user) throw new Error('User Not Found');
    return user;
  };

  return model;
};

module.exports = userSchema;

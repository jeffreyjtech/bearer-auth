'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = (sequelize, DataTypes) => {
  let model = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        const payload =
          process.env.TOKEN_SINGLE_USE === 'true'
            ? { username: this.username, jti: crypto.randomUUID() }
            : { username: this.username };
        return jwt.sign(payload, process.env.SECRET);
      },
    },
    usedTokenUUIDs: {
      type: DataTypes.STRING,
      defaultValue: ' ',
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
    let verifyOptions = {};
    if (process.env.TOKEN_EXPIRATION === 'true') {
      let tokenAge = process.env.NODE_ENV === 'test' ? 2 : 60 * 10;
      verifyOptions.maxAge = tokenAge;
    }
    const parsedToken = jwt.verify(token, process.env.SECRET, verifyOptions);
    const user = await this.findOne({
      where: { username: parsedToken.username },
    });
    if (!user) throw new Error('User Not Found');

    if (process.env.TOKEN_SINGLE_USE === 'true') {
      if (user.usedTokenUUIDs.includes(parsedToken.jti)) {
        throw new Error('Single-Use Token Already Used');
      } else {
        await this.update(
          { usedTokenUUIDs: `${user.usedTokenUUIDs} ${parsedToken.jti}` },
          { where: { username: parsedToken.username } },
        );
      }
    }

    return user;
  };

  return model;
};

module.exports = userSchema;

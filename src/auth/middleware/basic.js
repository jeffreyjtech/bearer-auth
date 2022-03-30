'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  // if (!req.headers.authorization) { return _authError(); }
  try {

    let basic = req.headers.authorization;
    let authString = basic.split(' ')[1];
    let [username, password] = base64.decode(authString).split(':'); 
    //  IF BASE 64 CANNOT DECODE
    //  IT WILL ERROR ON THE REQUIRE STATEMENT FOR SOME REASON
    //  USE A TRY CATCH
    //  Don't trust your dependencies

    req.user = await users.authenticateBasic(username, password);

    // if (!req.user) throw new Error;

    next();
  } catch (e) {
    console.error(e);
    res.status(403).send(`Invalid Login : ${e.message || ''}`);
  }
};


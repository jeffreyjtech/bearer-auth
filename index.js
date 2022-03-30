'use strict';

// Start up DB Server
const { db } = require('./src/auth/models/index.js');
const { startup } = require('./src/server.js');
db.sync()
  .then(() => {

    // Start the web server
    startup(process.env.PORT || 3000);
  });


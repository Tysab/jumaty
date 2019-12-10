const config = require('config');
const express = require('express');
const app = express();

/**
 * TODO: ENVIRONMENT VARIABLES
 * * MongoDB key (Check vidly > config + JWT) - heroku config:set jumaty_db=(key)
 * TODO: MIDDLEWARE
 * * Winston
 * * Config
 * TODO: REFACTOR
 * * Routes
 * TODO: AUTHENTICATION
 * * Tokens
 */

const testing = app.get('env');

 console.log(testing);

 require('./startup/config')();
 require('./startup/routes')(app);
 require('./startup/db')();
 require('./startup/prod')(app);

const port = process.env.PORT || 3000;

//  Sets port number for the server
app.listen(port, () => {console.log(`Listening on port ${port}`)});
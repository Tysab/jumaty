const express = require('express');
const app = express();

/**
 * TODO: MIDDLEWARE
 * * Winston (logs)
 * ? TODO: REFACTOR
 * TODO: AUTHENTICATION
 * * Tokens
 */

 require('./startup/config')();
 require('./startup/routes')(app);
 require('./startup/db')();
 require('./startup/prod')(app);

const port = process.env.PORT || 3000;

//  Sets port number for the server
app.listen(port, () => {console.log(`Listening on port ${port}`)});
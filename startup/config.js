//  Loading modules
require('dotenv').config();
const config = require('config');

module.exports = function () {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    } else {
        console.log(`PRIVATE KEY IS: ${config.get('jwtPrivateKey')}`);
    }
};
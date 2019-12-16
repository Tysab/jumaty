//  Loading modules
require('dotenv').config();
const config = require('config');
const env = process.env.NODE_ENV;
let conf;

if(env == "development")
{
 conf = config.get('jwtPrivateKey');
} else if(env == 'production'){
    conf = process.env.jwtPrivateKey;
}

module.exports = function () {
    if (!conf) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }
};
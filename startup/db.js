const mongoose = require('mongoose');
const config = require('config');
const env = process.env.NODE_ENV;
let conf;

if(env == "development")
{
 conf = config.get('bani_db');
} else if(env == 'production'){
    conf = process.env.bani_db;
}

module.exports = function () {

        mongoose.connect(conf, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                })
                .then((e) => console.log('Connected to MongoDB...'))
                .catch(err => console.error('Could not connect to MongoDB...', err));

}
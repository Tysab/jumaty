const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {

        const db = config.get(config.get('jwtPrivateKey'));

        mongoose.connect(db, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                })
                .then((e) => console.log('Connected to MongoDB...'))
                .catch(err => console.error('Could not connect to MongoDB...', err));

}
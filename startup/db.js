const mongoose = require('mongoose');

module.exports = function(db){

     mongoose.connect(db)
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...', err));

}
//require('dotenv').config();
const express = require('express');
const app = express();
//const mongoose = require('mongoose');
//const { keys } = require('./keys');

// Calling routes
//const home = require('./routes/home');
const login = require('./routes/login');
const register = require('./routes/register');
//const profile = require('./routes/profile');

const port = process.env.PORT || 3000;


// mongoose.connect(keys.mongodb)
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

//  Setting routes
//app.use('/', home);                         // sets / path to home.js router
app.use('/login', login);                   // sets /login path to login.js router
app.use('/register', register);             // sets /register path to register.js router
//app.use('/profile', profile);             // sets /profile path to profile.js router

app.set('view engine', 'ejs');

app.listen(port, () => {console.log(`Listening on port ${port}`)});
const express = require('express');
const app = express();
const path = require('path');


module.exports = function(app) {
// Calling routes
const home = require('../routes/home');
const login = require('../routes/login');
const register = require('../routes/register');
const timeline = require('../routes/timeline');
const profile = require('../routes/profile');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.use('/profile', express.static(path.join(__dirname, 'public')))

//  Setting routes
app.use('/', home);                                     // sets / path to home.js router
app.use('/login', login);                               // sets /login path to login.js router
app.use('/register', register);                         // sets /register path to register.js router
app.use('/timeline', timeline);                         // sets /timeline path to timeline.js router
app.use('/profile', profile);                           // sets /profile path to profile.js router

//  Error handling for 404 pages
app.get('*', (res, req, next) => {
    throw new Error('page not found');
});

app.use((error, req, res, next) => {
    res.send(`${error.message} <button onclick='window.history.back()'>Go Back</button>`);
});

//  Connects Express to EJS for templating engines
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

}
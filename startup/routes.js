const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Calling routes
const home = require('../routes/home');
const login = require('../routes/login');
const logout = require('../routes/logout');
const register = require('../routes/register');
const timeline = require('../routes/timeline');
const profile = require('../routes/profile');

module.exports = function (app) {

    //  Connects Express to EJS for templating engines
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(cookieParser());
    app.use(express.static('public'));
    app.use('/profile', express.static(path.join(__dirname, '../public')));

    //  Save for global variables
    // app.use(function (req, res, next) {
    //     res.locals.testing = "TEST MESSAGEEEEEEEEEEEE";
    //     next();
    // });

    //  Setting routes
    app.use('/', home); // sets / path to home.js router
    app.use('/login', login); // sets /login path to login.js router
    app.use('/logout', logout); // sets /logout path to logout.js router
    app.use('/register', register); // sets /register path to register.js router
    app.use('/timeline', timeline); // sets /timeline path to timeline.js router
    app.use('/profile', profile); // sets /profile path to profile.js router

    //  Error handling middleware for 404 pages
    app.get('*', (res, req, next) => {
        throw new Error('page not found');
    });

    //  404 redirect
    app.use((error, req, res, next) => {
        res.send(`${error.message} <button onclick='window.history.back()'>Go Back</button>`);
    });

}
//  Root path is /login

const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const {
    User,
    createDummyUser,
    showUser
} = require('../models/userModel');

//  img path ../public/img/logo.png



router.get('/', async (req, res) => {
    console.log('Connected to /login');

    res.render('login');
});

router.post('/', async (req, res) => {

    let readImageBuffer = fs.readFileSync(__dirname + '/../public/img/logo.png');

    //createDummyUser('Tyler', 'Broere', 'tyler@mail.com', '123456', readImageBuffer, 'image/png');
    showUser('5e02310d8b617356a02b6df2');

    console.log('showing user function');


});

module.exports = router;
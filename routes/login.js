//  Root path is /login

const express = require('express');
const router = express.Router();
const {User, createDummyUser, showUser} = require('../models/userModel');

router.get('/', async (req, res) => {
    console.log('Connected to /login');
    res.render('login');
});

router.post('/', async (req, res) => {
    //createDummyUser('Tyler', 'Broere', 'tyler@mail.com', '123456');
    showUser('5e01d78f8acef012a417c2a5');
});

module.exports = router;
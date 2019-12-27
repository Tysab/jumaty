//  Root path is /login

const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const {
    User,
    createDummyUser
} = require('../models/userModel');


router.get('/', async (req, res) => {
    console.log('Connected to /login');

    res.render('login');
});

router.post('/', async (req, res) => {

  
});

module.exports = router;
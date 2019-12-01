//  Root path is /register

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('Connected to /register');
    res.render('register');
});

router.post('/', async (req, res) => {

});

module.exports = router;
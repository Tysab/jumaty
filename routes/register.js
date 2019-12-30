//  Root path is /register
const {
    create
} = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('Connected to /register');
    res.render('register');
});

//  Uses controller to create a new user
router.post('/', create);

module.exports = router;
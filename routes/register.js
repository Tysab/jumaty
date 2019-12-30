//  Root path is /register
const {
    show_avatar,
    set_avatar,
    create
} = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('Connected to /register');
    res.render('register');
});

router.post('/', create);

module.exports = router;
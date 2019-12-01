//  Root path is /

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('Connected to /');
    res.send('<a href="/login">Login</a><br><br><br> <a href="/register">Register</a><br><br><br> <a href="/timeline">Timeline</a>');
});

router.post('/', async (req, res) => {

});

module.exports = router;
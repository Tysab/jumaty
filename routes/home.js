//  Root path is /

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('Connected to /');
    res.render('home');
});

router.post('/', async (req, res) => {

});

module.exports = router;
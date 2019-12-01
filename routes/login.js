//  Root path is /login

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {

});

module.exports = router;
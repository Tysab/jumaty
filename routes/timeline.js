//  Root path is /timeline

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('Connected to /timeline');
    res.render('index');
});

router.post('/', async (req, res) => {

});

module.exports = router;
//  Root path is /timeline

const page = require('../json/routes.json').page.profile;
const express = require('express');
const router = express.Router();
//const file_name = __filename.slice(__dirname.length + 1, -3);


router.get('/', async (req, res) => {
    console.log('Connected to /profile');

    res.render('index', page);
});

router.post('/', async (req, res) => {

});

module.exports = router;
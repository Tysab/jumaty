//  Root path is /profile

const binary_image = require('../middleware/binaryImage');
const page = require('../json/routes.json').page.profile;
const settings = page.settings;         //  Add settings.data for data implementation in .ejs files
const express = require('express');
const router = express.Router();
//const file_name = __filename.slice(__dirname.length + 1, -3);

router.get('/', async (req, res) => {
    console.log('Connected to /profile');

    res.render('index', page);
});

//  User profile settings
router.get('/settings', async (req, res) => {
    console.log('Connected to /profile/settings');
    console.log(settings);
    settings.data = "sample text";

    res.render("index", settings);
});

router.post('/', async (req, res) => {
    //  User following function
});

router.post('/settings', async (req, res) => {
    //  Users settings updates
    console.log('Connected to [POST] /profile/settings');

    res.render("index", settings);
});

module.exports = router;
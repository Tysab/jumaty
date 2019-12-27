//  Root path is /profile

const { get_user_avatar } = require('../functions/binaryImage');
const page = require('../json/routes.json').page.profile;
const settings = page.settings; //  Add settings.data for data implementation in .ejs files
const express = require('express');
const router = express.Router();
//const file_name = __filename.slice(__dirname.length + 1, -3);

router.get('/', async (req, res) => {
    console.log('Connected to /profile');

    let gen_image = await get_user_avatar();
    page.data = gen_image;
    console.log(page.data);
    
    res.render('index', page);
    page.data = "";
});

//  User profile settings
router.get('/settings', async (req, res) => {
    console.log('Connected to /profile/settings');
    console.log(settings);


    res.render("index", settings);
});

router.post('/', async (req, res) => {
    //  User following function
});

router.post('/settings', async (req, res) => {
    //  Users settings updates
    console.log('Connected to [POST] /profile/settings');
    let gen_image = await get_user_avatar();


    settings.data = gen_image;

    //console.log(settings);

    res.render("index", settings);

    //  Clears image-data cache
    settings.data = "";
});

module.exports = router;
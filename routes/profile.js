//  Root path is /profile

const {
    get_user_avatar,
    get_uploaded_user_avatar
} = require('../functions/binaryImage');
const page = require('../json/routes.json').page.profile;
const settings = page.settings; //  Add settings.data for data implementation in .ejs files
const express = require('express');
const multer = require('multer');
const upload = multer({
    dest: "binaryImages/"
});
const router = express.Router();
//const file_name = __filename.slice(__dirname.length + 1, -3);

router.get('/', async (req, res) => {
    console.log('Connected to /profile');

    let gen_image = await get_user_avatar();
    page.data = gen_image;

    res.render('index', page);
    //  Clears image-data cache
    page.data = "";
});

router.post('/', async (req, res) => {
    //  User following function
});


//  User profile settings
router.get('/settings', async (req, res) => {
    console.log('Connected to /profile/settings');
    console.log(settings);

    let gen_image = await get_user_avatar('5e02310d8b617356a02b6df2');
    settings.data = gen_image;

    res.render("index", settings);
    settings.data = "";


});


router.post('/settings', upload.single('user_avatar'), async (req, res, next) => {
    //  Users settings updates
    console.log('Connected to [POST] /profile/settings');

    let custom_file = {
        contentType: req.file.mimetype,
        file_name: req.file.filename
    };

    if (!req.file) {
        res.send("no file found");
    } else {



        //  Insert validation before passing parameter to function

        await get_uploaded_user_avatar("5e02310d8b617356a02b6df2", custom_file);

        //console.log(req.file);

        res.send('file uploaded');

    }


});

module.exports = router;
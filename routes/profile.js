//  Root path is /profile

const {
    show_avatar,
    set_avatar,
    show_auth_user
} = require('../controllers/userController');
const page = require('../json/routes.json').page.profile;
const settings = page.settings; //  Add settings.data for data implementation in .ejs files
const express = require('express');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({
    dest: "binaryImages/"
});
const router = express.Router();
//const file_name = __filename.slice(__dirname.length + 1, -3);

router.get('/', auth, async (req, res) => {
    console.log('Connected to /profile');

    let user = await show_auth_user(req.userData.userId);

    console.log(user);

    let gen_image = await show_avatar(user._id);
    page.data = gen_image;

    res.render('index', page);
    //  Clears image-data cache
    page.data = "";
});

router.post('/', async (req, res) => {
    //  User following function
});


//  User profile settings
router.get('/settings', auth, async (req, res, next) => {
    console.log('Connected to /profile/settings');

    let user = await show_auth_user(req.userData.userId);

    console.log(user);

    let gen_image = await show_avatar(user._id);
    settings.data = gen_image;

    res.render('index', settings);
    //  Clears image-data cache
    settings.data = "";


});


router.post('/settings', upload.single('user_avatar'), async (req, res, next) => {
    //  Users settings updates
    console.log('Connected to [POST] /profile/settings');

    if (!req.file) {
        res.send("no file found");
    } else {

        let custom_file = {
            contentType: req.file.mimetype,
            file_name: req.file.filename
        };

        //  Insert validation before passing parameter to function

        await set_avatar("5e09ce953e67d75bac39c2ae", custom_file);

        res.render("index", settings);

    }


});

module.exports = router;
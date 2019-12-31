//  Root path is /profile

const {
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

let local_message;

router.use(function (req, res, next) {
    res.locals.message = local_message;
    next();
});
router.get('/', auth, async (req, res) => {
    console.log('Connected to /profile');

    let user = await show_auth_user(req.userData.userId);
    page.data.user = user;
    res.render('index', page);
});

router.post('/', async (req, res) => {
    //  User following function
});


//  User profile settings
router.get('/settings', auth, async (req, res, next) => {
    console.log('Connected to /profile/settings');

    
    let user = await show_auth_user(req.userData.userId);
    settings.data.user = user;
    console.log("LCOALS/////////////");
    console.log(local_message);
    console.log(res.locals.testing);
    res.render('index', settings);
});


router.post('/settings/:form', auth, upload.single('user_avatar'), async (req, res, next) => {
    //  Users settings updates
    console.log('Connected to [POST] /profile/settings');

    if (req.params.form == "avatar") {
        console.log('AVATAR LOGGED');
    }

    if (!req.file) {
        console.log('No file found');
        local_message = "No file found";
        res.redirect('/profile/settings');
    } else {

        let custom_file = {
            contentType: req.file.mimetype,
            file_name: req.file.filename
        };

        //  Insert validation before passing parameter to function

        await set_avatar(req.userData.userId, custom_file);

        res.redirect('/profile/settings');
    }

});

router.post('/settings/bio', auth, async (req, res, next) => {

});

//bio
//userinfo
//password

module.exports = router;
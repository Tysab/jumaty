//  Root path is /profile

const {
    set_avatar,
    show_auth_user,
    update
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

router.get('/show/:user_id', auth, async (req, res) => {
    console.log('Connected to /profile/:user_id');

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
    res.render('index', settings);
    local_message = undefined;
});


router.post('/settings/:form', auth, upload.single('user_avatar'), async (req, res, next) => {
    //  Users settings updates
    console.log('Connected to [POST] /profile/settings/' + req.params.form);

    let pass_type = `set_${req.params.form}`;

    switch (req.params.form) {

        case 'avatar':
            console.log('AVATAR POST FORM REQUEST');

            if (!req.file) {
                console.log('No file found');
                local_message = "File not found";
                res.redirect('/profile/settings');
            } else {



                let custom_file = {
                    contentType: req.file.mimetype,
                    file_name: req.file.filename
                };

                console.log(custom_file.contentType);

                //  Insert validation before passing parameter to function
                local_message = await set_avatar(req.userData.userId, custom_file);
            }
            break;

        case 'bio':
            console.log('BIO POST FORM REQUEST');
            local_message = await update(req.userData.userId, req.body, pass_type);
            break;

        case 'userinfo':
            console.log('USERINFO POST FORM REQUEST');
            local_message = await update(req.userData.userId, req.body, pass_type);
            break;

        case 'password':
            console.log('PASSWORD POST FORM REQUEST');
            local_message = await update(req.userData.userId, req.body, pass_type);
            break;

        default:
            console.log('ERROR POST FORM REQUEST');
            break;

    }

    res.redirect('/profile/settings');

});

module.exports = router;
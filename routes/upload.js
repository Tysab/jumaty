//  Root path is /upload
const {
    show_auth_user
} = require('../controllers/userController');
const {
    create
} = require('../controllers/uploadsController');
const page = require('../json/routes.json').page.upload;
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
    console.log('Connected to /upload');

    let user = await show_auth_user(req.userData.userId);
    page.data.user = user;
    res.render('index', page);
    local_message = undefined;

});

router.post('/', auth, upload.single('user_upload'), async (req, res, next) => {
    //  Users settings updates
    console.log('Connected to [POST] /upload');

    console.log(req.body);

    throw new Error('TEST END');


    if (!req.file) {
        console.log('No file found');
        local_message = "File not found";
        res.redirect('/upload');
    } else {
        let custom_file = {
            contentType: req.file.mimetype,
            file_name: req.file.filename
        };
        console.log(custom_file.contentType);
        //  Insert validation before passing parameter to function
        local_message = await create(req.userData.userId, custom_file);
    }

    res.redirect('/profile');

});

router.post('/settings/bio', auth, async (req, res, next) => {

});

//bio
//userinfo
//password

module.exports = router;
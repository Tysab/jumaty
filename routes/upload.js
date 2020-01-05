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
const auth_middle = [auth, show_auth_user];


router.get('/', auth_middle, async (req, res) => {
    console.log('Connected to /upload');

    res.render('index', page);
});

router.post('/', auth_middle, upload.single('user_upload'), create);

router.post('/settings/bio', auth, async (req, res, next) => {

});

//bio
//userinfo
//password

module.exports = router;
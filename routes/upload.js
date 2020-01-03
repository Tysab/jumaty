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


router.get('/', auth, async (req, res) => {
    console.log('Connected to /upload');

    let user = await show_auth_user(req.userData.userId);
    page.data.user = user;
    res.render('index', page);
});

router.post('/', auth, upload.single('user_upload'), create);

router.post('/settings/bio', auth, async (req, res, next) => {

});

//bio
//userinfo
//password

module.exports = router;
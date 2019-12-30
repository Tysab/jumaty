//  Root path is /timeline

const page = require('../json/routes.json').page.timeline;
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const {
    show_avatar,
    show_auth_user
} = require('../controllers/userController');
//const file_name = __filename.slice(__dirname.length + 1, -3);

router.get('/', auth, async (req, res, next) => {
    console.log('Connected to /timeline');

    let user = await show_auth_user(req.userData.userId);

    console.log(user);

    let gen_image = await show_avatar(user._id);
    page.data.user.avatar = gen_image;
    page.data.user.firstName = user.voornaam;

    res.render('index', page);
    //  Clears image-data cache
    page.data = "";
});

router.post('/', async (req, res) => {

});

module.exports = router;
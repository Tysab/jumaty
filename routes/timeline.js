//  Root path is /timeline

const {
    show_avatar
} = require('../controllers/userController');
const page = require('../json/routes.json').page.timeline;
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const {
    User,
    createDummyUser
} = require('../models/userModel');
//const file_name = __filename.slice(__dirname.length + 1, -3);

router.get('/', auth, async (req, res) => {
    console.log('Connected to /timeline');

    await User
        .findById(req.userData._id)
        .select('-password')
        .then(async result => {
            let gen_image = await show_avatar(result._id);
            page.data = gen_image;

            res.render('index', page);
            //  Clears image-data cache
            page.data = "";
        })
        .catch(err => {
            console.error(err);
        });
});

router.post('/', async (req, res) => {

});

module.exports = router;
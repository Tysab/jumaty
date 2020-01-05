//  Root path is /profile

const {
    show_auth_user
} = require('../controllers/userController');
const page = require('../json/routes.json').page.search;
const express = require('express');
const auth = require('../middleware/auth');

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

router.post('/', auth, async (req, res) => {
    //  User following function
});

module.exports = router;
//  Root path is /timeline

const page = require('../json/routes.json').page.timeline;
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const {
    show_auth_user
} = require('../controllers/userController');
//const file_name = __filename.slice(__dirname.length + 1, -3);

let local_message;

router.use(function (req, res, next) {
    res.locals.message = local_message;
    next();
});

router.get('/', auth, async (req, res, next) => {
    console.log('Connected to /timeline');

    let user = await show_auth_user(req.userData.userId);
    page.data.user = user;
    res.render('index', page);
});

router.post('/', async (req, res) => {

});

module.exports = router;
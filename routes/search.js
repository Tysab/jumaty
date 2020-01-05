//  Root path is /profile

const {
    show_auth_user,
    search_users
} = require('../controllers/userController');
const page = require('../json/routes.json').page.search;
const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

let local_message;
let searched_users;

router.use(function (req, res, next) {
    res.locals.message = local_message;
    res.locals.searched_users = searched_users;
    next();
});

router.get('/', auth, async (req, res) => {
    console.log('Connected to /search');
    console.log(res.locals.search_result);


    let user = await show_auth_user(req.userData.userId);
    page.data.user = user;
    res.render('index', page);
});

router.post('/', auth, async (req, res) => {
    //  User search
    console.log('Connected to /search POST');

    await search_users(req.body.search);

    res.redirect('/search');
});

module.exports = router;
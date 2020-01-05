//  Root path is /profile

const {
    show_auth_user,
    search_users
} = require('../controllers/userController');
const page = require('../json/routes.json').page.search;
const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    console.log('Connected to /search');
    res.locals.search_result = undefined;


    let user = await show_auth_user(req.userData.userId);
    page.data.user = user;
    res.render('index', page);
});

/**
 * TODO
 * Input can't be empty
 * Sanitize Input
 * Show error if XSS attempt
 * "No users found" message if result.length <= 0
 */

router.post('/', auth, search_users, async (req, res) => {
    //  User search
    console.log('Connected to /search POST');

    let user = await show_auth_user(req.userData.userId);
    page.data.user = user;

    res.render('index', page);

});

module.exports = router;
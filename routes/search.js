//  Root path is /profile

const {
    show_auth_user,
    search_users
} = require('../controllers/userController');
const page = require('../json/routes.json').page.search;
const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, show_auth_user, async (req, res) => {
    console.log('Connected to /search');
    res.locals.search_result = undefined;

    res.render('index', page);
});

/**
 * TODO
 * Input can't be empty
 * Sanitize Input
 * Show error if XSS attempt
 * "No users found" message if result.length <= 0
 */

router.post('/', auth, show_auth_user, search_users, async (req, res) => {
    //  User search
    console.log('Connected to /search POST');

    res.render('index', page);

});

module.exports = router;
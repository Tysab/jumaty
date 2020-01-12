//  Root path is /timeline

const {
    show_auth_user,
    search_users,
    add_follower
} = require('../controllers/userController');
const page = require('../json/routes.json').page.timeline;
const express = require('express');
const auth = require('../middleware/auth');
const auth_middle = [auth, show_auth_user];

const router = express.Router();

// add 'show followers'
router.get('/', auth_middle, async (req, res) => {
    console.log('Connected to /timeline');

    //  Doesn't render uploads successfully yet
    res.render('index', page);
});

/**
 * TODO
 * Input can't be empty
 * Sanitize Input
 * Show error if XSS attempt
 * "No users found" message if result.length <= 0
 */


module.exports = router;
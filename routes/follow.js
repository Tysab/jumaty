//  Root path is /follow

const {
    show_auth_user,
    search_users,
    add_follower
} = require('../controllers/userController');
const page = require('../json/routes.json').page.follow;
const express = require('express');
const auth = require('../middleware/auth');
const auth_middle = [auth, show_auth_user];

const router = express.Router();

// add 'show followers'
router.get('/', auth_middle, async (req, res) => {
    console.log('Connected to /follow');

    res.render('index', page);
});

/**
 * TODO
 * Input can't be empty
 * Sanitize Input
 * Show error if XSS attempt
 * "No users found" message if result.length <= 0
 */

router.post('/:user_id', auth_middle, add_follower, async (req, res) => {
    //  User search
    console.log('Connected to /follow POST');

    res.redirect('/follow');

});

module.exports = router;
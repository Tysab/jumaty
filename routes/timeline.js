//  Root path is /timeline

const {
    show_avatar
} = require('../controllers/userController');
const page = require('../json/routes.json').page.timeline;
const express = require('express');
const router = express.Router();
//const file_name = __filename.slice(__dirname.length + 1, -3);


router.get('/', async (req, res) => {
    console.log('Connected to /timeline');

    let gen_image = await show_avatar('5e02310d8b617356a02b6df2');
    page.data = gen_image;

    res.render('index', page);
    //  Clears image-data cache
    page.data = "";
});

router.post('/', async (req, res) => {

});

module.exports = router;
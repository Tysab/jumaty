//  Root path is /timeline

const { get_user_avatar } = require('../functions/binaryImage');
const page = require('../json/routes.json').page.timeline;
const express = require('express');
const router = express.Router();
//const file_name = __filename.slice(__dirname.length + 1, -3);


router.get('/', async (req, res) => {
    console.log('Connected to /timeline');

    let gen_image = await get_user_avatar();
    page.data = gen_image;
    
    res.render('index', page);
    page.data = "";
});

router.post('/', async (req, res) => {

});

module.exports = router;
//  Root path is /login

const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const {
    User,
    createDummyUser
} = require('../models/userModel');

//  img path ../public/img/logo.png



router.get('/', async (req, res) => {
    console.log('Connected to /login');

    res.render('login');
});

router.post('/', async (req, res) => {

    console.log('showing user function');

    User.findById({
            _id: '5e02310d8b617356a02b6df2'
        })
        .select()
        .then(result => {
            let newBuffer = {
                data: new Uint8Array(result.img.data.buffer),
                contentType: result.img.contentType
            }

            fs.writeFile('binaryImages/imgDB23232323.png', newBuffer.data, () => {
                //console.log(newBuffer);
            });

            //  Convert to base64
            let newBase = new Buffer(newBuffer.data).toString('base64');
            let imgSource = `data:${newBuffer.contentType};base64`;
            console.log(newBase);
            

            console.log(newBuffer.contentType);

            res.send(`<img src="${imgSource},${newBase}">`);

        })
        .catch(err => {
            console.log(err);
        });

    //	Generates image buffer
    //let readImageBuffer = fs.readFileSync(__dirname + '/../public/img/logo.png');

    //fs.writeFile('binaryImages/imgDB.png', readImageBuffer, () => {
    //console.log(readImageBuffer);
    //});

    console.log('GEEN ERROR');

});

module.exports = router;
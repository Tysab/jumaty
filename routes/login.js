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

            /**
             * TODO: Convert this block function for binary image generation middleware

             */
            // fs.writeFile('binaryImages/imgDB23232323.png', newBuffer.data, () => {
            //     //console.log(newBuffer);
            // });

            /**
             *      ? BINARY IMAGE STEPS
             * !    User{
             * !        img: readImageBuffer                    (Buffer data),
             * !        contentType: image/file_extension       (e.g : image/png)
             * !    }
             */

            //	Generates image buffer
            //let readImageBuffer = fs.readFileSync(__dirname + '/../public/img/logo.png');     //!  Buffer data

            //fs.writeFile('binaryImages/imgDB.png', readImageBuffer, () => {
            //console.log(readImageBuffer);
            //});

            //  Converts to base64 (for html rendering)
            let newBase = new Buffer(newBuffer.data).toString('base64');
            let imgSource = `data:${newBuffer.contentType};base64,${newBase}`;                  //! Variable for img src=""
            console.log(newBase);


            console.log(newBuffer.contentType);

            res.send(`<img src="${imgSource}">`);                                               //! Variable inside img src=""

        })
        .catch(err => {
            console.log(err);
        });


    console.log('GEEN ERROR');

});

module.exports = router;
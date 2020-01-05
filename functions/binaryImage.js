//  PROCESSES BINARY DATA FOR IMAGES

/** 
 * ? ADD PARAMETERS
 *  user_avatar
 *  all_user_uploads
 *  user_upload_single
 */

//  Modules
const fs = require('fs');

//  Controllers
const User_Controller = require('../controllers/userController');

//  Models
const {
    User
} = require('../models/userModel');

let imgSource;


module.exports.get_user_uploads = async function (result) {

    let imgSource = [];

    for (let x = 0; x < result.length; x++) {

        let newBuffer = {
            data: new Uint8Array(result[x].img.data.buffer),
            contentType: result[x].img.contentType
        }
        //  Converts to base64 (for html rendering)
        let newBase = new Buffer(newBuffer.data).toString('base64');
        let newSource = `data:${await newBuffer.contentType};base64,${newBase}`;
        let newImg = {
            beschrijving: result[x].beschrijving,
            datum: result[x].datum,
            img: newSource
        }

        imgSource.push(newImg); //! Variable for img src=""

    }

    //console.log(imgSource);
    return imgSource;
};

module.exports.get_user_avatar = async function (result) {

    let newBuffer = {
        data: new Uint8Array(result.img.data.buffer),
        contentType: result.img.contentType
    }
    //  Converts to base64 (for html rendering)
    let newBase = new Buffer(newBuffer.data).toString('base64');
    imgSource = `data:${newBuffer.contentType};base64,${newBase}`; //! Variable for img src=""

    //console.log(imgSource);
    return imgSource;
};

module.exports.set_default_avatar = function () {
    // let newBuffer = {
    //     data: new Uint8Array(result.img.data.buffer),
    //     contentType: result.img.contentType
    // }

    //  Creates image-file from binary data
    //fs.writeFile('binaryImages/IMGTEST.png', newBuffer.data, () => {
    //    //console.log(newBuffer);
    //});

    /**
     *      ? BINARY IMAGE STEPS
     * !    User{
     * !        img: readImageBuffer                    (Buffer data),
     * !        contentType: image/file_extension       (e.g : image/png)
     * !    }
     */

    //	Generates image buffer
    let readImageBuffer = fs.readFileSync(`${__dirname}/../binaryImages/default-avatar.png`); //!  Generated buffer data

    let new_image = {
        data: readImageBuffer,
        contentType: "image/png",
    };

    return new_image;
}

module.exports.get_uploaded_user_avatar = function (user_id, file_data) {
    // let newBuffer = {
    //     data: new Uint8Array(result.img.data.buffer),
    //     contentType: result.img.contentType
    // }

    //  Creates image-file from binary data
    //fs.writeFile('binaryImages/IMGTEST.png', newBuffer.data, () => {
    //    //console.log(newBuffer);
    //});

    /**
     *      ? BINARY IMAGE STEPS
     * !    User{
     * !        img: readImageBuffer                    (Buffer data),
     * !        contentType: image/file_extension       (e.g : image/png)
     * !    }
     */

    //	Generates image buffer
    let readImageBuffer = fs.readFileSync(`${__dirname}/../binaryImages/${file_data.file_name}`); //!  Generated buffer data

    let new_image = {
        data: readImageBuffer,
        contentType: file_data.contentType
    };

    return new_image;

    //  Store in database

    //  Writes image file from generated buffer data
    fs.writeFile('binaryImages/imgDB.png', readImageBuffer, () => {
        console.log(readImageBuffer);
    });


    //  Converts to base64 (for html rendering)
    let newBase = new Buffer(newBuffer.data).toString('base64');
    imgSource = `data:${newBuffer.contentType};base64,${newBase}`; //! Variable for img src=""


    //res.send(`<img src="${imgSource}">`); //! Variable inside img src=""

}


//  TEST CODE
module.exports.get2_user_avatar = async function () {

    //  img path ../public/img/logo.png

    console.log('showing user function');

    //  Selects user-avatar
    await User.findById({
            _id: '5e02310d8b617356a02b6df2' //  Grabs one dummy-created user from database
        })
        .select()
        .then(result => {
            //  Creates Object for references
            let newBuffer = {
                data: new Uint8Array(result.img.data.buffer),
                contentType: result.img.contentType
            }

            //  Creates image-file from binary data
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
            imgSource = `data:${newBuffer.contentType};base64,${newBase}`; //! Variable for img src=""

            return;

            //res.send(`<img src="${imgSource}">`); //! Variable inside img src=""

        })
        .catch(err => {
            console.log(err);
        });

    console.log('GEEN ERROR');

    return imgSource;

};
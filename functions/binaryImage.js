//  ADD PARAMETERS
//  user_avatar
//  all_user_uploads
//  user_upload_single

const {
    User
} = require('../models/userModel');

module.exports.get_user_avatar = async function (user_avatar) {

    let imgSource;

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

    return imgSource;


    console.log('GEEN ERROR');

};
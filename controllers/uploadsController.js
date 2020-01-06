const {
    Uploads,
    validate
} = require('../models/uploadsModel.js');
const binaryImage = require('../functions/binaryImage');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({
    dest: "binaryImages/"
});
const page = require('../json/routes.json').page.upload;

/**
 * uploadsController.js
 *
 * @description :: Server-side logic for managing uploads.
 */


module.exports = {

    //  Show uploads by user
    show_user_uploads: async function (user_id) {
        let uploads = await Uploads.find({
                User_id: user_id
            })
            .select('src beschrijving datum')
            .catch(err => {
                console.log(err);
            });


        //let converted_image = await binaryImage.get_user_uploads(uploads);


        //uploads = converted_image;

        return uploads;
    },


    show: function (req, res) {
        const id = req.params.id;
        uploadsModel.findOne({
            _id: id
        }, function (err, uploads) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting uploads.',
                    error: err
                });
            }
            if (!uploads) {
                return res.status(404).json({
                    message: 'No such uploads'
                });
            }
            return res.json(uploads);
        });
    },


    
    //create: async function (user_id, data) {
    create: async function (req, res, next) {


        if (!req.file) {
            console.log('No file found');
            res.locals.message = "File not found";
            res.redirect('/upload');
        }



        let content = {
            beschrijving: req.body.beschrijving,
            img: {
                contentType: req.file.mimetype,
                file_name: req.file.filename
            }
        };

        //  from router

        let new_data = {
            beschrijving: content.beschrijving,
            img: binaryImage.get_uploaded_user_avatar(req.userData.userId, content.img)
        };

        const {
            error
        } = validate(new_data);

        if (!error) {
            console.log('User input-validation pass');
        } else if (error) {
            //console.log(error);
            res.locals.message = error.details[0].message;
            return res.render('index', page);

        }

        const uploads = new Uploads({
            img: {
                data: new_data.img.data,
                contentType: new_data.img.contentType
            },
            beschrijving: new_data.beschrijving,
            User_id: req.userData.userId

        });

        await uploads.save(function (err, uploads) {
            if (err) {
                res.locals.message = err;
                return res.render('index', page);
            }
            res.locals.message = "Foto is geupload!";
            return res.render('index', page);
        });

    },

  
    // Add update and remove controllers
};
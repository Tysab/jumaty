const {
    Uploads,
    validate
} = require('../models/uploadsModel.js');
const binaryImage = require('../functions/binaryImage');

/**
 * uploadsController.js
 *
 * @description :: Server-side logic for managing uploads.
 */
module.exports = {

    /**
     * uploadsController.list()
     */
    list: function (req, res) {
        uploadsModel.find(function (err, uploads) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting uploads.',
                    error: err
                });
            }
            return res.json(uploads);
        });
    },

    /**
     * uploadsController.show()
     */
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

    /**
     * uploadsController.create()
     */
    create: async function (data) {

        const {
            error
        } = validate(data);

        if (!error) {
            console.log('User input-validation pass');
        } else if (error) {
            //console.log(error);
            return res.status(400).send(error.details[0].message);
        }

        let new_data = binaryImage.get_uploaded_user_avatar(user_id, data.img);

        const uploads = new Uploads({
            img: {
                data: new_data.data,
                contentType: new_data.contentType
            },
            beschrijving: req.body.beschrijving,
            User_id: req.body.User_id

        });

        uploads.save(function (err, uploads) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating uploads',
                    error: err
                });
            }
            return res.status(201).json(uploads);
        });
    },

    /**
     * uploadsController.update()
     */
    update: function (req, res) {
        const id = req.params.id;
        uploadsModel.findOne({
            _id: id
        }, function (err, uploads) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting uploads',
                    error: err
                });
            }
            if (!uploads) {
                return res.status(404).json({
                    message: 'No such uploads'
                });
            }

            uploads.img = req.body.img ? req.body.img : uploads.img;
            uploads.beschrijving = req.body.beschrijving ? req.body.beschrijving : uploads.beschrijving;
            uploads.datum = req.body.datum ? req.body.datum : uploads.datum;
            uploads.User_id = req.body.User_id ? req.body.User_id : uploads.User_id;

            uploads.save(function (err, uploads) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating uploads.',
                        error: err
                    });
                }

                return res.json(uploads);
            });
        });
    },

    /**
     * uploadsController.remove()
     */
    remove: function (req, res) {
        const id = req.params.id;
        uploadsModel.findByIdAndRemove(id, function (err, uploads) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the uploads.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
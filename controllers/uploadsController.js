const uploadsModel = require('../models/uploadsModel.js');

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
        uploadsModel.findOne({_id: id}, function (err, uploads) {
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
    create: function (req, res) {
        const uploads = new uploadsModel({
			img : req.body.img,
			beschrijving : req.body.beschrijving,
			datum : req.body.datum,
			User_id : req.body.User_id

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
        uploadsModel.findOne({_id: id}, function (err, uploads) {
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

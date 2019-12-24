const tijdlijnModel = require('../models/tijdlijnModel.js');

/**
 * tijdlijnController.js
 *
 * @description :: Server-side logic for managing tijdlijns.
 */
module.exports = {

    /**
     * tijdlijnController.list()
     */
    list: function (req, res) {
        tijdlijnModel.find(function (err, tijdlijn) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting tijdlijn.',
                    error: err
                });
            }
            return res.json(tijdlijn);
        });
    },

    /**
     * tijdlijnController.show()
     */
    show: function (req, res) {
        const id = req.params.id;
        tijdlijnModel.findOne({_id: id}, function (err, tijdlijn) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting tijdlijn.',
                    error: err
                });
            }
            if (!tijdlijn) {
                return res.status(404).json({
                    message: 'No such tijdlijn'
                });
            }
            return res.json(tijdlijn);
        });
    },

    /**
     * tijdlijnController.create()
     */
    create: function (req, res) {
        const tijdlijn = new tijdlijnModel({
			User_id : req.body.User_id

        });

        tijdlijn.save(function (err, tijdlijn) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating tijdlijn',
                    error: err
                });
            }
            return res.status(201).json(tijdlijn);
        });
    },

    /**
     * tijdlijnController.update()
     */
    update: function (req, res) {
        const id = req.params.id;
        tijdlijnModel.findOne({_id: id}, function (err, tijdlijn) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting tijdlijn',
                    error: err
                });
            }
            if (!tijdlijn) {
                return res.status(404).json({
                    message: 'No such tijdlijn'
                });
            }

            tijdlijn.User_id = req.body.User_id ? req.body.User_id : tijdlijn.User_id;
			
            tijdlijn.save(function (err, tijdlijn) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating tijdlijn.',
                        error: err
                    });
                }

                return res.json(tijdlijn);
            });
        });
    },

    /**
     * tijdlijnController.remove()
     */
    remove: function (req, res) {
        const id = req.params.id;
        tijdlijnModel.findByIdAndRemove(id, function (err, tijdlijn) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the tijdlijn.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

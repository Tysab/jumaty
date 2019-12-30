const {
    User
} = require('../models/userModel.js');
const binaryImage = require('../functions/binaryImage');
const bcrypt = require('bcrypt');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */

let passed_query;

module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        User.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        const id = req.params.id;
        User.findById({
            _id: id
        }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    },

    //  Shows user avatar from binary data
    //  Shows user avatar from binary data
    show_avatar: async function (user_id) {
        await User.findById({
                _id: user_id
            })
            .then(result => {

                passed_query = binaryImage.get_user_avatar(result);
            })
            .catch(error => {
                console.log(error);
            });

        return passed_query;
    },

    set_avatar: async function (user_id, file_data) {

        let new_data = binaryImage.get_uploaded_user_avatar(user_id, file_data);

        console.log('BINARY DATA');
        console.log(new_data);

        await User.findByIdAndUpdate(user_id, {
            $set: {
                img: {
                    data: new_data.data,
                    contentType: new_data.contentType
                }
            }
        }, () => {
            console.log("Upload successful");
        });
    },

    /**
     * userController.create()
     */
    create: async function (req, res) {

        let new_data = binaryImage.set_default_avatar();
        const salt = await bcrypt.genSalt(10);
        let user_password = await bcrypt.hash(req.body.wachtwoord, salt);

        const user = new User({
            voornaam: req.body.voornaam,
            achternaam: req.body.achternaam,
            email: req.body.email,
            wachtwoord: user_password,
            img: {
                data: new_data.data,
                contentType: new_data.contentType
            }
        });

        await user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }
            return res.render('login');
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        const id = req.params.id;
        User.findById({
            _id: id
        }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.voornaam = req.body.voornaam ? req.body.voornaam : user.voornaam;
            user.achternaam = req.body.achternaam ? req.body.achternaam : user.achternaam;
            user.email = req.body.email ? req.body.email : user.email;
            user.wachtwoord = req.body.wachtwoord ? req.body.wachtwoord : user.wachtwoord;
            user.img = req.body.img ? req.body.img : user.img;
            user.tijdlijn = req.body.tijdlijn ? req.body.tijdlijn : user.tijdlijn;
            user.uploads = req.body.uploads ? req.body.uploads : user.uploads;
            user.followed_user = req.body.followed_user ? req.body.followed_user : user.followed_user;

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        const id = req.params.id;
        User.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
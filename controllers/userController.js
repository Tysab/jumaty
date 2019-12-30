const {
    User,
    validateInput
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
    show_auth_user: async function (userId) {
        const user = await User
            .findById(userId)
            .select('-password')
            .catch(err => {
                console.error(err);
            });

        //  Generates user avatar from binary data
        user.img_data = await binaryImage.get_user_avatar(user);

        //  Reassign objects with _Lodash
        user.img = "";
        return user;
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

        const {
            error
        } = validateInput(req.body);

        if (!error) {
            console.log('Author input-validation pass');
        } else if (error) {
            console.log(error);
            return res.status(400).render("register", {
                message: error.details[0].message
            });
        }

        if (!validateInput) return res.render('register', )

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
            user.biografie = req.body.biografie ? req.body.biografie : user.biografie;
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
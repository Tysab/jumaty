const {
    User
} = require('../models/userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */

let imgSource;

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

                let newBuffer = {
                    data: new Uint8Array(result.img.data.buffer),
                    contentType: result.img.contentType
                }
                //  Converts to base64 (for html rendering)
                let newBase = new Buffer(newBuffer.data).toString('base64');
                imgSource = `data:${newBuffer.contentType};base64,${newBase}`; //! Variable for img src=""

                //console.log(imgSource);
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });

        return imgSource;
    },

    set_avatar: async function (user_id, user_avatar) {
        await User.findByIdAndUpdate(user_id, {
            $set: {
                img: {
                    data: user_avatar.data,
                    contentType: user_avatar.contentType
                }
            }
        }, () => {
            console.log("Upload successful");
        });
    },

    set2_avatar: async function (user_id, user_avatar) {
        User.findById({
            _id: user_id
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

            user.img = req.body.img ? user_avatar : user.img;

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
     * userController.create()
     */
    create: function (req, res) {
        const user = new User({
            voornaam: req.body.voornaam,
            achternaam: req.body.achternaam,
            email: req.body.email,
            wachtwoord: req.body.wachtwoord,
            img: req.body.img,
            tijdlijn: req.body.tijdlijn,
            uploads: req.body.uploads,
            followed_user: req.body.followed_user

        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }
            return res.status(201).json(user);
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
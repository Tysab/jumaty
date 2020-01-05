const {
    User,
    validateInput
} = require('../models/userModel.js');
const {
    show_user_uploads
} = require('../controllers/uploadsController');
const binaryImage = require('../functions/binaryImage');
const bcrypt = require('bcrypt');


/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */

let passed_query;

module.exports = {

    //  Currently not used
    show_auth_user: async function (userId) {
        const user = await User
            .findById(userId)
            .select('-password')
            .catch(err => {
                console.error(err);
            });

        //  Generates user avatar from binary data
        user.img_data = await binaryImage.get_user_avatar(user);

        user.uploads = await show_user_uploads(userId);

        //  Reassign objects with _Lodash
        user.img = "";
        return user;
    },

    show_auth_user_images: async function (req, res, next) {

        const user = await User
            .findById(req.userData.userId)
            .select('-password')
            .catch(err => {
                console.error(err);
            });

        //  Generates user avatar from binary data
        user.img_data = await binaryImage.get_user_avatar(user);

        user.uploads = await show_user_uploads(req.userData.userId);

        //  Reassign objects with _Lodash
        res.locals.user = user;
        next();
    },


    //  Make compatible with logged in used AND chosen user from req.params.user_id
    show_selected_user_info: async function (req, res, next) {

        const user = await User
            .findById(req.params.user_id)
            .select('-password')
            .catch(err => {
                console.error(err);
            });

        //  Generates user avatar from binary data
        user.img_data = await binaryImage.get_user_avatar(user);

        user.uploads = await show_user_uploads(req.params.user_id);

        //  Reassign objects with _Lodash
        res.locals.selected_user = user;
        next();
    },

    search_users: async function (req, res, next) {

        let search_regexp = new RegExp(req.body.search, "gi");

        await User
            .find({
                full_name: search_regexp
            })
            .select('full_name img biografie')
            .exec(async (err, user) => {
                let result = (err) ? err : user;
                user.img = await binaryImage.get_searched_user_avatars(user);
                res.locals.search_result = result;
                next();
            });

        //  Generates user avatar from binary data
        //user.img_data = await binaryImage.get_user_avatar(user);

        //  Reassign objects with _Lodash
        //user.img = "";
    },

    set_avatar: async function (user_id, file_data) {

        let new_data = binaryImage.get_uploaded_user_avatar(user_id, file_data);

        const {
            error
        } = validateInput("set_avatar", new_data);

        if (!error) {
            console.log('User input-validation pass');
        } else if (error) {
            //console.log(error);
            passed_query = error.details[0].message;
            return passed_query;
        }


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
            passed_query = "Upload successful";
        });
        return passed_query;
    },

    // Registers new user
    create: async function (req, res) {

        const {
            error
        } = validateInput("register", req.body);

        if (!error) {
            console.log('User input-validation pass');
        } else if (error) {
            //console.log(error);
            return res.status(400).render("register", {
                message: error.details[0].message
            });
        }

        let new_data = binaryImage.set_default_avatar();
        const salt = await bcrypt.genSalt(10);
        let user_password = await bcrypt.hash(req.body.wachtwoord, salt);

        const user = new User({
            voornaam: req.body.voornaam,
            achternaam: req.body.achternaam,
            email: req.body.email.toLowerCase(),
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
            return res.render('login', {
                message: "Account aangemaakt!"
            });
        });
    },

    // Allows user to update their data
    update: async function (user_id, data, type) {


        const {
            error
        } = validateInput(type, data);

        if (!error) {
            console.log('User input-validation pass');
        } else if (error) {
            //console.log(error);
            passed_query = error.details[0].message;
            return passed_query;
        }


        //  Copy this switch from userModel.js

        switch (type) {

            case 'set_bio':
                await User.findByIdAndUpdate(user_id, {
                    $set: {
                        biografie: data.biografie
                    }
                }, () => {
                    console.log("Biografie aangepast");
                    passed_query = "Biografie aangepast";
                });
                return passed_query;
                break;

            case 'set_userinfo':
                await User.findByIdAndUpdate(user_id, {
                    $set: {
                        voornaam: data.voornaam,
                        achternaam: data.achternaam,
                        email: data.email
                    }
                }, () => {
                    console.log("Persoonlijke gegevens aangepast");
                    passed_query = "Persoonlijke gegevens aangepast";
                });
                return passed_query;
                break;

            case 'set_password':
                const salt = await bcrypt.genSalt(10);
                let user_password = await bcrypt.hash(data.wachtwoord, salt);
                await User.findByIdAndUpdate(user_id, {
                    $set: {
                        wachtwoord: user_password,
                    }
                }, () => {
                    console.log("Wachtwoord aangepast");
                    passed_query = "Wachtwoord aangepast";
                });
                return passed_query;
                break;

            default:
                console.log('ERROR: update request not valid');
                return "ERROR: update request not valid";
                break;

        }

    }

};
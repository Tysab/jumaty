//  Root path is /login
const {
    jwtPrivateKey
} = require('../startup/config');
const jwt = require('jsonwebtoken');

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const {
    User,
    createDummyUser
} = require('../models/userModel');


router.get('/', async (req, res) => {
    console.log('Connected to /login');

    res.render('login');
});

router.post('/', async (req, res, next) => {
    await User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "E-mail or password incorrect"
                });
            };
            console.log(user);

            bcrypt.compare(req.body.wachtwoord, user[0].wachtwoord, (err, result) => {

                if (err) return res.status(401).json({
                    message: "E-mail or password incorrect"
                });

                //const token = user.generateAuthToken(); // Doesn't work as a schema method

                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id,
                    voornaam: user[0].voornaam
                    //isAdmin: true,
                }, jwtPrivateKey, {
                    expiresIn: "1h"
                });
                console.log(token);

                //  Redirects successfully logged in user to /timeline
                if (result) {
                    // res.header('x-auth-token', token);
                    // res.send(token);
                    // return;
                    return res.cookie('authToken', token, {
                        expires: new Date(Date.now() + 3600000),
                        secure: false,      //  True if using HTTPS,
                        httpOnly: true
                    }).redirect('/timeline');
                };

                // if (result) return res.status(200).header('x-auth-token', token).json({
                //     message: "Login success",
                //     token: token
                // });


                res.status(401).json({
                    message: "E-mail or password incorrect"
                });

            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

module.exports = router;
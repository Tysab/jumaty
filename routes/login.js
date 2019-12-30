//  Root path is /login

const fs = require('fs');
const path = require('path');
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
    User.findOne({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "1E-mail or password incorrect"
                });
            };
            console.log(user);

            bcrypt.compare(req.body.wachtwoord, user.wachtwoord, (err, result) => {

                if (err) {
                    return res.status(401).json({
                        message: "2E-mail or password incorrect"
                    });
                };

                if (result) {
                    return res.status(200).json({
                        message: "Login success"
                    });
                };

                res.status(401).json({
                    message: "3E-mail or password incorrect"
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
//  Root path is /login

const fs = require('fs');
const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
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
    User.find({
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

                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, config.get('jwtPrivateKey'), {
                    expiresIn: "1h"
                });

                if (result) return res.status(200).json({
                    message: "Login success",
                    token: token
                });

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
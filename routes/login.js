//  Root path is /login

const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const {
    User,
    createDummyUser
} = require('../models/userModel');

//  img path ../public/img/logo.png



router.get('/', async (req, res) => {
    console.log('Connected to /login');

    let readImageBuffer = fs.readFileSync(__dirname + '/../public/img/logo.png');

    let userBuffer = new Uint8Array(readImageBuffer);
    let binary = '';

    console.log(userBuffer);

    fs.writeFile('binaryImages/imgBuffer2.png', readImageBuffer, () => {
        console.log(readImageBuffer);
    });



    res.render('login');
});

router.post('/', async (req, res) => {

    let readImageBuffer = fs.readFileSync(__dirname + '/../public/img/logo.png');

    //createDummyUser('Tyler', 'Broere', 'tyler@mail.com', '123456', readImageBuffer, 'image/png');
    //showUser('5e02205415fe6f6304209ad5');

    console.log('showing user function');

	User.findOne({
		_id: '5e02205415fe6f6304209ad5'
	}, function (err, user) {
		if (err) {
			console.log('DIKKE ERROR');
			return 0;
		}
		if (!user) {
			return res.status(404).json({
				message: 'No such user'
			});
		}

		let userBuffer = new Uint8Array(user.img.data.buffer);
		let binary = '';

		for(let i = 0; i < userBuffer.byteLength; i++){
			binary += String.fromCharCode(userBuffer[i]);
		}
		
		console.log(binary);

		fs.writeFile('imgBuffer.txt', binary, () => {
			console.log(userBuffer);
		});

        console.log('GEEN ERROR');
        res.send(userBuffer);
		return 0;
	});
});

module.exports = router;
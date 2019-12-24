const fs = require('fs');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const Schema = mongoose.Schema;

// NEW REFERENCE/ID
//	_id: new mongoose.Types.ObjectId(),

const userSchema = new Schema({
	voornaam: {
		type: String,
		required: true,
	},
	achternaam: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	wachtwoord: {
		type: String,
		required: true,
	},
	img: {
		data: Buffer,
		contentType: String,
	},
	tijdlijn: {
		type: Schema.Types.ObjectId,
		ref: 'tijdlijn'
	},
	uploads: [{
		type: Schema.Types.ObjectId,
		ref: 'uploads'
	}],
	followed_user: [{
		type: Schema.Types.ObjectId,
		ref: 'user'
	}]
});

const userModel = mongoose.model('user', userSchema);

function validateUserInput(input) {
	const schema = Joi.object({
		voornaam: Joi.String().required(),
		achternaam: Joi.String().required(),
		email: Joi.String().email().required(),
		wachtwoord: Joi.String().required(),
	});
	return schema.validate(input, (error, value) => {});

}


// createDummyUser('Tyler', 'Broere', 'tyler@mail.com', '123456');

async function createDummyUser(voornaam, achternaam, email, wachtwoord, imgOne, imgTwo) {

	console.log('starting dummy function');

	const user = new userModel({
		voornaam,
		achternaam,
		email,
		wachtwoord,
		img: {
			data: imgOne,
			contentType: imgTwo
		}
	});

	await user.save((err, user) => {
		if (err) {
			console.log('DIKKE ERROR');
			return 0;
		}

		console.log(user);
		console.log('GEEN ERROR');
		return 0;
	});
};

module.exports.User = userModel;
module.exports.createDummyUser = createDummyUser;
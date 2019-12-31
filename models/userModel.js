const {
	jwtPrivateKey
} = require('../startup/config');
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
	biografie: {
		type: String,
		default: ""
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

//	Doesn't work for some reason
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({
		email: user[0].email,
		userId: user[0]._id,
		//isAdmin: true,
	}, jwtPrivateKey, {
		expiresIn: "1h"
	});
	return token;
};

const userModel = mongoose.model('user', userSchema);


//	For refactoring, add a second parameter to choose the process type
function validateInputRegister(input) {
	const schema = Joi.object({
		voornaam: Joi.string().required(),
		achternaam: Joi.string().required(),
		email: Joi.string().email().required(),
		wachtwoord: Joi.string().required(),
	});
	return schema.validate(input, (error, value) => {});

}

function validateInputLogin(input) {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		wachtwoord: Joi.string().required(),
	});
	return schema.validate(input, (error, value) => {});

}

module.exports.User = userModel;
module.exports.validateInputRegister = validateInputRegister;
module.exports.validateInputLogin = validateInputLogin;
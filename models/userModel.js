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
		default: "",
		minlength: 0,
		maxlength: 255
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
function validateInput(validation_type, input) {

	let schema;

	switch (validation_type) {

		case 'login':
			console.log(`Validation type: ${validation_type}`);
			schema = Joi.object({
				email: Joi.string().email().required(),
				wachtwoord: Joi.string().required(),
			});
			return schema.validate(input, (error, value) => {});
			break;

		case 'register':
			console.log(`Validation type: ${validation_type}`);
			schema = Joi.object({
				voornaam: Joi.string().required(),
				achternaam: Joi.string().required(),
				email: Joi.string().email().required(),
				wachtwoord: Joi.string().required(),
			});
			return schema.validate(input, (error, value) => {});
			break;

		case 'set_avatar':
			console.log(`Validation type: ${validation_type}`);
			schema = Joi.object({
				data: Joi.binary().encoding('base64').required(),
				contentType: Joi.required()
			});
			return schema.validate(input, (error, value) => {});
			break;

		case 'set_bio':
			console.log(`Validation type: ${validation_type}`);
			schema = Joi.object({
				biografie: Joi.string().min(0).max(255).allow('').required()
			});
			return schema.validate(input, (error, value) => {});
			break;

		case 'set_password':
			console.log(`Validation type: ${validation_type}`);
			schema = Joi.object({

			});
			return schema.validate(input, (error, value) => {});
			break;

		case 'upload_image':
			console.log(`Validation type: ${validation_type}`);
			schema = Joi.object({

			});
			return schema.validate(input, (error, value) => {});
			break;

		default:
			console.log('ERROR: validation request type not valid');
			return "ERROR: validation request type not valid";
			break;

	}


}

module.exports.User = userModel;
module.exports.validateInput = validateInput;
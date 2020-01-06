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
		minlength: 1,
		maxlength: 50
	},
	achternaam: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 70
	},
	full_name: {
		type: String,
		default: function () {
			return this.voornaam + " " + this.achternaam;
		}
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	wachtwoord: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 255
	},
	img: {
		data: Buffer,
		contentType: String,
	},
	src: {
		type: String,
		default: function () {
			let newBuffer = {
				data: new Uint8Array(this.img.data.buffer),
				contentType: this.img.contentType
			}
			//  Converts to base64 (for html rendering)
			let newBase = new Buffer(newBuffer.data).toString('base64');
			imgSource = `data:${newBuffer.contentType};base64,${newBase}`; //! Variable for img src=""

			//console.log(imgSource);
			return imgSource;
		}
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
	following: [{
		type: Schema.Types.ObjectId,
		ref: 'user'
	}],
	followers: [{
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
				voornaam: Joi.string().min(1).max(50).required(),
				achternaam: Joi.string().min(1).max(70).required(),
				email: Joi.string().email().required(),
				wachtwoord: Joi.string().min(6).max(255).required(),
				wachtwoord_herhalen: Joi.string().min(6).max(255).valid(Joi.ref('wachtwoord')).required(),
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

		case 'set_userinfo':
			console.log(`Validation type: ${validation_type}`);
			schema = Joi.object({
				voornaam: Joi.string().min(1).max(50).required(),
				achternaam: Joi.string().min(1).max(70).required(),
				email: Joi.string().email().required(),
			});
			return schema.validate(input, (error, value) => {});
			break;

		case 'set_password':
			console.log(`Validation type: ${validation_type}`);
			schema = Joi.object({
				wachtwoord: Joi.string().min(6).max(255).required(),
				wachtwoord_herhalen: Joi.string().min(6).max(255).valid(Joi.ref('wachtwoord')).required(),
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
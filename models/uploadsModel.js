const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const Schema = mongoose.Schema;

const uploadsSchema = new Schema({
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
	beschrijving: {
		type: String,
		default: "",
		minlength: 0,
		maxlength: 255
	},
	datum: {
		type: Date,
		default: new Date()
	},
	User_id: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	}
});

const uploadsModel = mongoose.model('uploads', uploadsSchema);

function validateInput(input) {

	schema = Joi.object({
		beschrijving: Joi.string().min(0).max(255).allow('').required(),
		img: Joi.object().keys({
			data: Joi.binary().encoding('base64').required(),
			contentType: Joi.required()
		}),
	});
	return schema.validate(input, (error, value) => {});

}

module.exports.Uploads = uploadsModel;
module.exports.validate = validateInput;
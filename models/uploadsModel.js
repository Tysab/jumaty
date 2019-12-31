var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uploadsSchema = new Schema({
	img: String,
	//	Set character limit (255?)
	beschrijving: String,
	datum: Date,
	User_id: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	}
});

module.exports = mongoose.model('uploads', uploadsSchema);
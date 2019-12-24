var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uploadsSchema = new Schema({
	img: String,
	beschrijving: String,
	datum: Date,
	User_id: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	}
});

module.exports = mongoose.model('uploads', uploadsSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tijdlijnSchema = new Schema({
	User_id: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	}
});

module.exports = mongoose.model('tijdlijn', tijdlijnSchema);
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	dateOfBirth: String,
	type: String,
	phone: Number
});

module.exports = mongoose.model('User', UserSchema);

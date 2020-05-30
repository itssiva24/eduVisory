const bcrypt = require('bcrypt');
const User = require('../models/user');
async function authenticate(email, password) {
	const user = await User.findOne({ email: email }, (err, existingUser) => {
		return existingUser;
	});
	let isAuthenticated,
		emailExists = false;
	if (user) {
		console.log(user);
		const hashPassword = user.password;
		emailExists = true;
		isAuthenticated = await bcrypt.compare(password, hashPassword).catch((err) => console.log(err));
		userId = isAuthenticated ? user._id : null;
		username = isAuthenticated ? user.username : null;
	}
	return { emailExists, isAuthenticated, userId, username };
}

async function loginHandler(req, res) {
	const { email, password } = req.body;
	const { emailExists, isAuthenticated, userId, username } = await authenticate(email, password);
	req.session.isAuthenticated = isAuthenticated;
	if (isAuthenticated) {
		req.session.userId = userId;
	}
	console.log(isAuthenticated, userId);
	req.session.save();
	res.send({ emailExists, isAuthenticated, username });
}

module.exports = loginHandler;

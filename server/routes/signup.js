const bcrypt = require('bcrypt');
const User = require('../models/user');
async function signUpHandler(req, res) {
	const hashedPassword = await bcrypt.hash(req.body.password, 10).catch((err) => console.log(err));
	const data = req.body;
	const { username, password } = data;
	let email = data.email.toLowerCase();
	User.find({ username: username }, (err, existingUsernames) => {
		if (err) {
			return res.json({
				success: false,
				message: 'Server Error'
			});
		} else if (existingUsernames.length > 0) {
			return res.json({
				success: false,
				message: 'Username already exists'
			});
		} else {
			User.find({ email: email }, (err, existingEmails) => {
				if (err) {
					return res.json({
						success: false,
						message: 'Server Error'
					});
				} else if (existingEmails.length > 0) {
					return res.json({
						success: false,
						message: 'Email ID already exists'
					});
				} else {
					data.password = hashedPassword;
					user = new User({
						username: req.body.username,
						email: email,
						password: hashedPassword,
						dateOfBirth: req.body.dateOfBirth,
						type: req.body.type,
						phone: parseInt(req.body.phone)
					});

					user.save((err, user) => {
						if (err) {
							return res.json({
								success: false,
								message: 'Server error'
							});
						} else {
							return res.json({
								success: true,
								message: 'Successfully signed up!',
								id: user._id
							});
						}
					});
				}
			});
		}
	});
}

module.exports = signUpHandler;

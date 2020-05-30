const User = require('../models/user');

async function usernameHandler(req, res) {
	await User.find({ _id: req.session.userId }, (err, existingUsers) => {
		if (err) {
			return res.json({
				success: false,
				message: 'User is not logged in'
			});
		} else if (existingUsers.length > 1) {
			return res.json({
				success: false,
				message: 'Error'
			});
		} else {
			console.log(existingUsers);
			console.log(req.session.userId);
			return res.json({
				success: true,
				message: 'Succcess',
				isAuthenticated: req.session.isAuthenticated,
				username: existingUsers[0].username
			});
		}
	});
}

module.exports = usernameHandler;

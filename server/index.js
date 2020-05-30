const express = require('express');
const path = require('path');
const cors = require('cors');
const app = new express();
const session = require('express-session');
const port = process.env.PORT || 5000;
const loginHandler = require('../server/routes/login');
const signUpHandler = require('../server/routes/signup');
const usernameHandler = require('../server/routes/username');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Siva:tnsp9443908006@cluster0-9j26t.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
	uri: 'mongodb+srv://Siva:tnsp9443908006@cluster0-9j26t.mongodb.net/test?retryWrites=true&w=majority',
	collection: 'mySessions'
});

// Catch errors
store.on('error', function(error) {
	console.log(error);
});

app.use(
	session({
		name: 'mySession',
		secret: 'SECRETSSHH',
		cookie: {
			maxAge: 1000 * 60 * 60 // 1 hour
		},
		store: store,
		resave: true,
		saveUninitialized: true
	})
);
app.use(
	cors({
		origin: 'http://localhost:3000',
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
		credentials: true
	})
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.all('/auth/*', authHandler);
app.post('/login', loginHandler);
app.post('/signup', signUpHandler);
app.get('/auth/user', usernameHandler);
// app.use(express.static(path.join(__dirname, '../' + 'app/public' )))
app.listen(port, () => console.log(`Listening at port: ${port}`));

function authHandler(req, res, next) {
	console.log('REQ SESSION IS AUTH ', req.session.isAuthenticated);
	if (req.session.isAuthenticated) next();
	else
		res.json({
			success: false,
			isAuthenticated: false,
			message: 'The user is not logged in'
		});
}

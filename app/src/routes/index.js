import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../user/Login';
import SignUp from '../user/SignUp';
import Forum from '../user/Forum';
import { Redirect } from 'react-router-dom';

function Routes() {
	return (
		<Router>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/forum" component={Forum} />
				<Redirect from="/" to="/login" />
			</Switch>
		</Router>
	);
}

export default Routes;

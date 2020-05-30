import React, { useState } from 'react';
import { Form, Button, Input, Card, Alert, notification } from 'antd';
import axios from 'axios';
import { loginHandler } from '../utils/fetchCalls';

function Login(props) {
	const [ isLoading, setIsLoading ] = useState(false);
	const divStyle = {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItem: 'center',
		justifyContent: 'center'
	};
	const layout = {
		labelCol: { span: 5, offset: 2 },
		wrapperCol: { span: 12 }
	};
	const tailLayout = {
		wrapperCol: { offset: 7, span: 12 }
	};

	const onFinish = async (values) => {
		console.log(values);
		setIsLoading(true);
		const { emailExists, isAuthenticated } = await loginHandler(values['email'], values['password']);
		setIsLoading(false);
		if (isAuthenticated) {
			props.history.push('/forum');
		} else {
			const message = emailExists ? 'The password is incorrect' : 'No such user exists';
			notification.error({ message });
		}
	};
	const onFinishFailed = (err) => {
		console.error(err);
	};
	const handleSignUp = () => {
		props.history.push({
			pathname: '/signup'
		});
	};

	return (
		<div style={{ ...divStyle }}>
			<Card style={{ minWidth: '300px', width: '50%', margin: '0 auto' }}>
				<Form name="loginForm" {...layout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ type: 'email', message: 'Enter a valid email' },
							{ required: true, message: 'Please input the email' }
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Password"
						name="password"
						rules={[ { required: true, message: 'Please input your password' } ]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit" loading={isLoading}>
							Login
						</Button>
						<Button type="link" htmlType="button" onClick={handleSignUp}>
							Sign Up
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
}

export default Login;

import React, { useState } from 'react';
import { Form, Button, Input, Card, DatePicker, notification, Select, InputNumber } from 'antd';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import axios from 'axios';
const { Option } = Select;
export default function SignUp(props) {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ country, setCountry ] = useState('');
	const [ region, setRegion ] = useState('');
	const divStyle = {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItem: 'center',
		justifyContent: 'center'
	};
	const layout = {
		labelCol: { span: 4, offset: 4 },
		wrapperCol: { span: 10 }
	};
	const tailLayout = {
		wrapperCol: {
			span: 12,
			offset: 8
		}
	};
	const onFinish = async (values) => {
		setIsLoading(true);
		const finalValues = {
			...values,
			'date-picker': values['date-picker'].format('DD-MM-YYYY')
		};
		console.log(finalValues);
		const res = await axios.post('http://localhost:5000/signup', {
			username: values['username'],
			email: values['email'],
			password: values['password'],
			dateOfBirth: values['date-picker'],
			type: values['type'],
			phone: values['phone'],
			withCredentials: true
		});
		setIsLoading(false);
		console.log(res);
		if (res.data.success) {
			console.log(res.data);
			props.history.push('/login');
		} else {
			const message = res.data.message;
			notification.error({ message });
		}
	};
	const onFinishFailed = (err) => {
		console.error(err);
	};
	const handleLogin = () => {
		props.history.push('/login');
	};

	return (
		<div style={{ ...divStyle }}>
			<Card style={{ minWidth: '300px', width: '50%', margin: '0 auto' }}>
				<Form
					name="signUpForm"
					{...layout}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					xs={{ span: 12 }}
					md={{ span: 24 }}
				>
					<Form.Item
						label="Username"
						name="username"
						rules={[ { required: true, message: 'Username cannot be empty' } ]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ type: 'email', message: 'Enter a valid email adddress' },
							{ required: true, message: 'Email cannot be empty' }
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Password"
						name="password"
						rules={[
							{ min: 6, message: 'Minimum 6 characters' },
							{ required: true, message: 'Password cannot be empty' }
						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						rules={[ { required: true, message: 'This field is required' } ]}
						name="type"
						label="Type"
					>
						<Select defaultValue="student" style={{ width: 150 }}>
							<Option value="student">Student</Option>
							<Option value="professor">Professor</Option>
							<Option value="admin">Admin</Option>
						</Select>
					</Form.Item>
					<Form.Item
						label="Date of Birth"
						rules={[ { required: true, message: 'DOB is required' } ]}
						name="date-picker"
					>
						<DatePicker style={{ width: 150 }} />
					</Form.Item>
					<Form.Item
						label="Phone"
						rules={[ { type: 'number', required: true, message: 'Enter your phone number' } ]}
						name="phone"
					>
						<InputNumber style={{ width: 150 }} min={0} maxLength={12} />
					</Form.Item>
					{/* <Form.Item>
					<CountryDropdown
							value={country}
							onChange={(val) => setCountry(val)} />
					<RegionDropdown
							country={country}
							value={region}
							onChange={(val) => setRegion(val)} />
					</Form.Item> */}
					<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit" style={{ marginRight: '10px' }} loading={isLoading}>
							Register
						</Button>
						<span className="ant-form-text">Already a user?</span>
						<Button type="link" onClick={handleLogin} style={{ paddingLeft: 0 }}>
							Log in
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
}

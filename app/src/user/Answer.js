import React, { createElement, useState } from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
	<List
		dataSource={comments}
		header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
		itemLayout="horizontal"
		renderItem={(props) => <Comment {...props} />}
	/>
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
	<div>
		<Form.Item>
			<TextArea rows={4} onChange={onChange} value={value} />
		</Form.Item>
		<Form.Item>
			<Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
				Submit Answer
			</Button>
		</Form.Item>
	</div>
);

class Answer extends React.Component {
	state = {
		comments: [],
		submitting: false,
		value: ''
	};

	handleSubmit = () => {
		if (!this.state.value) {
			return;
		}

		this.setState({
			submitting: true
		});

		setTimeout(() => {
			this.setState({
				submitting: false,
				value: '',
				comments: [
					{
						author: 'Han Solo',
						icon: <UserOutlined />,
						content: <p>{this.state.value}</p>,
						datetime: moment().fromNow()
					},
					...this.state.comments
				]
			});
		}, 1000);
	};

	handleChange = (e) => {
		this.setState({
			value: e.target.value
		});
	};

	render() {
		const { comments, submitting, value } = this.state;

		return (
			<div>
				{comments.length > 0 && <CommentList comments={comments} />}
				<Comment
					avatar={<Avatar style={{ backgroundColor: 'rgb(24, 144, 255)' }}>U</Avatar>}
					content={
						<Editor
							onChange={this.handleChange}
							onSubmit={this.handleSubmit}
							submitting={submitting}
							value={value}
						/>
					}
				/>
			</div>
		);
	}
}

export default Answer;

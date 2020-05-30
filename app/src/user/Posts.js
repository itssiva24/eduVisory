import React, { createElement, useState } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, UserOutlined } from '@ant-design/icons';

const Posts = () => {
	const [ likes, setLikes ] = useState(0);
	const [ dislikes, setDislikes ] = useState(0);
	const [ action, setAction ] = useState(null);

	const like = () => {
		setLikes(1);
		setDislikes(0);
		setAction('liked');
	};

	const dislike = () => {
		setLikes(0);
		setDislikes(1);
		setAction('disliked');
	};

	const actions = [
		<span key="comment-basic-like">
			<Tooltip title="Like">
				{createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
					onClick: like
				})}
			</Tooltip>
			<span className="comment-action">{likes}</span>
		</span>,
		<span key=" key=&quot;comment-basic-dislike&quot;">
			<Tooltip title="Dislike">
				{React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined, {
					onClick: dislike
				})}
			</Tooltip>
			<span className="comment-action">{dislikes}</span>
		</span>,
		<span key="comment-basic-reply-to">Reply to</span>
	];

	return (
		<Comment
			actions={actions}
			author={
				<a>
					<b>Gate Aspirant</b>
				</a>
			}
			avatar={<Avatar icon={<UserOutlined />} alt="Siva" style={{ backgroundColor: 'rgb(24, 144, 255)' }} />}
			content={<p>What is the best college for my GATE score?</p>}
			datetime={
				<Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
					<span>{moment().fromNow()}</span>
				</Tooltip>
			}
		/>
	);
};
export default Posts;

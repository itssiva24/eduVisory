import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './index.css';
import Posts from './Posts';
import Answer from './Answer';
import axios from 'axios';
import { Layout, Menu, PageHeader, Button, Spin, Space } from 'antd';
import { UserOutlined, SettingOutlined, EditOutlined, SolutionOutlined, PoweroffOutlined } from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

export default function Forum(props) {
	const history = useHistory();
	const [ isPageLoading, setIsPageLoading ] = useState(true);
	const [ openKey, setOpenKey ] = useState('1');
	useEffect(
		() => {
			async function fetchData() {
				const response = await axios.get('http://localhost:5000/auth/user', { withCredentials: true });
				if (response.data.isAuthenticated === false) {
					props.history.push('/login');
				}
				setIsPageLoading(false);
				console.log('Username:', response.data);
				console.log(response.data.isAuthenticated);
			}
			fetchData();
		},
		[ history ]
	);
	return (
		<Spin spinning={isPageLoading} className="full-layout">
			{!isPageLoading ? (
				<Layout className="full-layout">
					<Sider
						className="sidebar"
						breakpoint="lg"
						collapsedWidth="0"
						onBreakpoint={(broken) => {
							console.log(broken);
						}}
						onCollapse={(collapsed, type) => {
							console.log(collapsed, type);
						}}
					>
						<div className="logo"> EduVisory</div>
						<Menu theme="dark" mode="inline" defaultOpenKeys={[ openKey ]}>
							<SubMenu key="0" icon={<UserOutlined />} title="My Profile">
								<Menu.Item key="01">Tom</Menu.Item>
								<Menu.Item key="02">Bill</Menu.Item>
								<Menu.Item key="03">Alex</Menu.Item>
							</SubMenu>
							<SubMenu key="1" icon={<UserOutlined />} title="Discussions">
								<Menu.Item key="11">GATE</Menu.Item>
								<Menu.Item key="12">GRE</Menu.Item>
								<Menu.Item key="13">CAT</Menu.Item>
								<Menu.Item key="14">GMAT</Menu.Item>
								<Menu.Item key="15">TOEFL</Menu.Item>
								<Menu.Item key="16">IELTS</Menu.Item>
							</SubMenu>
							<Menu.Item key="2" icon={<EditOutlined />}>
								Ask a question
							</Menu.Item>
							<Menu.Item key="3" icon={<SettingOutlined />}>
								Settings
							</Menu.Item>
						</Menu>
					</Sider>

					<Layout>
						<PageHeader
							className="site-page-header"
							title="GATE 2021"
							subTitle="Public Thread"
							extra={[
								<Button key="1" type="default" danger>
									<PoweroffOutlined />Logout
								</Button>
							]}
						/>
						<Content style={{ margin: '24px 16px 0' }}>
							<div className="site-layout-background" style={{ padding: 24, height: '100%' }}>
								<Posts />
								<Answer />
							</div>
						</Content>
						<Footer style={{ textAlign: 'center' }}>EduVisory ©2020 Created by Backend Team</Footer>
					</Layout>
				</Layout>
			) : null}
		</Spin>
	);
}

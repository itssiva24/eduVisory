import React from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const BASE_URL = 1 ? 'http://localhost:5000' : 'http://www.eduvisory.com';

export async function loginHandler(email, password) {
	const response = await axios.post(`${BASE_URL}/login`, { email: email, password: password, withCredentials: true });
	return response.data;
}

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const client = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

const withAuth = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const authAPI = {
	register: async (userData) => {
		const res = await client.post('/auth/register', userData);
		return res.data;
	},

  activateInvite: async (data) => {
    const res = await client.post('/auth/activate', data);
    return res.data;
  },

  login: async (data) => {
    const res = await client.post('/auth/login', data);
    return res.data;
  },

	updateProfile: async (userId, data, token) => {
		// backend expects PUT /auth/me for current user
		const res = await client.put('/auth/me', data, withAuth(token));
		return res.data;
	},

	changePassword: async (data, token) => {
		const res = await client.post('/auth/change-password', data, withAuth(token));
		return res.data;
	},

	logout: async (token) => {
		const res = await client.post('/auth/logout', {}, withAuth(token));
		return res.data;
	},

	refresh: async (refreshToken) => {
		// If backend expects refresh token in body
		try {
			const res = await client.post('/auth/refresh', { refreshToken });
			return res.data;
		} catch (err) {
			// Fallback: call without body (cookie-based refresh)
			const res = await client.post('/auth/refresh');
			return res.data;
		}
	}
};

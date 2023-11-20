const BASE = "http://localhost:6767/api/v1";

export const ENDPOINTS = {
	USERS: {
		GET_TOKEN: `${BASE}/users/token`,
		_BASE: `${BASE}/users`,
	},
	ARTICLES: {
		_BASE: `${BASE}/articles`,
		_OPERATE_BY_ID: (id: Number) => `${BASE}/articles/${id}`,
	},
};

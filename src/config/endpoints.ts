const BASE = "http://localhost:6767/api/v1";

export const ENDPOINTS = {
	USERS: {
		GET_TOKEN: `${BASE}/users/token`,
		CREATE: `${BASE}/users`,
	},
	ARTICLES: {
		GET_LIST: `${BASE}/articles`,
		DELETE: (id: Number) => `${BASE}/articles/${id}`,
	},
};

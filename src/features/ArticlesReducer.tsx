const GET_ARTICLES = "GET_ARTICLES";

const initialState = {
	articles: [],
};

function _getArticles(data: any) {
	return {
		type: GET_ARTICLES,
		payload: data,
	};
}

export function ArticleReducer(state = initialState, action: any) {
	const { type, payload } = action;
	switch (type) {
		case GET_ARTICLES:
			return {
				...state,
				token: payload,
			};

		default:
			return state;
	}
}

export function getArticles(list: any) {
	return _getArticles(list);
}

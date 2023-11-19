/** Define actions */
const GET_ARTICLES = "GET_ARTICLES";


/** Define initial state */
const initialState = {
	articles: [],
	
};

/** Create reducer actions & associated payload for action */
function _getArticles(data:any) {
	return {
		type: GET_ARTICLES,
		payload: data,
	};
}


/** Create Reducer and handle actions */
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

/** Create Dispatchers */
export function getArticles(list: any) {
	return _getArticles(list);
}

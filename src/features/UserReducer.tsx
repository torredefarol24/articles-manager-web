/** Define actions */
const SET_TOKEN = "SET_TOKEN";
const SET_TOKENFOR = "SET_TOKENFOR";

/** Define initial state */
const initialState = {
	token: null,
	tokenFor: null,
};

/** Create reducer actions & associated payload for action */
function _seTToken(data: any) {
	return {
		type: SET_TOKEN,
		payload: data,
	};
}

function _seTTokenFor(data: any) {
	return {
		type: SET_TOKENFOR,
		payload: data,
	};
}

/** Create Reducer and handle actions */
export function UserReducer(state = initialState, action: any) {
	const { type, payload } = action;
	switch (type) {
		case SET_TOKEN:
			return {
				...state,
				token: payload,
			};
		case SET_TOKENFOR:
			return {
				...state,
				tokenFor: payload,
			};
		default:
			return state;
	}
}

/** Create Dispatchers */
export function setToken(token: any) {
	return _seTToken(token);
}

export function setTokenFor(tokenFor: any) {
	return _seTTokenFor(tokenFor);
}

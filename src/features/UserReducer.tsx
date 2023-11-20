const SET_TOKEN = "SET_TOKEN";
const SET_TOKEN_FOR = "SET_TOKEN_FOR";
const SET_USER_ID = "SET_USER_ID";

const initialState = {
	token: null,
	tokenFor: null,
	userId: null,
};

function _setToken(data: string) {
	return {
		type: SET_TOKEN,
		payload: data,
	};
}

function _setTokenFor(data: string) {
	return {
		type: SET_TOKEN_FOR,
		payload: data,
	};
}

function _setUserId(data: number) {
	return {
		type: SET_USER_ID,
		payload: data,
	};
}

export function UserReducer(state = initialState, action: any) {
	const { type, payload } = action;
	switch (type) {
		case SET_TOKEN:
			return {
				...state,
				token: payload,
			};
		case SET_TOKEN_FOR:
			return {
				...state,
				tokenFor: payload,
			};
		case SET_USER_ID:
			return {
				...state,
				userId: payload,
			};
		default:
			return state;
	}
}

export function setToken(token: string) {
	return _setToken(token);
}

export function setTokenFor(tokenFor: string) {
	return _setTokenFor(tokenFor);
}

export function setUserId(userId: number) {
	return _setUserId(userId);
}

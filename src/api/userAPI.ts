import axios from "axios";
import { ENDPOINTS } from "../config/endpoints";

export async function getToken(tokenFor: string) {
	const url = `${ENDPOINTS.USERS.GET_TOKEN}?tokenFor=${tokenFor}`;
	try {
		const resp = await axios.get(url);
		return {
			token: resp.data.data.token,
			userId: resp.data.data.userId,
		};
	} catch (err) {
		console.error(url, err);
	}
}

export async function createUser(data: any) {
	const url = `${ENDPOINTS.USERS._BASE}`;
	try {
		const resp = await axios.post(url, data);
		return resp.data.data.user.userId;
	} catch (err) {
		console.error(url, err);
	}
}

export const USER_APIS = {
	getToken: (tokenFor: string) => getToken(tokenFor),
	createUser,
};

import axios from "axios";
import { ENDPOINTS } from "../config/endpoints";

export async function getToken(tokenFor: string) {
	const url = `${ENDPOINTS.USERS.GET_TOKEN}?tokenFor=${tokenFor}`;
	try {
		const resp = await axios.get(url);
		return resp.data.data.token;
	} catch (err) {
		console.error(url, err);
	}
}

export async function create(data: any) {
	const url = `${ENDPOINTS.USERS.CREATE}`;
	try {
		const resp = await axios.post(url, {
			username: data.username,
			type: data.type,
		});
		return resp.data.data.user.userId;
	} catch (err) {
		console.error(url, err);
	}
}

export const USER_APIS = {
	getToken: (tokenFor: string) => getToken(tokenFor),
	create,
};

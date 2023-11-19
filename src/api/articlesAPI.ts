import axios from "axios";
import { ENDPOINTS } from "../config/endpoints";
import { store } from "../store/store";

const TOKEN = store.getState().User.token;

export async function getArticles() {
	const url = `${ENDPOINTS.ARTICLES.GET_LIST}`;
	try {
		const resp = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			},
		});
		return resp.data.data.articles;
	} catch (err) {
		console.error(url, err);
	}
}

export async function deleteArticle(id: Number) {
	const url = `${ENDPOINTS.ARTICLES.DELETE(id)}`;
	try {
		const resp = await axios.delete(url, {
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			},
		});
		return resp.status;
	} catch (err) {
		console.error(url, err);
	}
}

export const ARTICLES_APIS = {
	getArticles,
	deleteArticle,
};

import axios from "axios";
import { ENDPOINTS } from "../config/endpoints";
import { store } from "../store/store";

const TOKEN = store.getState().User.token;
const HEADERS = {
	headers: {
		Authorization: `Bearer ${TOKEN}`,
	},
};

export async function getArticles() {
	const url = `${ENDPOINTS.ARTICLES._BASE}`;
	try {
		const resp = await axios.get(url, HEADERS);
		return resp.data.data.articles;
	} catch (err) {
		console.error(url, err);
	}
}

export async function deleteArticle(id: Number) {
	const url = `${ENDPOINTS.ARTICLES._OPERATE_BY_ID(id)}`;
	try {
		const resp = await axios.delete(url, HEADERS);
		return resp.status;
	} catch (err) {
		console.error(url, err);
	}
}

export async function getArticleById(id: Number) {
	const url = `${ENDPOINTS.ARTICLES._OPERATE_BY_ID(id)}`;
	try {
		const resp = await axios.get(url, HEADERS);
		return resp.data.data.article;
	} catch (err) {
		console.error(url, err);
	}
}

export async function createArticle(data: any) {
	const url = `${ENDPOINTS.ARTICLES._BASE}`;
	try {
		const resp = await axios.post(url, data, HEADERS);
		return resp.data.data.article.articleId;
	} catch (err) {
		console.error(url, err);
	}
}

export async function updateArticle(id: Number, data: any) {
	const url = `${ENDPOINTS.ARTICLES._OPERATE_BY_ID(id)}`;
	try {
		const resp = await axios.patch(url, data, HEADERS);
		return resp.data.data.article.articleId;
	} catch (err) {
		console.error(url, err);
	}
}

export async function publishArticle(id: Number, data: any) {
	const url = `${ENDPOINTS.ARTICLES._OPERATE_BY_ID(id)}`;
	try {
		const resp = await axios.put(url, data, HEADERS);
		return resp.data.data.article.articleId;
	} catch (err) {
		console.error(url, err);
	}
}

export const ARTICLES_APIS = {
	getArticles,
	getArticleById,
	deleteArticle,
	createArticle,
	updateArticle,
	publishArticle,
};

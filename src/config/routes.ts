export const ROUTES = {
	HOME: {
		PATH: "/",
		NAME: "Home",
	},
	USERS: {
		PATH: "/users",
		NAME: "User",
	},
	GET_ARTICLES: {
		PATH: "/articles",
		NAME: "Articles",
	},
	CREATE_ARTICLES: {
		PATH: "/articles/new",
		NAME: "",
	},
	GET_ARTICLE_BY_ID: {
		PATH: "/articles/details/:articleId",
		PATH_FOR_NAV: "/articles/details",
		NAME: "",
	},
	EDIT_ARTICLE_BY_ID: {
		PATH: "/articles/edit/:articleId",
		PATH_FOR_NAV: "/articles/edit",
		NAME: "",
	},
};

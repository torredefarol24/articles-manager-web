import { ROUTES } from "../../config/routes";
import { ArticleCreateElement } from "../articles/Create";
import { ArticleDetailElement } from "../articles/Detail";
import { ArticleEditElement } from "../articles/Edit";
import { ArticlesListElement } from "../articles/List";
import { HomeElement } from "../home/Home";
import { UserTokenElement } from "../users/UserToken";

// Mapping of 
// Paths, Route names to their 
// Respective Component that would render

export function Routing() {
	return [
		{
			path: ROUTES.HOME.PATH,
			element: <HomeElement />,
			name: ROUTES.HOME.NAME,
		},
		{
			path: ROUTES.USERS.PATH,
			element: <UserTokenElement />,
			name: ROUTES.USERS.NAME,
		},
		{
			path: ROUTES.GET_ARTICLES.PATH,
			element: <ArticlesListElement />,
			name: ROUTES.GET_ARTICLES.NAME,
		},
		{
			path: ROUTES.CREATE_ARTICLES.PATH,
			element: <ArticleCreateElement />,
			name: ROUTES.CREATE_ARTICLES.NAME,
		},
		{
			path: ROUTES.GET_ARTICLE_BY_ID.PATH,
			element: <ArticleDetailElement />,
			name: ROUTES.GET_ARTICLE_BY_ID.NAME,
		},
		{
			path: ROUTES.EDIT_ARTICLE_BY_ID.PATH,
			element: <ArticleEditElement />,
			name: ROUTES.EDIT_ARTICLE_BY_ID.NAME,
		},
	];
}

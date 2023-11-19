import { ROUTES } from "../../config/routes";
import { ArticlesListElement } from "../articles/List";
import { HomeElement } from "../home/Home";
import { UserTokenElement } from "../users/UserToken";

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
			path: ROUTES.ARTICLES.PATH,
			element: <ArticlesListElement />,
			name: ROUTES.ARTICLES.NAME,
		},
	];
}

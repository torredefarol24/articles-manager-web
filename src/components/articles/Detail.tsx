import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ARTICLES_APIS } from "../../api/articlesAPI";
import { ARTICLE_STATUS } from "../../config/enums";
import { GoBack, Spacer } from "../common/_Comps";

export function ArticleDetailElement() {
	const [article, setArticle] = useState({
		title: "",
		content: "",
		status: "",
		user: {
			username: "",
		},
		createdAt: "",
	});
	const [statusBG, setStatusBG] = useState("");
	const [statusTX, setStatusTX] = useState("");
	const params: any = useParams();

	// Fetching the Article by API call,
	// Can be also done by passing the article itself as a prop
	async function getArticle() {
		try {
			const article = await ARTICLES_APIS.getArticleById(params.articleId);
			setArticle(article);
		} catch (err) {
			console.error(err);
		}
	}

	// Method to interpret article status
	function getStatusColors() {
		switch (article.status) {
			case ARTICLE_STATUS.PUBLISHED:
				setStatusBG("bg-success");
				setStatusTX("text-white");
				break;
			case ARTICLE_STATUS.PENDING:
				setStatusBG("bg-warning");
				setStatusTX("text-dark");
				break;
			case ARTICLE_STATUS.REJECTED:
				setStatusBG("bg-danger");
				setStatusTX("text-white");
				break;
		}
	}

	useEffect(() => {
		getArticle();
		getStatusColors();
	}, []);

	return (
		<div className="row">
			<GoBack />

			{/* 
			Article Details 
			 */}
			<div className="row">
				<div className="col-sm-6">
					<h1>{article.title}</h1>
					<p>{article && "Written By: " + article.user.username} </p>
					<p>{article && "On: " + new Date(article.createdAt).toDateString()} </p>
				</div>
				<div className="col-sm-6 position-relative pd0">
					<div
						className={
							statusBG + " col-sm-3 text-center pd20 position-absolute top-0 end-0 border-zero"
						}
					>
						<strong className={statusTX}>{article.status.toUpperCase()}</strong>
					</div>
				</div>
			</div>

			<Spacer height={50} />
			<div className="row">
				<h3>{article.content}</h3>
			</div>
		</div>
	);
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ARTICLES_APIS } from "../../../api/articlesAPI";
import { ARTICLE_STATUS } from "../../../config/enums";
import { ROUTES } from "../../../config/routes";
import { GoBack } from "../../common/_Comps";

export function AdminUpdateView() {
	const params: any = useParams();
	const navigate = useNavigate();

	const [article, setArticle] = useState({
		title: "",
		content: "",
		status: "",
	});
	const [title, setTitle] = useState(article.title);
	const [content, setContent] = useState(article.content);
	const [status, setStatus] = useState(article.status);

	async function getArticle() {
		try {
			const article = await ARTICLES_APIS.getArticleById(params.articleId);
			setTitle(article.title);
			setContent(article.content);
			setStatus(article.status);
		} catch (err) {
			console.error(err);
		}
	}

	async function handleArticleUpdate(e: any) {
		try {
			e.preventDefault();
			const artcicleId = await ARTICLES_APIS.publishArticle(params.articleId, { status });
			if (artcicleId) {
				navigate(ROUTES.GET_ARTICLES.PATH);
			}
		} catch (e) {
			console.error(e);
		}
	}

	useEffect(() => {
		getArticle();
	}, []);

	return (
		<div className="row">
			<GoBack />
			<div className="col-sm-6">
				<form onSubmit={handleArticleUpdate}>
					<div className="mb-3">
						<label htmlFor="title" className="form-label">
							Title
						</label>
						<input
							type="text"
							className="form-control border-zero"
							id="title"
							// onChange={(e) => setTitle(e.target.value)}
							value={title}
							disabled={true}
							minLength={3}
							maxLength={100}
							contentEditable={true}
							placeholder="Article title goes here..."
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="content" className="form-label">
							Content
						</label>
						<input
							type="text"
							className="form-control border-zero"
							// onChange={(e) => setContent(e.target.value)}
							value={content}
							disabled={true}
							id="content"
							placeholder="The content ... "
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="status" className="form-label">
							Status
						</label>
						<input
							className="form-control border-zero"
							onChange={(e) => setStatus(e.target.value)}
							value={status}
							id="status"
							placeholder="published / rejected / pending "
						/>
					</div>

					<button type="submit" className="btn btn-success border-zero">
						Update
					</button>
				</form>
			</div>
		</div>
	);
}

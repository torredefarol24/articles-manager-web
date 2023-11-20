import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ARTICLES_APIS } from "../../../api/articlesAPI";
import { ROUTES } from "../../../config/routes";
import { GoBack } from "../../common/_Comps";

export function ContentCreatorEditView() {
	const params: any = useParams();
	const navigate = useNavigate();

	const [article, setArticle] = useState({
		title: "",
		content: "",
	});
	const [title, setTitle] = useState(article.title);
	const [content, setContent] = useState(article.content);

	async function getArticle() {
		try {
			const article = await ARTICLES_APIS.getArticleById(params.articleId);
			setTitle(article.title);
			setContent(article.content);
		} catch (err) {
			console.error(err);
		}
	}

	async function handleArticleEdit(e: any) {
		try {
			e.preventDefault();
			const artcicleId = await ARTICLES_APIS.updateArticle(params.articleId, { title, content });
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
				<form onSubmit={handleArticleEdit}>
					<div className="mb-3">
						<label htmlFor="title" className="form-label">
							Title
						</label>
						<input
							type="text"
							className="form-control border-zero"
							id="title"
							onChange={(e) => setTitle(e.target.value)}
							value={title}
							minLength={3}
							maxLength={100}
							placeholder="Your article title goes here..."
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="content" className="form-label">
							Content
						</label>
						<input
							type="text"
							className="form-control border-zero"
							onChange={(e) => setContent(e.target.value)}
							value={content}
							id="content"
							minLength={3}
							maxLength={100}
							placeholder="The content ... "
						/>
					</div>
					<button type="submit" className="btn btn-success border-zero">
						Edit
					</button>
				</form>
			</div>
		</div>
	);
}

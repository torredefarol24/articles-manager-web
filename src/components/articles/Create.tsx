import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ARTICLES_APIS } from "../../api/articlesAPI";
import { ROUTES } from "../../config/routes";
import { GoBack } from "../common/_Comps";

export function ArticleCreateElement() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const navigate = useNavigate();

	async function handleArticleCreation(e: any) {
		try {
			e.preventDefault();
			const artcicleId = await ARTICLES_APIS.createArticle({ title, content });
			if (artcicleId) {
				navigate(ROUTES.GET_ARTICLES.PATH);
			}
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div className="row">
			<GoBack />
			<div className="col-sm-6">
				<form onSubmit={handleArticleCreation}>
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
							// disabled={isDisabled}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="content" className="form-label">
							Content
						</label>
						<textarea
							className="form-control border-zero"
							onChange={(e) => setContent(e.target.value)}
							value={content}
							id="content"
							placeholder="The content ... "
							// disabled={isDisabled}
						/>
					</div>
					<button
						type="submit"
						className="btn btn-success border-zero"
						// disabled={isDisabled}
					>
						Create
					</button>
				</form>
			</div>
		</div>
	);
}

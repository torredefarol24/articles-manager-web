import { useEffect, useState } from "react";
import { ARTICLES_APIS } from "../../api/articlesAPI";
import { ARTICLE_STATUS } from "../../config/enums";
import { Spacer } from "../common/Spacer";

function AdminTable(props: any) {
	async function handleDelete(id: Number) {
		try {
			await ARTICLES_APIS.deleteArticle(id);
		} catch (err) {
			console.error(err);
		}
	}

	const Table = (
		<div className="row">
			<h3>
				<Spacer height={30} />
				{props.status.toUpperCase()} <strong>{props.list.length} Items</strong>
			</h3>
			<table className="table table-striped table-bordered table-hover">
				<thead>
					<tr>
						<th style={{ width: 10 }}>Article ID</th>
						<th style={{ width: 60 }}>Title</th>
						<th style={{ width: 5 }}>Creator</th>
						<th style={{ width: 10 }}>Created At</th>
						<th style={{ width: 5 }}>Delete</th>
					</tr>
				</thead>
				<tbody>
					{props.list.map((item: any) => {
						return (
							<tr>
								<td>{item.articleId}</td>
								<td>{item.title}</td>
								<td>{item.user.username}</td>
								<td>{new Date(item.createdAt).toDateString()}</td>
								<td>
									<button
										type="button"
										className="btn btn-sm btn-danger"
										onClick={(e) => handleDelete(item.articleId)}
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
	return Table;
}

export function AdminView() {
	const [pendingList, setPendingList] = useState([]);
	const [rejectedList, setRejectedList] = useState([]);
	const [publishedList, setPublishedList] = useState([]);

	async function getAllArticles() {
		try {
			const _list = await ARTICLES_APIS.getArticles();
			setPendingList(_list.filter((item: any) => item.status === ARTICLE_STATUS.PENDING));
			setRejectedList(_list.filter((item: any) => item.status === ARTICLE_STATUS.REJECTED));
			setPublishedList(_list.filter((item: any) => item.status === ARTICLE_STATUS.PUBLISHED));
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getAllArticles();
	}, [pendingList, rejectedList, publishedList]);

	return (
		<div className="row">
			<AdminTable status={ARTICLE_STATUS.PENDING} list={pendingList} />
			<AdminTable status={ARTICLE_STATUS.REJECTED} list={rejectedList} />
			<AdminTable status={ARTICLE_STATUS.PUBLISHED} list={publishedList} />
		</div>
	);
}

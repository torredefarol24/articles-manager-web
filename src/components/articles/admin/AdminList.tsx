import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ARTICLES_APIS } from "../../../api/articlesAPI";
import { ARTICLE_STATUS } from "../../../config/enums";
import { ROUTES } from "../../../config/routes";
import { Spacer } from "../../common/_Comps";

function TableHeader() {
	return (
		<thead>
			<tr>
				<th className="th-w50">Article ID</th>
				<th className="th-w500">Title</th>
				<th className="text-center th-w50">Creator</th>
				<th className="text-center th-w100">Created At</th>
				<th className="text-center th-w50">Details</th>
				<th className="text-center th-w50">Status</th>
				<th className="text-center th-w50">Delete</th>
			</tr>
		</thead>
	);
}

// Component that displays information of the articles
// For all users, and allows all functionalities

function TableRow(props: any) {
	const navigate = useNavigate();
	async function handleDelete(id: Number) {
		try {
			await ARTICLES_APIS.deleteArticle(id);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<tr>
			<td>{props.item.articleId}</td>
			<td>{props.item.title}</td>
			<td className="text-center">{props.item.user.username}</td>
			<td className="text-center">{new Date(props.item.createdAt).toDateString()}</td>
			<td className="text-center">
				<button
					type="button"
					className="btn btn-sm btn-warning"
					onClick={() =>
						navigate(`${ROUTES.GET_ARTICLE_BY_ID.PATH_FOR_NAV}/${props.item.articleId}`)
					}
				>
					Details
				</button>
			</td>
			<td className="text-center">
				<button
					type="button"
					className="btn btn-sm btn-info"
					onClick={() =>
						navigate(`${ROUTES.EDIT_ARTICLE_BY_ID.PATH_FOR_NAV}/${props.item.articleId}`)
					}
				>
					Update
				</button>
			</td>
			<td className="text-center">
				<button
					type="button"
					className="btn btn-sm btn-danger"
					onClick={() => handleDelete(props.item.articleId)}
				>
					Delete
				</button>
			</td>
		</tr>
	);
}

// One reusable component that displays articles of
// All users, only categorized by status

function AdminTable(props: any) {
	return (
		<div className="container" style={{ padding: 0 }}>
			<h3>
				<Spacer height={30} />
				{props.status.toUpperCase()} <strong>{props.list.length} Items</strong>
			</h3>
			<table className="table table-striped table-bordered">
				<TableHeader />
				<tbody>
					{props.list.map((item: any) => {
						return <TableRow item={item} key={item.articleId} />;
					})}
				</tbody>
			</table>
		</div>
	);
}

export function AdminListView() {
	const [pendingList, setPendingList] = useState([]);
	const [rejectedList, setRejectedList] = useState([]);
	const [publishedList, setPublishedList] = useState([]);

	// Fetching list of articles to separate them based on status
	// Eventually, articles would be rendered through a common component
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
	}, []);

	return (
		<div className="row">
			<AdminTable status={ARTICLE_STATUS.PENDING} list={pendingList} />
			<AdminTable status={ARTICLE_STATUS.REJECTED} list={rejectedList} />
			<AdminTable status={ARTICLE_STATUS.PUBLISHED} list={publishedList} />
		</div>
	);
}

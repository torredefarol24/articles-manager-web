import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ARTICLES_APIS } from "../../../api/articlesAPI";
import { ARTICLE_STATUS } from "../../../config/enums";
import { ROUTES } from "../../../config/routes";
import { Spacer } from "../../common/_Comps";

function Heading(props: any) {
	return (
		<h3>
			<Spacer height={60} />
			{props.isMine ? `MY ${props.status.toUpperCase()} ` : "Published By Others "}
			<strong>{props.count} Items</strong>
		</h3>
	);
}

function TableHeader(props: any) {
	return (
		<>
			<th className="th-w50">Article ID</th>
			{!props.isMine && <th className="th-w50">Creator</th>}
			<th className="th-w500">Title</th>
			<th className="text-center th-w100">Created At</th>
			<th className="text-center th-w50">Details</th>
			{props.isMine && <th className="text-center th-w50">Edit</th>}
			{props.isMine && <th className="text-center th-w50">Delete</th>}
		</>
	);
}

// Component that displays information of the articles
// For both the current user and that of other uses
// Based on the user type, functionalities are allowed such as Edit, Delete

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
			{!props.isMine && <td>{props.item.user.username}</td>}
			<td>{props.item.title}</td>
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
			{props.isMine && (
				<td className="text-center">
					<button
						type="button"
						className="btn btn-sm btn-info"
						onClick={() =>
							navigate(`${ROUTES.EDIT_ARTICLE_BY_ID.PATH_FOR_NAV}/${props.item.articleId}`)
						}
					>
						Edit
					</button>
				</td>
			)}
			{props.isMine && (
				<td className="text-center">
					<button
						type="button"
						className="btn btn-sm btn-danger"
						onClick={() => handleDelete(props.item.articleId)}
					>
						Delete
					</button>
				</td>
			)}
		</tr>
	);
}

// One reusable component that should display articles of
// Both the current user's and other users

function Table(props: any) {
	return (
		<div className="container" style={{ padding: 0 }}>
			<Heading isMine={props.isMine} status={props.status} count={props.list.length} />
			<table className="table table-striped table-bordered table-responsive">
				<thead>
					<tr>
						<TableHeader isMine={props.isMine} />
					</tr>
				</thead>
				<tbody>
					{props.list.map((item: any) => {
						return <TableRow isMine={props.isMine} item={item} key={item.articleId} />;
					})}
				</tbody>
			</table>
		</div>
	);
}

export function ContentCreatorListView() {
	const [myPendingList, setMyPendingList] = useState([]);
	const [myPublishedList, setMyPublishedList] = useState([]);
	const [myRejectedList, setMyRejectedList] = useState([]);
	const [othersList, setOthersList] = useState([]);
	const UserReducer = useSelector(({ User }) => User);
	const navigate = useNavigate();

	// Fetching list of articles
	// And separating them based on status
	// Eventually, articles would be rendered through a common component
	async function getAllArticles() {
		try {
			const _list = await ARTICLES_APIS.getArticles();
			setMyPublishedList(
				_list.filter(
					(item: any) =>
						item.user.userId === UserReducer.userId && item.status === ARTICLE_STATUS.PUBLISHED
				)
			);
			setMyRejectedList(
				_list.filter(
					(item: any) =>
						item.user.userId === UserReducer.userId && item.status === ARTICLE_STATUS.REJECTED
				)
			);
			setMyPendingList(
				_list.filter(
					(item: any) =>
						item.user.userId === UserReducer.userId && item.status === ARTICLE_STATUS.PENDING
				)
			);

			setOthersList(_list.filter((item: any) => item.user.userId !== UserReducer.userId));
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getAllArticles();
	}, []);

	return (
		<>
			<div className="row">
				<div className="col-sm-10"></div>
				<div className="col-sm-2 position-relative">
					<button
						type="button"
						className="btn btn-success position-absolute top-0 end-0 border-zero"
						onClick={() => navigate(ROUTES.CREATE_ARTICLES.PATH)}
					>
						Create New Article
					</button>
				</div>
			</div>
			<div className="row">
				<Table status={ARTICLE_STATUS.PENDING} list={myPendingList} isMine={true} />
				<Table status={ARTICLE_STATUS.REJECTED} list={myRejectedList} isMine={true} />
				<Table status={ARTICLE_STATUS.PUBLISHED} list={myPublishedList} isMine={true} />
				<Table list={othersList} isMine={false} />
			</div>
		</>
	);
}

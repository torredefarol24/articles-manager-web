import { useState } from "react";
import { useDispatch } from "react-redux";
import { USER_APIS } from "../../api/userAPI";
import { USER_TYPES } from "../../config/enums";
import { setToken, setTokenFor } from "../../features/UserReducer";
import { Spacer } from "../common/Spacer";
import { CreateUser } from "./CreateUser";

export function UserTokenElement() {
	const [adminToken, setAdminToken] = useState("");
	const [contentCreatorToken, setContentCreatorToken] = useState("");
	const dispatch = useDispatch();

	async function getAdminToken() {
		try {
			const token: any = await USER_APIS.getToken(USER_TYPES.ADMIN);
			dispatch(setToken(token));
			dispatch(setTokenFor(USER_TYPES.ADMIN));
			setAdminToken(token);
		} catch (err) {
			console.log(err);
		}
	}

	async function getContentCreatorToken() {
		try {
			const token: any = await USER_APIS.getToken(USER_TYPES.CONTENT_CREATOR);
			dispatch(setToken(token));
			dispatch(setTokenFor(USER_TYPES.CONTENT_CREATOR));
			setContentCreatorToken(token);
		} catch (err) {
			console.log(err);
		}
	}

	const AdminComp = (
		<>
			<button type="button" className="btn btn-warning" onClick={getAdminToken}>
				Get Admin Token Now
			</button>
			<Spacer height={30} />
			<strong>{adminToken ? adminToken.toString().substring(0, 50) + "..." : ""}</strong>
		</>
	);

	const ContentCreatorComp = (
		<>
			<button type="button" className="btn btn-warning" onClick={getContentCreatorToken}>
				Get Content-Creator Token Now
			</button>
			<Spacer height={30} />
			<strong>
				{contentCreatorToken ? contentCreatorToken.toString().substring(0, 50) + "..." : ""}
			</strong>
		</>
	);

	const Content = (
		<div className="row">
			<Spacer height={50} />
			<div className="col-sm-12">
				<h3>1. Create A User</h3>
				<Spacer height={20} />
				<div className="col-sm-4">
					<CreateUser />
				</div>
			</div>
			<Spacer height={50} />
			<div className="col-sm-12">
				<h3>2. Set User Token</h3>
			</div>
			<Spacer height={30} />
			<div className="col-sm-6">{AdminComp}</div>
			<div className="col-sm-6">{ContentCreatorComp}</div>
		</div>
	);

	return Content;
}

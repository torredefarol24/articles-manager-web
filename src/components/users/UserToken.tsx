import { useState } from "react";
import { useDispatch } from "react-redux";
import { USER_APIS } from "../../api/userAPI";
import { USER_TYPES } from "../../config/enums";
import { setToken, setTokenFor, setUserId } from "../../features/UserReducer";
import { Spacer } from "../common/_Comps";
import { CreateUser } from "./CreateUser";

function UserToken(props: any) {
	return (
		<>
			<button type="button" className="btn btn-warning border-zero" onClick={props.onClick}>
				Get <strong>{props.tokenFor.toUpperCase()}</strong> Token Now
			</button>
			<Spacer height={30} />
			<p>{props.token ? props.token.toString().substring(0, 50) + "..." : ""}</p>
		</>
	);
}

export function UserTokenElement() {
	const [adminToken, setAdminToken] = useState("");
	const [contentCreatorToken, setContentCreatorToken] = useState("");
	const dispatch = useDispatch();

	async function getToken(tokenType: string) {
		try {
			const { token, userId }: any = await USER_APIS.getToken(tokenType);
			dispatch(setToken(token));
			dispatch(setUserId(userId));
			dispatch(setTokenFor(tokenType));
			tokenType === USER_TYPES.ADMIN ? setAdminToken(token) : setContentCreatorToken(token);
		} catch (err) {
			console.log(err);
		}
	}

	return (
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
			<div className="col-sm-6">
				<UserToken
					onClick={() => getToken(USER_TYPES.ADMIN)}
					tokenFor={USER_TYPES.ADMIN}
					token={adminToken}
				/>
			</div>
			<div className="col-sm-6">
				<UserToken
					onClick={() => getToken(USER_TYPES.CONTENT_CREATOR)}
					tokenFor={USER_TYPES.CONTENT_CREATOR}
					token={contentCreatorToken}
				/>
			</div>
		</div>
	);
}

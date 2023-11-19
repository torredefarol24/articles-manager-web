import { useState } from "react";
import { useSelector } from "react-redux";
import { USER_APIS } from "../../api/userAPI";

export function CreateUser() {
	const UserReducer = useSelector(({ User }) => User);

	const [username, setUsername] = useState("");
	const [type, setType] = useState("");
	const [isDisabled, setIsDisabled] = useState(UserReducer.token && UserReducer.token.length > 0);

	async function handleUserCreation(e: any) {
		try {
			e.preventDefault();
			const userId = await USER_APIS.create({ username, type });
			setIsDisabled(userId && userId > 0);
		} catch (e) {
			console.error(e);
		}
	}

	const Content = (
		<div>
			{isDisabled && <p>User Created</p>}
			{isDisabled && (
				<p>
					<strong>Please set Token now</strong>
				</p>
			)}

			<form onSubmit={handleUserCreation}>
				<div className="mb-3">
					<label htmlFor="username" className="form-label">
						Username
					</label>
					<input
						type="text"
						className="form-control"
						id="username"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
						placeholder="Type your username here..."
						disabled={isDisabled}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="type" className="form-label">
						Type
					</label>
					<input
						type="text"
						className="form-control"
						onChange={(e) => setType(e.target.value)}
						value={type}
						id="type"
						placeholder="admin / content-creator"
						disabled={isDisabled}
					/>
				</div>
				<button type="submit" className="btn btn-success" disabled={isDisabled}>
					Create
				</button>
			</form>
		</div>
	);

	return Content;
}

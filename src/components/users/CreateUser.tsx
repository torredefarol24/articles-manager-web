import { useState } from "react";
import { USER_APIS } from "../../api/userAPI";

export function CreateUser() {
	const [username, setUsername] = useState("");
	const [type, setType] = useState("");
	const [created, setCreated] = useState(false);

	async function handleUserCreation(e: any) {
		try {
			e.preventDefault();
			const userId = await USER_APIS.createUser({ username, type });
			setCreated(userId && userId > 0);
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div>
			{created && (
				<>
					<p>
						<strong>User Created</strong>.
					</p>
					<p>
						Please set the <strong>{type.toUpperCase()}</strong> token now
					</p>
				</>
			)}

			<form onSubmit={handleUserCreation}>
				<div className="mb-3">
					<label htmlFor="username" className="form-label">
						Username
					</label>
					<input
						type="text"
						className="form-control border-zero"
						id="username"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
						placeholder="Type your username here..."
						// disabled={isDisabled}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="type" className="form-label">
						Type
					</label>
					<input
						type="text"
						className="form-control border-zero"
						onChange={(e) => setType(e.target.value)}
						value={type}
						id="type"
						placeholder="admin / content-creator"
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
	);
}

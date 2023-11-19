import { useSelector } from "react-redux";
import { USER_TYPES } from "../../config/enums";
import { Spacer } from "../common/Spacer";
import { AdminView } from "./AdminList";

function ContentCreatorView() {
	return <div className="row">Content Creator List</div>;
}

export function ArticlesListElement() {
	const UserReducer = useSelector(({ User }) => User);
	return (
		<>
			<Spacer height={30} />
			{UserReducer.tokenFor === USER_TYPES.ADMIN ? <AdminView /> : <ContentCreatorView />}
		</>
	);
}

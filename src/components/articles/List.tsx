import { useSelector } from "react-redux";
import { USER_TYPES } from "../../config/enums";
import { Spacer } from "../common/_Comps";
import { AdminListView } from "./admin/AdminList";
import { ContentCreatorListView } from "./contentCreator/ContentCreatorList";

export function ArticlesListElement() {
	const UserReducer = useSelector(({ User }) => User);
	return (
		<>
			<Spacer height={30} />
			{/* 
				List of Articles displayed according the user type
			 */}
			{UserReducer.tokenFor === USER_TYPES.ADMIN ? <AdminListView /> : <ContentCreatorListView />}
		</>
	);
}

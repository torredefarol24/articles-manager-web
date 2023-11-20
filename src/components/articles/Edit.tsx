import { useSelector } from "react-redux";
import { USER_TYPES } from "../../config/enums";
import { Spacer } from "../common/_Comps";
import { AdminUpdateView } from "./admin/AdminUpdate";
import { ContentCreatorEditView } from "./contentCreator/ContentCreatorEdit";

export function ArticleEditElement() {
	const UserReducer = useSelector(({ User }) => User);
	return (
		<>
			<Spacer height={30} />
			{UserReducer.tokenFor === USER_TYPES.ADMIN ? <AdminUpdateView /> : <ContentCreatorEditView />}
		</>
	);
}

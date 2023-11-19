import { legacy_createStore as createStore } from "redux";
import { rootReducer } from "./rootReducer";

function saveToLocalStorage(state: any) {
	try {
		localStorage.setItem(`ArticlesManagerState`, JSON.stringify(state));
	} catch (err) {
		console.error(err);
	}
}

function loadFromLocalStorage() {
	try {
		const _state = localStorage.getItem(`ArticlesManagerState`);
		return _state ? JSON.parse(_state) : undefined;
	} catch (err) {
		console.error(err);
	}
}

export const store = createStore(rootReducer, loadFromLocalStorage());
store.subscribe(() =>
	saveToLocalStorage({
		User: store.getState().User,
		Article: store.getState().Article,
	})
);

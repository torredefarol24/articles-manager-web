import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Routing } from "./components/common/Routing";
import { Navbar } from "./components/navbar/Navbar";
import { store } from "./store/store";

function App() {
	const routes = Routing();
	const Main = (
		<div className="row">
			<div className="col-sm-12 bg-secondary-subtle">
				<Navbar />
			</div>
			<div className="col-sm-12">
				<Routes>
					{routes.map((route: any) => {
						return <Route path={route.path} element={route.element} key={route.path} />;
					})}
				</Routes>
			</div>
		</div>
	);

	return <Provider store={store}>{Main}</Provider>;
}

export default App;

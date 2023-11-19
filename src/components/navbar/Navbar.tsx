import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Routing } from "../common/Routing";
import "./styles.css";

export function Navbar() {
	const routes = Routing();
	const UserReducer = useSelector(({ User }) => User);

	return (
		<nav className="navbar navbar-expand-lg">
			<Link className="navbar-brand nav-link text-dark" to={"/token"}>
				User: <strong>{`${UserReducer.tokenFor}`.toUpperCase()}</strong>
			</Link>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
					{routes.map((route: any, id: number) => {
						return (
							<li key={id} className="nav-item">
								<Link className="nav-link text-dark" to={route.path}>
									{route.name}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}

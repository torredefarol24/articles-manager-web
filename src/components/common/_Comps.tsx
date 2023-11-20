import { useNavigate } from "react-router-dom";

// Reusable Components

export function Spacer(props: any) {
	return <div style={{ width: `${props.width}px`, height: `${props.height}px` }} />;
}

export function GoBack() {
	const navigate = useNavigate();
	return (
		<div className="row" style={{ marginTop: 30, marginBottom: 30 }}>
			<button
				type="button"
				className="btn btn-primary border-zero "
				onClick={() => navigate(-1)}
				style={{ width: 120 }}
			>
				Go Back
			</button>
		</div>
	);
}

import React from "react";
import { Button, Card } from "@material-ui/core";
import HeaderPage from "./Header";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
	const navigate = useNavigate();
	return (
		<>
			<HeaderPage />
			<div className="HomePage">
				<Card className="HomeCard">
					<span>Admin Panel</span>
					<div>
						<Button
							className="infoBtn"
							variant="contained"
							onClick={() => navigate("../teacher")}
						>
							Teacher Info
						</Button>
						<Button
							className="infoBtn"
							variant="contained"
							onClick={() => navigate("../student")}
						>
							Student Info
						</Button>
					</div>
				</Card>
			</div>
		</>
	);
};

export default HomePage;

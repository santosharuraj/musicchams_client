import React from "react";
import { useParams } from "react-router-dom";
import LoginPage from "./LoginPage";
import NotFound from "./NotFound";
const AuthPage = () => {
	const { route_name } = useParams();

	return (
		<>
			{route_name == "student" ? (
				<LoginPage portal_name="Student Panel" />
			) : route_name == "teacher" ? (
				<LoginPage portal_name="Teacher Panel" />
			) : route_name == "admin" ? (
				<LoginPage portal_name="Admin Panel" />
			) : (
				<NotFound />
			)}
		</>
	);
};

export default AuthPage;

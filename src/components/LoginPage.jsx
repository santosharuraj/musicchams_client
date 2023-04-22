import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});
const LoginPage = ({ portal_name }) => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmitHandler = async (data) => {
		const response = await fetch(
			"https://musicchampsite.onrender.com/api/v1/admin/login",
			{
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(data),
			}
		);
		if (response.status == 200) {
			const data = await response.json();
			localStorage.setItem("user", JSON.stringify(data));
			navigate("../");
			window.location.refresh();
		}
	};
	return (
		<div className="LoginPage">
			<form className="formclass" onSubmit={handleSubmit(onSubmitHandler)}>
				<span>Admin Panel</span>

				<input
					className="userInput"
					{...register("email")}
					placeholder="Email"
					type="email"
				/>
				<p className="errorclass">{errors.email?.message}</p>

				<input
					className="userInput"
					{...register("password")}
					placeholder="password"
					type="password"
				/>
				<p className="errorclass">{errors.password?.message}</p>

				<button className="loginBtn" type="submit">
					Sign in
				</button>
			</form>
		</div>
	);
};

export default LoginPage;

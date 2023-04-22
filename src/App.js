import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import NotFound from "./components/NotFound";
import HomePage from "./components/HomePage";
import TeacherInfoPage from "./components/TeacherInfoPage";
import StudentInfoPage from "./components/StudentInfoPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="*" element={<NotFound />} />{" "}
					<Route exact path="" element={<HomePage />} />{" "}
					<Route exact path="/student" element={<StudentInfoPage />} />{" "}
					<Route exact path="/teacher" element={<TeacherInfoPage />} />{" "}
					<Route path="/auth/login" element={<LoginPage />} />{" "}
				</Routes>{" "}
			</BrowserRouter>{" "}
		</>
	);
}

export default App;

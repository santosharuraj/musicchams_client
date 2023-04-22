import { Button, Card, CircularProgress, Dialog } from "@material-ui/core";
import React, { useEffect } from "react";
import HeaderPage from "./Header";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object().shape({
	courseName: yup.string().required(),
	studentEmail: yup.string().email().required(),
	teacherEmail: yup.string().email().required(),
	day: yup.string().required(),
	time: yup.string().required(),
	noClasses: yup.string().required(),
	studentName: yup.string().required(),
	instrumentName: yup.string().required(),
});
const StudentInfoPage = () => {
	const [open, setOpen] = useState(false);
	const [modalName, setModalName] = useState("");
	const [studentInfo, setStudentInfo] = useState(null);
	const [studentdata, setStudentData] = useState([]);
	const [loading, setLoading] = useState(false);
	const user = JSON.parse(localStorage.getItem("user"));
	const [userId, setUserId] = useState(null);
	const openModal = (value) => {
		setModalName(value);
		setOpen(true);
	};

	useEffect(() => {
		const studentData = async () => {
			setLoading(true);
			const response = await fetch(
				"https://musicchampsite.onrender.com/api/v1/admin/get_all_students",
				{
					method: "GET",
					headers: { "Content-type": "application/json" },
				}
			);
			if (response.status == 200) {
				const data = await response.json();
				setStudentData(data);
			}
			setLoading(false);
		};
		studentData();
	}, []);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmitHandler = async (data) => {
		setLoading(true);

		const response = await fetch(
			`https://musicchampsite.onrender.com/api/v1/admin/create_student/${user._id}`,
			{
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(data),
			}
		);

		if (response.status == 201) {
			const data = await response.json();
			setStudentData([data, ...studentdata]);
		} else {
			console.log(response);
		}
		setOpen(false);
		setLoading(false);
		reset();
	};

	const handleChange = (e) => {
		setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value });
	};
	const handleUpdate = async () => {
		setLoading(true);
		const body = { ...studentInfo, studentId: userId };
		const response = await fetch(
			`https://musicchampsite.onrender.com/api/v1/admin/update_student/${user._id}`,
			{
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(body),
			}
		);

		if (response.status == 200) {
			const data = await response.json();

			const updatedStudentData = studentdata.map((student) =>
				student._id === data._id ? data : student
			);
			setStudentData(updatedStudentData);
		} else {
			console.log(response);
		}
		setOpen(false);
		setLoading(false);
	};
	const handleAction = async (id) => {
		setLoading(true);
		openModal("Action");
		setUserId(id);
		const response = await fetch(
			`https://musicchampsite.onrender.com/api/v1/admin/get_a_student/${id}`,
			{
				method: "GET",
				headers: { "Content-type": "application/json" },
			}
		);

		if (response.status == 200) {
			const data = await response.json();
			setStudentInfo(data);
		} else {
			console.log(response);
		}
		setLoading(false);
	};
	const redirectMethod = (link) => {
		window.open(link, "_blank");
	};
	return (
		<>
			<HeaderPage />
			<div className="StudentInfoClass">
				<div>
					<span>Student Informations</span>
					<div>
						<Button
							onClick={() => openModal("AddStudent")}
							variant="contained"
							className="addStudent"
						>
							Add Student
						</Button>
					</div>
				</div>
				{studentdata != null &&
				studentdata != undefined &&
				studentdata.length > 0 ? (
					studentdata.map((student) => {
						return (
							<>
								<Card className="StudentInfoCard">
									<div>
										<span>{student.studentName}</span>
										<span>{student.studentEmail}</span>
										<span>{student.courseName}</span>
									</div>
									<div>
										<span>Day/Time </span>
										<div>
											<span>Day : {student.day}</span>
											<span>Time :{student.time}</span>
										</div>
									</div>
									<div>
										<span>Classes Completed</span>
										<div>
											<div className="classeAttend">
												<span>
													{student.completedClasses != null &&
													student.completedClasses != undefined
														? student.completedClasses
														: "0"}
												</span>
												<span>/</span>
												<span>{student.noClasses}</span>
											</div>
										</div>
									</div>
									<div>
										<span>Zoom/Gmeet Link</span>
										<div>
											<span>
												{student.meetingLink != undefined &&
												student.meetingLink != null &&
												student.meetingLink != "" ? (
													<span
														onClick={() => redirectMethod(student.meetingLink)}
														style={{ color: "#576cbc", cursor: "pointer" }}
													>
														{student.meetingLink}
													</span>
												) : (
													"No Meet Link at present"
												)}{" "}
											</span>
										</div>
									</div>
									<div>
										<Button
											variant="contained"
											className="addClass"
											onClick={() => handleAction(student._id)}
										>
											Edit
										</Button>
									</div>
								</Card>
							</>
						);
					})
				) : loading ? (
					<CircularProgress />
				) : (
					"No data"
				)}
			</div>
			{modalName == "Action" && (
				<Dialog
					open={open}
					onClose={() => {
						setOpen(false);
						setStudentInfo(null);
					}}
				>
					<div className="openModalForAction">
						<span>Edit Student</span>
						{loading ? (
							<CircularProgress />
						) : (
							<>
								<div>
									<span>Enter Zoom/Gmeet Link</span>
									<input
										className="linkINput"
										type="text"
										placeholder="Enter Zoom/Gmeet Link"
										name="meetingLink"
										id=""
										value={studentInfo && studentInfo.meetingLink}
										onChange={handleChange}
									/>
								</div>
								<div>
									<span>Enter Number of Classes</span>
									<input
										className="linkINput"
										type="text"
										placeholder="Enter Number of Classes"
										name="noClasses"
										id=""
										value={studentInfo && studentInfo.noClasses}
										onChange={handleChange}
									/>
								</div>
								<div>
									<span>Enter Completed Classes</span>
									<input
										className="linkINput"
										type="text"
										placeholder="Enter Completed Classes"
										name="completedClasses"
										id=""
										value={studentInfo && studentInfo.completedClasses}
										onChange={handleChange}
									/>
								</div>

								<button onClick={handleUpdate} className="editSave">
									{loading ? "Saving..." : "Edit Save"}
								</button>
							</>
						)}
					</div>
				</Dialog>
			)}
			{modalName == "AddStudent" && (
				<Dialog
					open={open}
					onClose={() => {
						setOpen(false);
						reset();
					}}
				>
					<div className="OpenModalClass">
						<span>Add Student Information</span>
						<form
							className="OpenModalClass"
							onSubmit={handleSubmit(onSubmitHandler)}
						>
							<div>
								<input
									className="userInput1"
									type="text"
									name="studentName"
									{...register("studentName")}
									placeholder="Enter Student Name"
								/>
								<p className="errorclass">{errors.studentName?.message}</p>
							</div>
							<div>
								<input
									className="userInput1"
									type="text"
									name="studentEmail"
									{...register("studentEmail")}
									placeholder="Enter Student Email"
								/>
								<p className="errorclass">{errors.studentEmail?.message}</p>
							</div>
							<div>
								<input
									className="userInput1"
									type="text"
									{...register("courseName")}
									name="courseName"
									placeholder="Enter Course Name"
								/>
								<p className="errorclass">{errors.courseName?.message}</p>
							</div>
							<div>
								<input
									className="userInput1"
									type="text"
									name="teacherEmail"
									{...register("teacherEmail")}
									placeholder="Enter Teacher Email"
								/>
								<p className="errorclass">{errors.teacherEmail?.message}</p>
							</div>
							<div>
								<span className="instrumentNameText">
									Enter Instrument Name liks Guitar, piano/keyboard, ukulele,
									vocal(Indian classical, western and carnatic), drums and flute
								</span>
								<input
									className="userInput1"
									type="text"
									name="instrumentName"
									{...register("instrumentName")}
									placeholder="Enter Instrument Name"
								/>
								<p className="errorclass">{errors.instrumentName?.message}</p>
							</div>
							<div>
								<input
									className="userInput1"
									type="text"
									name="day"
									placeholder="Enter Day like Monday,Tuesday..."
									{...register("day")}
								/>
								<p className="errorclass">{errors.day?.message}</p>
							</div>
							<div>
								<input
									className="userInput1"
									type="text"
									name="time"
									placeholder="Enter Time like 9pm or 10am and so on"
									{...register("time")}
								/>

								<p className="errorclass">{errors.time?.message}</p>
							</div>
							<div>
								<input
									className="userInput1"
									type="text"
									name="noClasses"
									{...register("noClasses")}
									placeholder="Enter Number of Classes"
								/>
								<p className="errorclass">{errors.noClasses?.message}</p>
							</div>
							<div>
								<button variant="contained" className="submitBtn">
									{" "}
									{loading ? "Adding..." : "Add Student"}
								</button>
							</div>
						</form>
					</div>
				</Dialog>
			)}
		</>
	);
};

export default StudentInfoPage;

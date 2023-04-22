import { Button, CircularProgress, Dialog } from "@material-ui/core";
import React, { useEffect } from "react";
import { Card } from "@material-ui/core";
import HeaderPage from "./Header";
import { useState } from "react";
const TeacherInfoPage = () => {
	const [open, setOpen] = useState(false);
	const [teacherInfo, setTeacherInfo] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const teacherInfo = async () => {
			setLoading(true);
			const response = await fetch(
				"https://musicchampsite.onrender.com/api/v1/admin/get_all_teacher",
				{
					method: "GET",
					headers: { "Content-type": "application/json" },
				}
			);
			if (response.status == 200) {
				const data = await response.json();
				setTeacherInfo(data);
			}
			setLoading(false);
		};
		teacherInfo();
	});
	const handleChange = (e) => {
		console.log(e.target.name, e.target.checked);
	};
	return (
		<>
			<HeaderPage />
			<div className="TeacherInfoClass">
				<span>Teacher Informations</span>
				{teacherInfo != null &&
				teacherInfo != undefined &&
				teacherInfo.length > 0 ? (
					teacherInfo.map((teacher) => {
						return (
							<>
								<Card className="TeacherInfoCardClass">
									<span>{teacher.email}</span>
									<div>
										<Button
											onClick={() => setOpen(true)}
											variant="contained"
											className="permissionBtn"
										>
											Permission
										</Button>
									</div>
								</Card>
							</>
						);
					})
				) : loading ? (
					<CircularProgress />
				) : (
					"No Data"
				)}
			</div>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<div className="OpenModalforPermission">
					<div>
						<input
							checked={true}
							name="classCount"
							type="checkbox"
							onChange={handleChange}
						/>
						<input name="meetingLink" type="checkbox" onChange={handleChange} />
					</div>
					<div>
						<span>Class count</span>
						<span>Meet Link </span>
					</div>
				</div>
				<Button variant="contained" className="SaveChange">
					Save
				</Button>
			</Dialog>
		</>
	);
};

export default TeacherInfoPage;

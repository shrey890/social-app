import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
const ChangePassword = () => {
	const [newPass, setNewPass] = useState("");
	const [oldPass, setOldPass] = useState("");
	const changePassword = async () => {
		await axios.put(
				"http://localhost:3000/auth/changepassword",
				{ oldPassword: oldPass, newPassword: newPass },
				{
					headers: { accessToken: localStorage.getItem("accessToken") },
				}
			)
			.then((res) => {
				if (res.data.error) {
					console.error('error');
				}
			});
	};
	return (
		<div>
			<Typography variant="h3">
				<Divider>Change your password</Divider>
			</Typography>
			<Grid
				display="flex"
				sx={{ gap: 3, m: 2, flexDirection: "column" }}
				justifyContent="center"
				alignItems="center"
			>
				<TextField
					onChange={(e) => setOldPass(e.target.value)}
					required
					id="outlined-required"
					label="old password"
				/>
				<TextField
					onChange={(e) => setNewPass(e.target.value)}
					required
					id="outlined-required"
					label="new password"
				/>
				<Button onClick={changePassword}>Change Password</Button>
			</Grid>
		</div>
	);
};
export default ChangePassword;

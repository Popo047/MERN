import React from "react";
import { useFormik } from "formik";
import axios from "axios";

function RegisterPage() {
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		onSubmit: (data) => {
			try {
				const response = axios.post("http://localhost:3000/auth/signup", data);
			} catch (error) {
				console.log(error);
			}
		},
	});

	return (
		<div>
			<h3>Register</h3>
			<form action="POST" onSubmit={formik.handleSubmit} noValidate={false}>
				<label>Username</label>
				<input
					type="text"
					name="username"
					id="username"
					value={formik.values.username}
					onChange={formik.handleChange}
					minLength={4}
					required
					autoComplete="off"
				/>
				<label>Password</label>
				<input
					type="password"
					name="password"
					id="password"
					value={formik.values.password}
					onChange={formik.handleChange}
					required
					autoComplete="off"
					minLength={6}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default RegisterPage;

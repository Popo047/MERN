import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";

function SignInPage() {
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		onSubmit: async (data) => {
			try {
				const {
					data: { accessToken },
				} = await axios.post("http://localhost:3000/auth/signin", data);
				sessionStorage.setItem("accessToken", accessToken);
				router.push("/");
			} catch (error) {
				console.log(error);
			}
		},
	});

	return (
		<div>
			<h3>Login</h3>
			<form action="POST" onSubmit={formik.handleSubmit}>
				<label>Username</label>
				<input
					type="text"
					name="username"
					id="username"
					value={formik.values.username}
					onChange={formik.handleChange}
					autoComplete="off"
					// minLength={4}
				/>
				<label>Password</label>
				<input
					type="password"
					name="password"
					id="password"
					value={formik.values.password}
					onChange={formik.handleChange}
					// minLength={6}
					autoComplete="off"
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default SignInPage;

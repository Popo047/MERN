import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import useAxiosInstance from "../../utils/useAxiosInstance";

function NewPostPage() {
	const axiosInstance = useAxiosInstance();

	const formik = useFormik({
		initialValues: {
			username: "",
			title: "",
			description: "",
		},
		// validationSchema,
		onSubmit: async (values) => {
			console.log(values);
			try {
				const resp = axiosInstance.post("http://localhost:3000/posts", values, {
					headers: {
						accessToken: sessionStorage.getItem("accessToken"),
					},
				});
			} catch (error) {
				console.log(error);
			}
		},
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<label htmlFor="username">Username</label>
			<input
				id="username"
				name="username"
				autoComplete="off"
				onChange={formik.handleChange}
				value={formik.values.username}
			/>
			<br />
			<label htmlFor="title">Title</label>
			<input
				id="title"
				name="title"
				autoComplete="off"
				onChange={formik.handleChange}
				value={formik.values.title}
			/>
			<br />
			<label htmlFor="description">Description</label>
			<input
				id="description"
				name="description"
				autoComplete="off"
				onChange={formik.handleChange}
				value={formik.values.description}
			/>
			<button type="submit">Submit</button>
		</form>
	);
}

export default NewPostPage;

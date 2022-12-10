import React from "react";
import { useFormik } from "formik";
import axios from "axios";

function NewPostPage() {
	// Pass the useFormik() hook initial form values and a submit function that will
	// be called when the form is submitted

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
				const { data } = await axios.post(
					"http://localhost:3000/posts",
					values
				);
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

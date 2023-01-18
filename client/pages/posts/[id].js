import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Grid } from "@mui/material";
import useAxiosInstance from "../../utils/useAxiosInstance";

function Post() {
	const router = useRouter();
	const axiosInstance = useAxiosInstance();
	const {
		query: { id },
	} = router;
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);
	const [commentBody, setEnteredComment] = useState("");

	async function getComments() {
		try {
			const { data } = await axiosInstance.get(
				`http://localhost:3000/comments/${id}`
			);
			setComments(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		async function getPost() {
			try {
				const { data } = await axiosInstance.get(
					`http://localhost:3000/posts/${id}`
				);
				setPost(data);
			} catch (error) {
				console.log(error);
			}
		}
		getPost();

		getComments();
	}, []);

	async function submitHandler() {
		try {
			const response = await axiosInstance.post(
				`http://localhost:3000/comments/${id}`,
				{ commentBody }
			);
			getComments();
			setEnteredComment("");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<Grid container spacing={1}>
				<Grid item lg={6} xs={12}>
					<h3>{post?.title}</h3>
					<h5>{post.description}</h5>
				</Grid>
				<Grid item lg={6} xs={12}>
					<h3>Comments</h3>
					{comments?.map((item) => (
						<li>{item.commentBody}</li>
					))}
				</Grid>
				<label htmlFor="comment">Enter Comment</label>
				<input
					type="text"
					name="comment"
					id="comment"
					value={commentBody}
					onChange={(e) => setEnteredComment(e.target.value)}
				/>
				<button onClick={submitHandler}>Submit</button>
			</Grid>
		</div>
	);
}

export default Post;

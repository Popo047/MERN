import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

function PostsPage() {
	const router = useRouter();
	const [posts, setposts] = useState([]);

	useEffect(() => {
		const getPosts = async (params) => {
			try {
				const { data } = await axios.get("http://localhost:3000/posts");
				setposts(data?.posts);
			} catch (error) {
				console.log(error);
			}
		};
		getPosts();
	}, []);

	const onCreatePost = () => {
		router.push("/posts/NewPost");
	};

	return (
		<div>
			<button onClick={onCreatePost}>Create Post</button>
			<br />
			{posts?.map((item) => (
				<li>
					<Link href={`/posts/${item.id}`}>{item.title}</Link>
				</li>
			))}
		</div>
	);
}

export default PostsPage;

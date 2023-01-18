import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div>
			<h1>Hello</h1>
			<div>
				<Link href={"/posts"}>Posts</Link>
				<Link href={"/signin"}>SignIn</Link>
				<Link href={"/register"}>Register </Link>
			</div>
		</div>
	);
}

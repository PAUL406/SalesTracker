"use client";

import { title } from "@/components/primitives";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DocsPage() {
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("authToken");

		if (token) {
			const parsedToken = JSON.parse(token);
			console.log(parsedToken);
		} else {
			console.log("No token found in localStorage");
			router.push("/login");
		}
	}, []);

	return (
		<div>
			<h1 className={title()}>Dashboard</h1>
		</div>
	);
}

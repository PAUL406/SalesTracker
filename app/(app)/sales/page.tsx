"use client";

import { title } from "@/components/primitives";
import SidebarComponent from "@/components/sidebar/sidebar";
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
			<h1 className={title()}>Sales</h1>
		</div>
	);
}

"use client";

import React from "react";
import { useLockedBody } from "../hooks/useBodyLock";
// import { NavbarWrapper } from "../navbar/navbar";
// import { SidebarWrapper } from "../sidebar/sidebar";
import { SidebarContext } from "./layout-context";
import SidebarComponent from "../sidebar/sidebar";

interface Props {
	children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
	const [sidebarOpen, setSidebarOpen] = React.useState(false);
	const [_, setLocked] = useLockedBody(false);

	const handleToggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
		setLocked(!sidebarOpen);
	};

	return (
		<SidebarContext.Provider
			value={{
				collapsed: sidebarOpen,
				setCollapsed: handleToggleSidebar,
			}}
		>
			<section className="flex">
				<SidebarComponent />

				<div className="px-4">{children}</div>
			</section>
		</SidebarContext.Provider>
	);
};

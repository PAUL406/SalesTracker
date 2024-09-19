import React from "react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { useSidebarContext } from "../layout/layout-context";
import { Sidebar } from "./sidebar.styles";
import { CompaniesDropdown } from "./companies-dropdown";

const SidebarComponent = () => {
	const pathname = usePathname();

	const { collapsed, setCollapsed } = useSidebarContext();
	return (
		<aside className="h-screen z-[20] sticky top-0">
			{collapsed ? <div className={Sidebar.Overlay()} onClick={setCollapsed} /> : null}
			<div
				className={Sidebar({
					collapsed: collapsed,
				})}
			>
				<div className={Sidebar.Header()}>
					<CompaniesDropdown />
				</div>
				<div className="flex flex-col justify-between h-full">
					<div className={Sidebar.Body()}>
						<SidebarItem isActive={pathname === "/sales"} title="sales" icon={<DevIcon />} href="/sales" />
						<SidebarItem isActive={pathname === "/users"} title="Usuarios" icon={<DevIcon />} href="/users" />
						<SidebarItem isActive={pathname === "/developers"} title="Developers" icon={<DevIcon />} />
						<SidebarItem isActive={pathname === "/developers"} title="Developers" icon={<DevIcon />} />
						<SidebarItem isActive={pathname === "/developers"} title="Developers" icon={<DevIcon />} />
						<SidebarItem isActive={pathname === "/developers"} title="Developers" icon={<DevIcon />} />
						<SidebarItem isActive={pathname === "/developers"} title="Developers" icon={<DevIcon />} />
						<SidebarItem isActive={pathname === "/developers"} title="Developers" icon={<DevIcon />} />
						<SidebarItem isActive={pathname === "/developers"} title="Developers" icon={<DevIcon />} />
						<SidebarItem isActive={pathname === "/developers"} title="Developers" icon={<DevIcon />} />
						<SidebarItem isActive={pathname === "/developers"} title="Developers" icon={<DevIcon />} />
						<SidebarItem isActive={pathname === "/developers"} title="Developers" icon={<DevIcon />} />
						<SidebarItem isActive={pathname === "/developers"} title="Developers" icon={<DevIcon />} />
						<SidebarItem isActive={pathname === "/developers"} title="Developers" icon={<DevIcon />} />
						<SidebarItem isActive={pathname === "/developers"} title="Developers" icon={<DevIcon />} />
						<SidebarItem isActive={pathname === "/developers"} title="Developers" icon={<DevIcon />} />
					</div>
				</div>
			</div>
		</aside>
	);
};

export default SidebarComponent;

"use client";

import { title } from "@/components/primitives";
import SidebarComponent from "@/components/sidebar/sidebar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import DataTable from "@/components/dataTable/dataTable";
import { Button } from "@nextui-org/button";
import { IconPlus } from "@/components/dataTable/IconPlus";
import {
	Chip,
	ChipProps,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Tooltip,
	User,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/dataTable/IconVerticalDots";
import { IconEye } from "@/components/dataTable/IconEye";
import { IconEdit } from "@/components/dataTable/IconEdit";
import { IconDelete } from "@/components/dataTable/IconDelete";

import { AddUserModal } from "@/components/modals";

export default function DocsPage() {
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("authToken");

		if (token) {
			const parsedToken = JSON.parse(token);
			// console.log(parsedToken);
		} else {
			console.log("No token found in localStorage");
			router.push("/login");
		}
	}, []);

	const [activeModal, setActiveModal] = useState<string | null>(null);

	const handleAddClick = () => setActiveModal("add");
	const handleEditClick = () => setActiveModal("edit");
	const handleCloseModal = () => setActiveModal(null);

	// const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	// const handleOpenModal = () => setIsAddModalOpen(true);
	// const handleCloseModal = () => setIsAddModalOpen(false);

	const actionsHeaderButtons = [
		{ label: "Añadir", onClick: handleAddClick, icon: <IconPlus /> },
		//others
	];

	let initialVisibleColumns = ["name", "email", "role", "status", "actions"];

	let data = {
		columns: [
			{ name: "NOMBRE", uid: "name", sortable: true },
			{ name: "EMAIL", uid: "email" },
			{ name: "ROL", uid: "role", sortable: true },
			{ name: "ESTADO", uid: "status", sortable: true },
			{ name: "ACCIONES", uid: "actions" },
		],
		statusOptions: [
			{ name: "Active", uid: "active" },
			{ name: "Paused", uid: "paused" },
			{ name: "Vacation", uid: "vacation" },
		],

		items: [
			{
				id: 1,
				name: "Tony Reichert",
				role: "CEO",
				team: "Management",
				status: "active",
				age: "29",
				avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
				email: "tony.reichert@example.com",
			},
			{
				id: 2,
				name: "Zoey Lang",
				role: "Tech Lead",
				team: "Development",
				status: "paused",
				age: "25",
				avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
				email: "zoey.lang@example.com",
			},
			{
				id: 3,
				name: "Jane Fisher",
				role: "Sr. Dev",
				team: "Development",
				status: "active",
				age: "22",
				avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
				email: "jane.fisher@example.com",
			},
			{
				id: 4,
				name: "William Howard",
				role: "C.M.",
				team: "Marketing",
				status: "vacation",
				age: "28",
				avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
				email: "william.howard@example.com",
			},
			{
				id: 5,
				name: "Kristen Copper",
				role: "S. Manager",
				team: "Sales",
				status: "active",
				age: "24",
				avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
				email: "kristen.cooper@example.com",
			},
			{
				id: 6,
				name: "Brian Kim",
				role: "P. Manager",
				team: "Management",
				age: "29",
				avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
				email: "brian.kim@example.com",
				status: "Active",
			},
			{
				id: 7,
				name: "Michael Hunt",
				role: "Designer",
				team: "Design",
				status: "paused",
				age: "27",
				avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
				email: "michael.hunt@example.com",
			},
			{
				id: 8,
				name: "Samantha Brooks",
				role: "HR Manager",
				team: "HR",
				status: "active",
				age: "31",
				avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
				email: "samantha.brooks@example.com",
			},
			{
				id: 9,
				name: "Frank Harrison",
				role: "F. Manager",
				team: "Finance",
				status: "vacation",
				age: "33",
				avatar: "https://i.pravatar.cc/150?img=4",
				email: "frank.harrison@example.com",
			},
			{
				id: 10,
				name: "Emma Adams",
				role: "Ops Manager",
				team: "Operations",
				status: "active",
				age: "35",
				avatar: "https://i.pravatar.cc/150?img=5",
				email: "emma.adams@example.com",
			},
			{
				id: 11,
				name: "Brandon Stevens",
				role: "Jr. Dev",
				team: "Development",
				status: "active",
				age: "22",
				avatar: "https://i.pravatar.cc/150?img=8",
				email: "brandon.stevens@example.com",
			},
			{
				id: 12,
				name: "Megan Richards",
				role: "P. Manager",
				team: "Product",
				status: "paused",
				age: "28",
				avatar: "https://i.pravatar.cc/150?img=10",
				email: "megan.richards@example.com",
			},
			{
				id: 13,
				name: "Oliver Scott",
				role: "S. Manager",
				team: "Security",
				status: "active",
				age: "37",
				avatar: "https://i.pravatar.cc/150?img=12",
				email: "oliver.scott@example.com",
			},
			{
				id: 14,
				name: "Grace Allen",
				role: "M. Specialist",
				team: "Marketing",
				status: "active",
				age: "30",
				avatar: "https://i.pravatar.cc/150?img=16",
				email: "grace.allen@example.com",
			},
			{
				id: 15,
				name: "Noah Carter",
				role: "IT Specialist",
				team: "I. Technology",
				status: "paused",
				age: "31",
				avatar: "https://i.pravatar.cc/150?img=15",
				email: "noah.carter@example.com",
			},
			{
				id: 16,
				name: "Ava Perez",
				role: "Manager",
				team: "Sales",
				status: "active",
				age: "29",
				avatar: "https://i.pravatar.cc/150?img=20",
				email: "ava.perez@example.com",
			},
			{
				id: 17,
				name: "Liam Johnson",
				role: "Data Analyst",
				team: "Analysis",
				status: "active",
				age: "28",
				avatar: "https://i.pravatar.cc/150?img=33",
				email: "liam.johnson@example.com",
			},
			{
				id: 18,
				name: "Sophia Taylor",
				role: "QA Analyst",
				team: "Testing",
				status: "active",
				age: "27",
				avatar: "https://i.pravatar.cc/150?img=29",
				email: "sophia.taylor@example.com",
			},
			{
				id: 19,
				name: "Lucas Harris",
				role: "Administrator",
				team: "Information Technology",
				status: "paused",
				age: "32",
				avatar: "https://i.pravatar.cc/150?img=50",
				email: "lucas.harris@example.com",
			},
			{
				id: 20,
				name: "Mia Robinson",
				role: "Coordinator",
				team: "Operations",
				status: "active",
				age: "26",
				avatar: "https://i.pravatar.cc/150?img=45",
				email: "mia.robinson@example.com",
			},
		],
	};
	type User = (typeof data.items)[0];

	const statusColorMap: Record<string, ChipProps["color"]> = {
		active: "success",
		paused: "danger",
		vacation: "warning",
	};

	const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
		const cellValue = user[columnKey as keyof User];

		switch (columnKey) {
			case "name":
				return (
					<User avatarProps={{ radius: "lg", src: user.avatar }} description={user.email} name={cellValue}>
						{user.email}
					</User>
				);
			case "role":
				return (
					<div className="flex flex-col">
						<p className="text-bold text-small capitalize">{cellValue}</p>
						<p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
					</div>
				);
			case "status":
				return (
					<Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
						{cellValue}
					</Chip>
				);
			case "actions":
				return (
					// <div className="relative flex justify-end items-center gap-2">
					// 	<Dropdown>
					// 		<DropdownTrigger>
					// 			<Button isIconOnly size="sm" variant="light">
					// 				<VerticalDotsIcon className="text-default-300" />
					// 			</Button>
					// 		</DropdownTrigger>
					// 		<DropdownMenu>
					// 			<DropdownItem>View</DropdownItem>
					// 			<DropdownItem>Edit</DropdownItem>
					// 			<DropdownItem>Delete</DropdownItem>
					// 		</DropdownMenu>
					// 	</Dropdown>
					// </div>

					<div className="relative flex items-center gap-2">
						<Tooltip content="Details">
							<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
								<IconEye />
							</span>
						</Tooltip>
						<Tooltip content="Edit user">
							<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
								<IconEdit />
							</span>
						</Tooltip>
						<Tooltip color="danger" content="Delete user">
							<span className="text-lg text-danger cursor-pointer active:opacity-50">
								<IconDelete />
							</span>
						</Tooltip>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	return (
		<div>
			<h3 className="text-xl font-semibold">Todas las cuentas</h3>
			<AddUserModal isOpen={activeModal === "add"} onOpenChange={handleCloseModal} />
			<Card className="my-4"></Card>
			<DataTable
				actionsHeaderButtons={actionsHeaderButtons}
				initialVisibleColumns={initialVisibleColumns}
				data={data}
				renderCell={renderCell}
			/>
		</div>
	);
}

import React from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Chip,
	User,
	Pagination,
	Selection,
	ChipProps,
	SortDescriptor,
} from "@nextui-org/react";
// import { IconPlus } from "./IconPlus";
import { VerticalDotsIcon } from "./IconVerticalDots";
import { IconChevronDown } from "./IconChevronDown";
import { IconSearch } from "./IconSearch";
// import { columns, users, statusOptions } from "./data";
import { capitalize } from "./utils";
import { ActionButtons } from "./ActionButtons";

const statusColorMap: Record<string, ChipProps["color"]> = {
	active: "success",
	paused: "danger",
	vacation: "warning",
};

// const INITIAL_VISIBLE_COLUMNS = ["name", "email", "role", "status", "actions"];

// type User = (typeof users)[0];

type ActionsHeaderButtons = {
	label: string;
	onClick: () => void;
	icon?: React.ReactNode;
};

type DataTableProps<T> = {
	actionsHeaderButtons: ActionsHeaderButtons[];
	initialVisibleColumns: string[];
	data: {
		columns: {
			name: string;
			uid: string;
			sortable?: boolean;
		}[];
		statusOptions?: { name: string; uid: string }[];
		items: Array<T & { id: string | number }>;
	};
	renderCell: (item: T, columnKey: React.Key) => React.ReactNode;
};

// prettier-ignore
export default function DataTable<T>({ actionsHeaderButtons, initialVisibleColumns, data, renderCell}: DataTableProps<T>) {
	const [filterValue, setFilterValue] = React.useState("");
	const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
	const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(initialVisibleColumns));
	const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
		column: "age",
		direction: "ascending",
	});

	const { columns, statusOptions = [], ...rest } = data;

	const [page, setPage] = React.useState(1);

	const hasSearchFilter = Boolean(filterValue);

	const headerColumns = React.useMemo(() => {
    
		if (visibleColumns === "all") return columns;

		return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
	}, [visibleColumns]);

	const filteredItems = React.useMemo(() => {
		let filteredItems = [...data.items];

		if (hasSearchFilter) {
			filteredItems = filteredItems.filter((item) =>
				// user.name.toLowerCase().includes(filterValue.toLowerCase())
        (item as any).name.toLowerCase().includes(filterValue.toLowerCase())
			);
		}
		if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
			// filteredItems = filteredItems.filter((user) => Array.from(statusFilter).includes(user.status));
      
      filteredItems = filteredItems.filter((item) => Array.from(statusFilter).includes((item as any).status));
		}

		return filteredItems;
	}, [data.items, filterValue, statusFilter]);

	const pages = Math.ceil(filteredItems.length / rowsPerPage);

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const sortedItems = React.useMemo(() => {
		return [...items].sort((a: T, b: T) => {
			const first = (a as any)[sortDescriptor.column as keyof T] as number;
			const second = (b as any)[sortDescriptor.column as keyof T] as number;
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);

	// const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
	// 	const cellValue = user[columnKey as keyof User];

	// 	switch (columnKey) {
	// 		case "name":
	// 			return (
	// 				<User avatarProps={{ radius: "lg", src: user.avatar }} description={user.email} name={cellValue}>
	// 					{user.email}
	// 				</User>
	// 			);
	// 		case "role":
	// 			return (
	// 				<div className="flex flex-col">
	// 					<p className="text-bold text-small capitalize">{cellValue}</p>
	// 					<p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
	// 				</div>
	// 			);
	// 		case "status":
	// 			return (
	// 				<Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
	// 					{cellValue}
	// 				</Chip>
	// 			);
	// 		case "actions":
	// 			return (
	// 				<div className="relative flex justify-end items-center gap-2">
	// 					<Dropdown>
	// 						<DropdownTrigger>
	// 							<Button isIconOnly size="sm" variant="light">
	// 								<VerticalDotsIcon className="text-default-300" />
	// 							</Button>
	// 						</DropdownTrigger>
	// 						<DropdownMenu>
	// 							<DropdownItem>View</DropdownItem>
	// 							<DropdownItem>Edit</DropdownItem>
	// 							<DropdownItem>Delete</DropdownItem>
	// 						</DropdownMenu>
	// 					</Dropdown>
	// 				</div>
	// 			);
	// 		default:
	// 			return cellValue;
	// 	}
	// }, []);

	const onNextPage = React.useCallback(() => {
		if (page < pages) {
			setPage(page + 1);
		}
	}, [page, pages]);

	const onPreviousPage = React.useCallback(() => {
		if (page > 1) {
			setPage(page - 1);
		}
	}, [page]);

	const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);

	const onSearchChange = React.useCallback((value?: string) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue("");
		}
	}, []);

	const onClear = React.useCallback(() => {
		setFilterValue("");
		setPage(1);
	}, []);

	const topContent = React.useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-end">
					<Input
						isClearable
						className="w-full sm:max-w-[44%]"
						placeholder="Buscar por nombre..."
						startContent={<IconSearch />}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className="flex gap-3">
						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
								<Button endContent={<IconChevronDown className="text-small" />} variant="flat">
									Status
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label="Table Columns"
								closeOnSelect={false}
								selectedKeys={statusFilter}
								selectionMode="multiple"
								onSelectionChange={setStatusFilter}
							>
								{statusOptions.map((status) => (
									<DropdownItem key={status.uid} className="capitalize">
										{capitalize(status.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
								<Button endContent={<IconChevronDown className="text-small" />} variant="flat">
									Columns
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label="Table Columns"
								closeOnSelect={false}
								selectedKeys={visibleColumns}
								selectionMode="multiple"
								onSelectionChange={setVisibleColumns}
							>
								{columns.map((column) => (
									<DropdownItem key={column.uid} className="capitalize">
										{capitalize(column.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						{/* <Button color="primary" endContent={<PlusIcon />}>
							Añadir
						</Button> */}
						<ActionButtons actions={actionsHeaderButtons} />
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">Total {data.items.length} users</span>
					<label className="flex items-center text-default-400 text-small">
						Rows per page:
						<select
							className="bg-transparent outline-none text-default-400 text-small"
							onChange={onRowsPerPageChange}
						>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="15">15</option>
						</select>
					</label>
				</div>
			</div>
		);
	}, [
		filterValue,
		statusFilter,
		visibleColumns,
		onSearchChange,
		onRowsPerPageChange,
		data.items.length,
		hasSearchFilter,
	]);

	const bottomContent = React.useMemo(() => {
		return (
			<div className="py-2 px-2 flex justify-between items-center">
				<span className="w-[30%] text-small text-default-400">
					{selectedKeys === "all"
						? "All items selected"
						: `${selectedKeys.size} of ${filteredItems.length} selected`}
				</span>
				<Pagination
					isCompact
					showControls
					showShadow
					color="primary"
					page={page}
					total={pages}
					onChange={setPage}
				/>
				<div className="hidden sm:flex w-[30%] justify-end gap-2">
					<Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
						Previous
					</Button>
					<Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
						Next
					</Button>
				</div>
			</div>
		);
	}, [selectedKeys, items.length, page, pages, hasSearchFilter]);

	return (
		<Table
			aria-label="Example table with custom cells, pagination and sorting"
			isHeaderSticky
			bottomContent={bottomContent}
			bottomContentPlacement="outside"
			classNames={{
				wrapper: "max-h-[600px]",
			}}
			selectedKeys={selectedKeys}
			selectionMode="multiple"
			sortDescriptor={sortDescriptor}
			topContent={topContent}
			topContentPlacement="outside"
			onSelectionChange={setSelectedKeys}
			onSortChange={setSortDescriptor}
		>
			<TableHeader columns={headerColumns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === "actions" ? "center" : "start"}
						allowsSorting={column.sortable}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={"No users found"} items={sortedItems}>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}

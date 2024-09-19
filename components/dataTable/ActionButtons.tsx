// ActionButtons.tsx
import React from "react";
import { Button } from "@nextui-org/react";

type Action = {
	label: string;
	onClick: () => void;
	icon?: React.ReactNode;
};

type ActionButtonsProps = {
	actions: Action[];
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({ actions }) => {
	return (
		<div className="flex gap-3">
			{actions.map((action, index) => (
				<Button key={index} color="primary" endContent={action.icon} onClick={action.onClick}>
					{action.label}
				</Button>
			))}
		</div>
	);
};

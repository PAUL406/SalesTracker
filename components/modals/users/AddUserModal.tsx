import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Checkbox,
	Input,
	Link,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { IconUser } from "./IconUser";
import { IconCamera } from "./IconCamera";
import { IconMail } from "./IconMail";
import { IconLock } from "./IconLock";

type AddUserModalProps = {
	isOpen: boolean;
	onOpenChange: () => void;
};

export default function AddUserModal({ isOpen, onOpenChange }: AddUserModalProps) {
	const roles = [
		{ key: "1", label: "Administrador" },
		{ key: "2", label: "Cajero" },
	];

	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Registrar nuevo usuario</ModalHeader>
							<ModalBody>
								<Select label="Rol" placeholder="Seleccione un rol">
									{roles.map((rol) => (
										<SelectItem key={rol.key}>{rol.label}</SelectItem>
									))}
								</Select>

								<Input
									autoFocus
									endContent={
										<IconUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
									}
									label="Nombre completo"
									placeholder="Ingrese su nombre completo"
									variant="bordered"
								/>

								<Input
									autoFocus
									endContent={
										<IconMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
									}
									label="Email"
									placeholder="Enter your email"
									variant="bordered"
								/>

								<Input
									endContent={
										<IconLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
									}
									label="Contraseña"
									placeholder="Ingrese la contraseña"
									type="password"
									variant="bordered"
								/>

								<Input
									endContent={
										<IconLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
									}
									label="Repetir contraseña"
									placeholder="Vuelva a ingresar la contraseña"
									type="password"
									variant="bordered"
								/>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="flat" onPress={onClose}>
									Cerrar
								</Button>
								<Button color="primary" onPress={onClose}>
									Procesar
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

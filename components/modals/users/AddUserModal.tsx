"use client";
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
import { UserIcon } from "@/components/icons/UserIcon";
import { CameraIcon } from "@/components/icons/CameraIcon";
import { MailIcon } from "@/components/icons/MailIcon";
import { LockIcon } from "@/components/icons/LockIcon";
import React, { useState } from "react";
import { z } from "zod";
import { EyeSlashFilledIcon } from "@/components/icons/EyeFilledIcon";
import { EyeFilledIcon } from "@/components/icons/EyeSlashFilledIcon";
import AvatarEditor from "@/components/avatar-editor/avatar-edit";

type AddUserModalProps = {
	isOpen: boolean;
	onOpenChange: () => void;
};

type FormErrors = {
	role?: string;
	full_name?: string;
	email?: string;
	password?: string;
	password_confirmation?: string;
};

type TokenAuth = {
	type: string;
	value: string;
};

export default function AddUserModal({ isOpen, onOpenChange }: AddUserModalProps) {
	const [formData, setFormData] = useState({
		role: "",
		full_name: "",
		email: "",
		password: "",
		password_confirmation: "",
		avatar: "",
	});
	const [errorsFiels, setErrorsFiels] = useState<FormErrors>({});
	const [isSubmitted, setIsSubmitted] = useState(false);

	const [isVisible, setIsVisible] = React.useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const roles = [
		{ key: "1", label: "Administrador" },
		{ key: "2", label: "Cajero" },
	];

	const schema = z
		.object({
			role: z.string().min(1, "El rol es requerido"),
			full_name: z.string().min(1, "El nombre completo es requerido"),
			email: z.string().email("El email no es válido"),
			password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
			password_confirmation: z.string().min(1, "La confirmación de la contraseña es requerida"),
			avatar: z.string(),
		})
		.refine((data) => data.password === data.password_confirmation, {
			path: ["password_confirmation"],
			message: "Las contraseñas no coinciden",
		});

	/**============================================
	 *              Principal functions
	 *=============================================**/

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleImageChange = (base64Image: string) => {
		setFormData((prevData) => ({
			...prevData,
			avatar: base64Image, // Add the cropped image base64 to formData
		}));
	};

	const validateForm = () => {
		const result = schema.safeParse(formData);
		// console.log(result);

		if (!result.success) {
			const fieldErrors: FormErrors = {};
			result.error.errors.forEach((error) => {
				const field = error.path[0] as keyof FormErrors;
				fieldErrors[field] = error.message;
			});
			setErrorsFiels(fieldErrors);
			return false;
		}
		setErrorsFiels({});
		return true;
	};

	const handleSubmit = async () => {
		setIsSubmitted(true);
		if (validateForm()) {
			try {
				const tokenString = localStorage.getItem("authToken");
				// let parsedToken = "";
				let parsedToken: { type: string; value: string } | null = null;

				if (tokenString) {
					try {
						parsedToken = JSON.parse(tokenString);
						if (typeof parsedToken !== "object") {
							throw new Error("Token inválido");
						}
					} catch (parseError) {
						console.error("Error al parsear el token:", parseError);
					}
				}
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: parsedToken !== null ? `Bearer ${parsedToken.value}` : "",
					},
					body: JSON.stringify(formData),
				});
				if (response.ok) {
					onOpenChange(); // Cerrar el modal
				} else {
					console.error("Error al enviar datos");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		}
	};

	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Registrar nuevo usuario</ModalHeader>
							<ModalBody>
								<Select
									label="Rol"
									name="role"
									placeholder="Seleccione un rol"
									onChange={handleInputChange}
									color={isSubmitted && !!errorsFiels.role ? "danger" : "default"}
									isInvalid={isSubmitted && !!errorsFiels.role}
									errorMessage="El rol es requerido"
								>
									{roles.map((rol) => (
										<SelectItem key={rol.key}>{rol.label}</SelectItem>
									))}
								</Select>

								<Input
									// autoFocus
									endContent={
										<UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
									}
									label="Nombre completo"
									placeholder="Ingrese su nombre completo"
									variant="bordered"
									name="full_name"
									onChange={handleInputChange}
									color={isSubmitted && !!errorsFiels.role ? "danger" : "default"}
									isInvalid={isSubmitted && !!errorsFiels.full_name}
									errorMessage={"El nombre completo es requerido"}
								/>

								<Input
									endContent={
										<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
									}
									label="Email"
									placeholder="Ingrese su email"
									variant="bordered"
									name="email"
									onChange={handleInputChange}
									color={isSubmitted && !!errorsFiels.email ? "danger" : "default"}
									isInvalid={isSubmitted && !!errorsFiels.email}
									errorMessage="Ingrese un email válido"
								/>

								<Input
									endContent={
										<button
											className="focus:outline-none"
											type="button"
											onClick={toggleVisibility}
											aria-label="toggle password visibility"
										>
											{isVisible ? (
												<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
											) : (
												<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
											)}
										</button>
									}
									type={isVisible ? "text" : "password"}
									label="Contraseña"
									placeholder="Ingrese la contraseña"
									variant="bordered"
									name="password"
									onChange={handleInputChange}
									color={isSubmitted && !!errorsFiels.password ? "danger" : "default"}
									isInvalid={isSubmitted && !!errorsFiels.password}
									errorMessage="La contraseña debe tener al menos 8 caracteres"
								/>

								<Input
									endContent={
										<button
											className="focus:outline-none"
											type="button"
											onClick={toggleVisibility}
											aria-label="toggle password visibility"
										>
											{isVisible ? (
												<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
											) : (
												<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
											)}
										</button>
									}
									type={isVisible ? "text" : "password"}
									label="Repetir contraseña"
									placeholder="Vuelva a ingresar la contraseña"
									variant="bordered"
									name="password_confirmation"
									onChange={handleInputChange}
									color={isSubmitted && !!errorsFiels.password_confirmation ? "danger" : "default"}
									isInvalid={isSubmitted && !!errorsFiels.password_confirmation}
									errorMessage="Las contraseñas no coinciden"
								/>

								<AvatarEditor handleImageChange={handleImageChange} />
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="flat" onPress={onClose}>
									Cerrar
								</Button>
								<Button color="primary" onPress={handleSubmit}>
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

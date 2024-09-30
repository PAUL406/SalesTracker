import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Cargar 'react-avatar-edit' solo en el cliente
const Avatar = dynamic(() => import("react-avatar-edit"), { ssr: false });

type AvatarEditorProps = {
	handleImageChange: (base64Image: string) => void;
};

const AvatarEditor = ({ handleImageChange }: AvatarEditorProps) => {
	const [preview, setPreview] = useState<string | null>(null);
	const [src] = useState<string>("");
	const currentTheme = localStorage.getItem("theme") || "light";

	const onClose = () => {
		setPreview(null);
	};

	const onCrop = (newPreview: string) => {
		console.log(newPreview);
		handleImageChange(newPreview);
		setPreview(newPreview);

		// const img = new Image();
		// img.src = newPreview;
		// img.onload = () => {
		// 	const canvas = document.createElement("canvas");
		// 	canvas.width = img.width;
		// 	canvas.height = img.height;
		// 	const ctx = canvas.getContext("2d");
		// 	if (ctx) {
		// 		ctx.drawImage(img, 0, 0);
		// 		const jpgImage = canvas.toDataURL("image/jpeg", 1);
		// 		console.log("Imagen JPG:", jpgImage);

		// 		const link = document.createElement("a");
		// 		link.href = jpgImage;
		// 		link.download = "avatar.jpg";
		// 		link.click();
		// 	}
		// };
	};

	const onBeforeFileLoad = (elem: React.ChangeEvent<HTMLInputElement>) => {
		if (elem.target.files && elem.target.files[0].size > 10485760) {
			alert("El archivo es demasiado grande!");
			elem.target.value = "";
		}
	};

	return (
		<div>
			<Avatar
				label="Seleccione una imagen"
				labelStyle={{ fontSize: "18px", color: currentTheme === "dark" ? "white" : "dark" }}
				width={390}
				height={295}
				onCrop={onCrop}
				onClose={onClose}
				onBeforeFileLoad={onBeforeFileLoad}
				src={src}
			/>
			{/* {preview && <img src={preview} alt="Preview" />} */}
		</div>
	);
};

export default AvatarEditor;

"use client";
import { title, subtitle } from "@/components/primitives";

import { Input } from "@nextui-org/input";

import { Button } from "@nextui-org/button";

import React, { useState } from "react";
import { Divider } from "@nextui-org/divider";

export default function Home() {
	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");
	const validateEmail = (value: string) =>
		value.match(/[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i);

	const isInvalid = React.useMemo(() => {
		if (inputEmail === "") return false;

		return validateEmail(inputEmail) ? false : true;
	}, [inputEmail]);

	const isPasswordInvalid = React.useMemo(() => {
		if (inputPassword === "") return false;
		console.log(inputPassword);
		return inputPassword.length < 8 && inputPassword.length <= 32;
	}, [inputPassword]);

	return (
		<div className="flex gap-10 text-[25px] font-bold h-5/6 justify-center">
			<div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				{/* <div className="inline-block max-w-lg text-center justify-center"></div> */}

				<h1 className={title()}>Inicio de sesión</h1>
				<div className="pt-4">
					<div className={`flex flex-col items-center gap-4 w-full min-w-[15rem]`}>
						<Input
							type="email"
							label="Email"
							onChange={(e) => {
								setInputEmail(e.target.value);
							}}
							isInvalid={isInvalid}
							color={isInvalid ? "danger" : "default"}
							errorMessage="Por favor verifique su email"
						/>
						<Input
							type="password"
							label="Contraseña"
							onChange={(e) => {
								setInputPassword(e.target.value);
							}}
							isInvalid={isPasswordInvalid}
							color={isPasswordInvalid ? "danger" : "default"}
							errorMessage="La contraseña debe tener al menos 8 caracteres"
						/>
						<Button color="primary" variant="ghost" className="w-2/4">
							Entrar
						</Button>
					</div>
				</div>
			</div>

			<div className="hidden my-10 md:block">
				<Divider orientation="vertical" />
			</div>

			<div className="hidden md:flex flex-1 relative items-center justify-center p-6">
				<div className="z-10">
					<h1 className="font-bold text-[45px]">Aqui se Pone algo no se xD</h1>
					<div className="font-light text-slate-400 mt-4">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi possimus voluptate, sapiente
						assumenda deserunt repellendus, perferendis odit voluptas hic dolores laborum fugit ut? Architecto
						quo ex quidem vitae quae rem.
					</div>
				</div>
			</div>
		</div>
	);
}

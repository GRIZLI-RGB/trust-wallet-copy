"use client";

import clsx from "clsx";
import { useState } from "react";

type InputProps = {
	label?: string;
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
	type?: "text" | "password";
	className?: string;
	tip?: string;
};

export default function Input({
	label,
	placeholder,
	value,
	onChange,
	type = "text",
	className,
	tip,
}: InputProps) {
	const [focused, setFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const isPassword = type === "password";
	const inputType = isPassword && !showPassword ? "password" : "text";

	return (
		<div
			data-testid="password-field-input-group"
			className={clsx("text-start", className)}
		>
			{label && (
				<div className="mb-3">
					<div>
						<p
							data-testid="input-label"
							className="typography-subheader-14 text-utility-1-opacity-1 font-medium text-unset"
						>
							{label}
						</p>
					</div>
				</div>
			)}

			<div
				className={clsx(
					"input-field space-x-1 h-14",
					focused && "!border-accent"
				)}
			>
				<input
					placeholder={placeholder}
					onBlur={() => setFocused(false)}
					onFocus={() => setFocused(true)}
					data-testid="password-field"
					className="ph-no-capture w-full block flex-1 outline-none bg-transparent typography-subheader-16 font-medium text-left"
					spellCheck="false"
					type={inputType}
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>

				{type === "password" && (
					<div className="flex space-x-2">
						<div className="flex items-center">
							<div
								className="flex w-full"
								data-tooltip-id="default-tooltip"
								data-tooltip-place="top-end"
								data-tooltip-role="tooltip"
							>
								<button
									onClick={() =>
										setShowPassword((prev) => !prev)
									}
									data-testid="input-action-show-password"
									type="button"
									className={clsx(
										"outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full",
										isPassword && showPassword
											? "opacity-100"
											: "opacity-65"
									)}
									tabIndex={-1}
								>
									<svg
										className="text-primary-default"
										fill="none"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M2.93933 5.06077L18.9393 21.0608L21.0606 18.9395L18.6138 16.4926L23 12L17.4447 6.30998C14.7539 3.55392 10.5671 3.26407 7.56164 5.44044L5.06065 2.93945L2.93933 5.06077ZM9.68714 7.56594C10.3788 7.20443 11.1655 7 12 7C14.7614 7 17 9.23858 17 12C17 12.8345 16.7956 13.6212 16.4341 14.3129L9.68714 7.56594Z"
											fill="currentColor"
										/>
										<path
											d="M1 12L3.29029 9.65416L13.4882 19.8521C11.0565 20.3404 8.43922 19.6197 6.55528 17.69L1 12Z"
											fill="currentColor"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				)}
			</div>

			{tip && (
				<div className="mt-2">
					<small
						data-testid="input-subtitle"
						className="typography-caption-12 text-utility-1-opacity-1 font-normal text-unset"
					>
						{tip}
					</small>
				</div>
			)}
		</div>
	);
}

"use client";

import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { _theme_ } from "../utils/store";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

type InputProps = {
	label?: string;
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
	type?: "text" | "password" | "number";
	className?: string;
	tip?: string;
	maxValue?: number;
};

export default function Input({
	label,
	placeholder,
	value,
	onChange,
	type = "text",
	className,
	tip,
	maxValue,
}: InputProps) {
	const [focused, setFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const isPassword = type === "password";
	const inputType =
		type !== "password"
			? type
			: isPassword && !showPassword
			? "password"
			: "text";

	const theme = useAtomValue(_theme_);
	const iconColor = theme === "dark" ? "#48ff91" : "#0500ff";

	return (
		<div className={clsx("text-start", className)}>
			{label && (
				<div className="mb-3">
					<div>
						<p className="typography-subheader-14 text-utility-1-opacity-1 font-medium text-unset">
							{label}
						</p>
					</div>
				</div>
			)}

			<div
				className={clsx(
					"input-field space-x-1 h-14 relative",
					focused && "!border-accent-light dark:!border-accent"
				)}
			>
				<input
					placeholder={placeholder}
					onBlur={() => setFocused(false)}
					onFocus={() => setFocused(true)}
					className="ph-no-capture w-full block flex-1 outline-none bg-transparent typography-subheader-16 font-medium text-left"
					spellCheck="false"
					type={inputType}
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>

				{type === "number" && typeof maxValue === "number" && (
					<button
						onClick={() => onChange(maxValue.toString())}
						className="!text-accent !font-semibold absolute right-5 top-1/2 !-translate-y-1/2 cursor-pointer"
					>
						MAX
					</button>
				)}

				{type === "password" && (
					<div className="flex items-center">
						<button
							onClick={() => setShowPassword((prev) => !prev)}
							type="button"
							className="cursor-pointer p-0.5 outline-none bg-transparent"
							tabIndex={-1}
						>
							{showPassword ? (
								<MdVisibilityOff size={18} color={iconColor} />
							) : (
								<MdVisibility size={18} color={iconColor} />
							)}
						</button>
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

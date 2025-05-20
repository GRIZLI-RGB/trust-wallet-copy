"use client";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";

interface NavButtonProps {
	icon: React.ReactNode;
	label: string;
	link: string;
}

const NavButton = ({ icon, label, link }: NavButtonProps) => {
	const router = useRouter();
	const pathname = usePathname();

	const isActive = pathname === link;

	const getActiveIcon = () => {
		if (!isActive) return icon;

		return React.cloneElement(icon as React.ReactElement, {
			// @ts-expect-error: ""
			children: React.Children.map(
				// @ts-expect-error: ""
				(icon as React.ReactElement).props.children,
				(child) => {
					if (React.isValidElement(child)) {
						// @ts-expect-error: ""
						const className = child.props.className || "";
						const newClassName = className
							.replace(
								/text-utility-1-opacity-\d+/g,
								"text-primary-default"
							)
							.replace(
								/text-utility-1-default/g,
								"text-primary-default"
							);
						return React.cloneElement(child, {
							// @ts-expect-error: ""
							className: newClassName,
						});
					}
					return child;
				}
			),
		});
	};

	return (
		<div
			className={clsx(
				"flex flex-col w-16 py-2 text-center items-center",
				!isActive && "cursor-pointer hover:opacity-65"
			)}
			role="button"
			onClick={() => router.push(link)}
		>
			<span className="flex justify-center mb-0.5">
				{getActiveIcon()}
			</span>
			<small
				className={`typography-caption-12 font-medium text-unset ${
					isActive ? "text-primary-default" : "text-utility-1-default"
				}`}
			>
				{label}
			</small>
		</div>
	);
};

export default function WalletLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Toaster />

			<Tooltip id="default-tooltip" />

			{children}

			<div className="flex flex-col bg-[#1b1b1c] z-[10]">
				<div className="flex items-center z-10 flex-shrink-0 self-center w-full justify-between h-[72px] px-6 border-t border-utility-1-opacity-5 md:max-w-[438px]">
					<NavButton
						label="Home"
						link="/wallet"
						icon={
							<svg
								fill="none"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									className="text-utility-1-opacity-3"
									d="M21 11L20.9999 21H15V13H9V21H3V11L12 2L21 11Z"
									fill="currentColor"
								></path>
								<rect
									className="text-utility-1-opacity-1"
									width="6"
									height="8"
									transform="matrix(1 0 0 -1 9 21)"
									fill="currentColor"
								></rect>
							</svg>
						}
					/>
					<NavButton
						label="Earn"
						link="/wallet/earn"
						icon={
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									className="text-utility-1-opacity-1"
									fillRule="evenodd"
									clipRule="evenodd"
									d="M4.90228 16C5.68005 17.0596 6.68938 17.9386 7.8557 18.5625H16.1443C17.3106 17.9386 18.3199 17.0596 19.0977 16H22V22H2V16H4.90228Z"
									fill="currentColor"
								/>
								<path
									className="text-utility-1-opacity-3"
									fillRule="evenodd"
									clipRule="evenodd"
									d="M20.7988 10.7988C20.7988 5.93937 16.8595 2 12 2C7.14054 2 3.20117 5.93937 3.20117 10.7988C3.20117 14.1599 5.08568 17.0807 7.8557 18.5625H16.1443C18.9143 17.0807 20.7988 14.1599 20.7988 10.7988ZM8.22907 10.7988L12 14.5698L15.7709 10.7988L12 7.0279L8.22907 10.7988Z"
									fill="currentColor"
								/>
							</svg>
						}
					/>
					<NavButton
						label="History"
						link="/wallet/history"
						icon={
							<svg
								fill="none"
								width="25"
								height="24"
								viewBox="0 0 25 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									className="text-utility-1-opacity-1"
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12.6009 22H4.5V2H14.5L20.5 8V10.6738C19.5908 10.2419 18.5737 10.0002 17.5001 10.0002C13.6341 10.0002 10.5001 13.1343 10.5001 17.0002C10.5001 18.9588 11.3045 20.7295 12.6009 22ZM7.5 6H11.5V8H7.5V6Z"
									fill="currentColor"
								></path>
								<path
									className="text-utility-1-opacity-1"
									d="M14.5 2V8H20.5L14.5 2Z"
									fill="currentColor"
								></path>
								<path
									className="text-utility-1-opacity-3"
									d="M13.8929 11H7.5V13H11.755C12.3182 12.1926 13.0474 11.5094 13.8929 11Z"
									fill="currentColor"
								></path>
								<path
									className="text-utility-1-opacity-3"
									d="M10.571 16C10.5243 16.3267 10.5001 16.6606 10.5001 17.0002C10.5001 17.3397 10.5243 17.6735 10.571 18H7.5V16H10.571Z"
									fill="currentColor"
								></path>
								<path
									className="text-utility-1-opacity-3"
									fillRule="evenodd"
									clipRule="evenodd"
									d="M22.5 17C22.5 14.2386 20.2614 12 17.5 12C14.7386 12 12.5 14.2386 12.5 17C12.5 19.7614 14.7386 22 17.5 22C20.2614 22 22.5 19.7614 22.5 17ZM18.25 16.6893V13.5935H16.75V17.3107L18.9819 19.5426L20.0426 18.4819L18.25 16.6893Z"
									fill="currentColor"
								></path>
							</svg>
						}
					/>
					<NavButton
						label="Settings"
						link="/wallet/settings"
						icon={
							<svg
								fill="none"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									className="text-utility-1-opacity-3"
									fillRule="evenodd"
									clipRule="evenodd"
									d="M14.9854 4.3911L17.0516 5.58574L19.7229 5.4254L21.5411 8.57458L20.0672 10.8069V13.1931L21.5411 15.4254L19.7229 18.5746L17.0516 18.4143L14.9854 19.6089L13.7899 22H10.1535L8.95798 19.6089L6.89185 18.4142L4.22053 18.5746L2.40234 15.4254L3.87625 13.1931V10.8069L2.40234 8.5746L4.22053 5.42542L6.89185 5.58576L8.95798 4.3911L10.1535 2H13.7899L14.9854 4.3911ZM11.9955 6.5457C15.0079 6.5457 17.45 8.98778 17.45 12.0002C17.45 15.0127 15.0079 17.4548 11.9955 17.4548C8.98299 17.4548 6.54091 15.0127 6.54091 12.0002C6.54091 8.98778 8.98299 6.5457 11.9955 6.5457Z"
									fill="currentColor"
								></path>
								<path
									className="text-utility-1-opacity-1"
									d="M9.26953 12.0002L11.9968 9.27295L14.7241 12.0002L11.9968 14.7275L9.26953 12.0002Z"
									fill="currentColor"
								></path>
							</svg>
						}
					/>
				</div>
			</div>
		</>
	);
}

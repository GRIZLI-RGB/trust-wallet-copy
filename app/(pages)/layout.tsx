"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import clsx from "clsx";
import { ClipLoader } from "react-spinners";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
	_globalLoading_,
	_theme_,
	_userApproved_,
	_userAuth_,
	_userLoading_,
} from "../utils/store";
import { walletSettings } from "../utils/api";

export default function PagesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	const globalLoading = useAtomValue(_globalLoading_);
	const setUserAuth = useSetAtom(_userAuth_);
	const setUserApproved = useSetAtom(_userApproved_);
	const [userLoading, setUserLoading] = useAtom(_userLoading_);

	const theme = useAtomValue(_theme_);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			if (pathname !== "/auth") window.location.href = "/auth";
			setUserLoading(false);
		}

		if (token) {
			walletSettings()
				.then((res) => {
					setUserAuth(true);
					setUserApproved(res.data.data.user?.is_approved || false);
				})
				.catch(() => {
					if (pathname !== "/auth") window.location.href = "/auth";
				})
				.finally(() => setUserLoading(false));
		}
	}, [pathname]);

	return (
		<>
			<div
				className={clsx(
					"fixed top-0 left-0 bottom-0 right-0 w-screen h-screen flex-middle",
					userLoading || globalLoading
						? "opacity-100 z-[100] bg-white dark:bg-[#18181b]"
						: "opacity-0 pointer-events-none"
				)}
			>
				<ClipLoader
					color={theme === "dark" ? "#48ff91" : "#0500ff"}
					size={64}
				/>
			</div>

			{children}
		</>
	);
}

"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import clsx from "clsx";
import { ClipLoader } from "react-spinners";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { _globalLoading_, _userAuth_, _userLoading_ } from "../utils/store";
import { walletSettings } from "../utils/api";

export default function PagesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	const globalLoading = useAtomValue(_globalLoading_);
	const setUserAuth = useSetAtom(_userAuth_);
	const [userLoading, setUserLoading] = useAtom(_userLoading_);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			if (pathname !== "/auth") window.location.href = "/auth";
			setUserLoading(false);
		}

		if (token) {
			walletSettings()
				.then(() => setUserAuth(true))
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
						? "opacity-100 z-[100] bg-[#18181b]"
						: "opacity-0 pointer-events-none"
				)}
			>
				<ClipLoader color="#48ff91" size={64} />
			</div>

			{children}
		</>
	);
}

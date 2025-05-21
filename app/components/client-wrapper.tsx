"use client";

import { useAtomValue } from "jotai";
import { useEffect } from "react";

import { _theme_ } from "../utils/store";

export default function ClientWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const theme = useAtomValue(_theme_);

	useEffect(() => {
		if (typeof document !== "undefined") {
			document.documentElement.setAttribute("data-theme", theme);
		}
	}, [theme]);

	return children;
}

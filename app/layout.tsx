import type { Metadata } from "next";

import "./styles/globals.css";

export const metadata: Metadata = {
	title: "Trust Wallet",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-theme="dark">
			<body className={`antialiased`}>
				<div id="root" data-id="root">
					{children}
				</div>
			</body>
		</html>
	);
}

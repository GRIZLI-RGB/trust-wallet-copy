import type { Metadata } from "next";

import "./styles/globals.css";
import ClientWrapper from "./components/client-wrapper";

export const metadata: Metadata = {
	title: "Trust Wallet",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>
				<div id="root" data-id="root">
					<ClientWrapper>{children}</ClientWrapper>
				</div>
			</body>
		</html>
	);
}

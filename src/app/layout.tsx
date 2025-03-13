import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Lighthouse for MCC Island",
	description: "An all-in-one stats website for MCC Island! View player statistics, track your trophies and badges, see your cosmetic collection and more!",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en">
			<body className="">
				{children}
			</body>
		</html>
	);
}
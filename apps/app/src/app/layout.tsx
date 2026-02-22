import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "@skimr/ui/globals.css";

import { Providers } from "@/components/providers";

const jetBrainsMono = JetBrains_Mono({
	variable: "--font-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Skimr",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${jetBrainsMono.variable} font-sans antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}

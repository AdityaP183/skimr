import { Providers } from "@/components/providers";
import "@skimr/ui/globals.css";
import { Geist, JetBrains_Mono } from "next/font/google";

const fontSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${fontSans.variable} ${fontMono.variable} font-mono antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}

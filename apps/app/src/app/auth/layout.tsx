export default function AuthPage({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className="w-full min-h-screen flex">
			<div className="w-full bg-card flex flex-row">
				<div className="flex-1 w-full relative">
					{/* Orchid Depths */}
					<div
						className="absolute inset-0 z-0"
						style={{
							background:
								"radial-gradient(125% 125% at 50% 10%, #000000 40%, #350136 100%)",
						}}
					/>
					{/* Your Content/Components */}
				</div>
				<div className="flex-1 w-full">{children}</div>
			</div>
		</section>
	);
}

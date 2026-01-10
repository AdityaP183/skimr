"use client";

import { Button } from "@skimr/ui/components/button";

export default function Home() {
	const fetchData = async () => {
		const response = await fetch("http://localhost:8000/api");
		const data = await response.json();
		console.log(data);
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<Button size="lg" onClick={fetchData}>
				Click me
			</Button>
		</div>
	);
}

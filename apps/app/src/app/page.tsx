import { cookies } from "next/headers";

import { Button } from "@skimr/ui/components/button";
import Link from "next/link";

export default async function Home() {
	const cookieStore = await cookies();

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/users/me`,
		{
			method: "GET",
			headers: {
				Cookie: cookieStore.toString(),
			},
			cache: "no-store",
		},
	);

	const userInfo = await response.json();

	console.log(userInfo);

	return (
		<div className="flex items-center justify-center h-screen flex-col">
			{response.status === 200 && (
				<div>
					<span>User Logged In:</span>
					<p>{JSON.stringify(userInfo)}</p>
				</div>
			)}

			<br />
			<br />

			<div className="grid grid-cols-2">
				<Button>
					<Link href="/auth/sign-up">Sign Up</Link>
				</Button>
				<Button>
					<Link href="/auth/sign-in">Sign In</Link>
				</Button>
			</div>
		</div>
	);
}

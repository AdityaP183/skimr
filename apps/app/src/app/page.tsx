"use client";

import { Button } from "@skimr/ui/components/button";
import Link from "next/link";
import { authClient } from "@/utils/auth-client";
import { toast } from "@skimr/ui/components/sonner";

export default function Home() {
	const { data: session, error } = authClient.useSession();

	const handleLogOut = async () => {
		const { data, error } = await authClient.signOut();

		if (error) {
			toast.error("Error logging out user!");
			console.log(error.message);
		} else {
			toast.success("User logged out successfully!", {
				description: JSON.stringify(data),
			});
		}
	};

	return (
		<div className="flex items-center justify-center h-screen flex-col">
			{session ? (
				<div className="w-xl">
					<span>User Logged In:</span>
					<p>{JSON.stringify(session)}</p>
				</div>
			) : (
				<div>
					<span>User Not Logged In</span>
				</div>
			)}

			{error && (
				<div>
					<span>Error: {error.message}</span>
					<p>{JSON.stringify(error)}</p>
				</div>
			)}

			<br />
			<br />

			<div className="grid grid-cols-2">
				{!session ? (
					<>
						<Button>
							<Link href="/auth/sign-up">Sign Up</Link>
						</Button>
						<Button>
							<Link href="/auth/sign-in">Sign In</Link>
						</Button>
					</>
				) : (
					<Button onClick={handleLogOut}>Log Out</Button>
				)}
			</div>
		</div>
	);
}

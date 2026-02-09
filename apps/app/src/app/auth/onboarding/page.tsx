import { cn } from "@skimr/ui/lib/utils";
import AddProfileData from "./_components/add-profile-data";
import { buttonVariants } from "@skimr/ui/components/button";
import Link from "next/link";

export default function OnboardingPage() {
	const user = {
		session: {
			expiresAt: "2026-01-28T15:51:30.690Z",
			token: "Wp1haiBhXfd2EgPj0FCutLQsi2rXrDGj",
			createdAt: "2026-01-21T15:51:30.690Z",
			updatedAt: "2026-01-21T15:51:30.690Z",
			ipAddress: "",
			userAgent:
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
			userId: "rRLno066UUdKGggWUSaj2VAkA6CcyFve",
			id: "Fjkj8ZgYJO4b8iDbwswVUKgTBfoPc83q",
		},
		user: {
			name: "John Cena",
			email: "adityaprasad1837@gmail.com",
			emailVerified: false,
			image: null,
			createdAt: "2026-01-21T15:29:36.754Z",
			updatedAt: "2026-01-21T15:29:36.754Z",
			id: "rRLno066UUdKGggWUSaj2VAkA6CcyFve",
		},
	};

	return (
		<div className="flex items-center justify-center w-full min-h-screen relative">
			<div className="flex flex-col items-center">
				<AddProfileData info={user}/>
			</div>

            <div
				className={cn(
					"absolute top-10 right-20",
					buttonVariants({
						variant: "outline",
					}),
				)}
			>
				<Link
					href="/auth/sign-up"
					className="no-underline hover:underline"
				>
					Sign Up
				</Link>
			</div>
		</div>
	);
}

import { authClient } from "@/utils/auth-client";

export default async function TestingPage() {
	const user = await authClient.getSession();

	return (
		<div className="w-full min-h-screen flex items-center justify-center">
			User Session
            <br />
			{user ? "No Session found" : JSON.stringify(user)}
		</div>
	);
}

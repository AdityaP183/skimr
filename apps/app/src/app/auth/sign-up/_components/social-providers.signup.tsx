"use client";

import { signIn } from "@/utils/auth-client";
import { SocialButton } from "@skimr/ui/components/social-button";
import { toast } from "@skimr/ui/components/sonner";
import { useRouter } from "next/navigation";

export default function SocialProviderSignUp() {
	const router = useRouter();
	async function googleSignUp() {
		const response = await signIn.social({
			provider: "google",
			callbackURL: process.env.NEXT_PUBLIC_APP_URL,
		});

		if (response.data) {
			toast.success("Google sign-up successful");
            router.push("/");
		} else {
			toast.error("Google sign-up failed");
		}
	}

	return (
		<div className="flex items-center gap-5 w-full">
			<SocialButton
				size="lg"
				className="flex-1"
				text="Google"
				onClick={googleSignUp}
			/>
			<SocialButton
				size="lg"
				className="flex-1"
				text="Apple"
				socials="apple"
			/>
		</div>
	);
}

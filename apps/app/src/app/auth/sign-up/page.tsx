import { buttonVariants } from "@skimr/ui/components/button";
import { Separator } from "@skimr/ui/components/separator";
import { cn } from "@skimr/ui/lib/utils";
import Link from "next/link";
import EmailPasswordSignUp from "./_components/email-password.signup";
import SocialProviderSignUp from "./_components/social-providers.signup";

export default function SignUpPage() {
	return (
		<div className="flex items-center justify-center w-full min-h-screen relative">
			<div className="flex flex-col items-center w-sm">
				<h1 className="text-2xl font-bold mb-5">Create an account</h1>
				<SocialProviderSignUp />

				<div className="my-6 w-full flex items-center justify-center gap-2 overflow-hidden">
					<Separator className="flex-1" />
					<span className="text-[13px] text-muted-foreground text-nowrap">
						OR CONTINUE WITH EMAIL
					</span>
					<Separator className="flex-1" />
				</div>
				<EmailPasswordSignUp />
				<div className=" my-4">
					<p className="text-sm text-muted-foreground text-center">
						By continuing, you agree to our{" "}
						<Link href="#" className="text-white/80">
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link href="#" className="text-white/80">
							Privacy Policy
						</Link>
					</p>
				</div>
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
					href="/auth/sign-in"
					className="no-underline hover:underline"
				>
					Sign In
				</Link>
			</div>
		</div>
	);
}

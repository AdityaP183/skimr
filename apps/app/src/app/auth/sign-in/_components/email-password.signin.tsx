"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signInFormSchema } from "@/utils/schemas/auth.schema";
import { Button } from "@skimr/ui/components/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@skimr/ui/components/form";
import { Input } from "@skimr/ui/components/input";
import { toast } from "@skimr/ui/components/sonner";
import { Eye, EyeOff, LoaderPinwheel, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/utils/auth-client";

export default function EmailPasswordSignIn() {
	const [isVisible, setIsVisible] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof signInFormSchema>>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof signInFormSchema>) {
		setIsSubmitting(true);
		try {
			const response = await authClient.signIn.email({
				...values,
				rememberMe: true,
				callbackURL: "/",
			});

			if (response.data) {
				toast.success("User logged in successfully", {
					description: `Welcome back, ${response.data.user.name || response.data.user.email.split("@")[0]}!`,
				});
			}
		} catch (error) {
			toast.error("Failed to sign-in", {
				description:
					error instanceof Error
						? error.message
						: "An unknown error occurred while signing in",
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="w-full">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<div className="relative">
										<div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
											<Mail className="size-4" />
											<span className="sr-only">
												Email
											</span>
										</div>
										<Input
											type="email"
											className="pl-9"
											placeholder="john12@example.com"
											{...field}
										/>
									</div>
								</FormControl>
								<FormDescription className="text-sm">
									Enter a valid email.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<div className="relative">
										<div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
											<LockKeyhole className="size-4" />
											<span className="sr-only">
												Password
											</span>
										</div>
										<Input
											type={
												isVisible ? "text" : "password"
											}
											className="px-9"
											{...field}
										/>
										<Button
											variant="ghost"
											size="icon"
											onClick={() =>
												setIsVisible(
													(prevState) => !prevState,
												)
											}
											className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
										>
											{isVisible ? <EyeOff /> : <Eye />}
											<span className="sr-only">
												{isVisible
													? "Hide password"
													: "Show password"}
											</span>
										</Button>
									</div>
								</FormControl>
								<FormMessage className="text-wrap" />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="w-full"
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<LoaderPinwheel className="animate-spin" />
						) : (
							"Submit"
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}

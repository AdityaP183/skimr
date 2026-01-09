import { z } from "zod/v4";

export const signUpFormSchema = z.object({
	name: z
		.string()
		.min(3, "Name must be at least 3 characters")
		.max(50, "Name must be under 50 characters"),

	email: z.string().email("Enter a valid email address").toLowerCase(),

	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(100)
		.regex(/[A-Z]/, "Must include at least one uppercase letter")
		.regex(/[a-z]/, "Must include at least one lowercase letter")
		.regex(/[0-9]/, "Must include at least one number"),
});

export const signInFormSchema = z.object({
	email: z.string().email("Enter a valid email address").toLowerCase(),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(100)
		.regex(/[A-Z]/, "Must include at least one uppercase letter")
		.regex(/[a-z]/, "Must include at least one lowercase letter")
		.regex(/[0-9]/, "Must include at least one number"),
});

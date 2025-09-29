import { prisma } from "@skimr/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	trustedOrigins:
		process.env.NODE_ENV === "production"
			? [process.env.APP1_URL, process.env.APP2_URL].filter(
					(url): url is string => typeof url === "string" && !!url,
				)
			: ["http://localhost:3000", "http://localhost:3001"],
});

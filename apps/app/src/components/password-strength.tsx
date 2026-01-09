"use client";

import { cn } from "@skimr/ui/lib/utils";

type PasswordStrengthProps = {
	password?: string;
	className?: string;
};

const rules = [
	{
		label: "At least 8 characters",
		test: (v: string) => v.length >= 8,
	},
	{
		label: "One uppercase letter (A–Z)",
		test: (v: string) => /[A-Z]/.test(v),
	},
	{
		label: "One lowercase letter (a–z)",
		test: (v: string) => /[a-z]/.test(v),
	},
	{
		label: "One number (0–9)",
		test: (v: string) => /[0-9]/.test(v),
	},
];

export function PasswordStrength({
	password = "",
	className,
}: PasswordStrengthProps) {
	const passed = rules.filter((rule) => rule.test(password)).length;
	const strength = (passed / rules.length) * 100;

	const strengthLabel =
		passed === 0
			? "Very weak"
			: passed === 1
			? "Weak"
			: passed === 2
			? "Fair"
			: passed === 3
			? "Good"
			: "Strong";

	return (
		<div className={cn("space-y-3", className)}>
			<div className="space-y-1">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">
						Password strength
					</span>
					<span className="font-medium">{strengthLabel}</span>
				</div>
				<div className="h-2 w-full rounded-full bg-muted">
					<div
						className={cn(
							"h-full rounded-full transition-all",
							strength <= 25 && "bg-destructive",
							strength > 25 &&
								strength <= 50 &&
								"bg-orange-500",
							strength > 50 &&
								strength <= 75 &&
								"bg-yellow-500",
							strength > 75 && "bg-green-500",
						)}
						style={{ width: `${strength}%` }}
					/>
				</div>
			</div>

			<ul className="space-y-1 text-sm">
				{rules.map((rule) => {
					const valid = rule.test(password);
					return (
						<li
							key={rule.label}
							className={cn(
								"flex items-center gap-2",
								valid
									? "text-green-600"
									: "text-muted-foreground",
							)}
						>
							<span
								className={cn(
									"h-2 w-2 rounded-full",
									valid
										? "bg-green-600"
										: "bg-muted-foreground",
								)}
							/>
							{rule.label}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

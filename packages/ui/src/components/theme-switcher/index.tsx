"use client";

import LargeSwitcher from "@skimr/ui/components/theme-switcher/large-switcher";
import { cn } from "@skimr/ui/lib/utils";
import { useTheme } from "next-themes";

export type ThemeKey = "light" | "dark" | "system" | undefined;
interface ThemeSwitcherProps {
	className?: string;
	switcherType?: "normal" | "compact";
}
export interface ThemeSwitcherLargeProps {
	theme: string | undefined;
	setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export default function ThemeSwitcher({
	switcherType = "normal",
	className,
}: ThemeSwitcherProps) {
	const { setTheme, resolvedTheme } = useTheme();
	return (
		<div
			className={cn(
				"bg-accent/20 ring-accent relative isolate flex h-8 rounded-full p-1 ring-1",
				className,
			)}
		>
			<LargeSwitcher theme={resolvedTheme} setTheme={setTheme} />
		</div>
	);
}

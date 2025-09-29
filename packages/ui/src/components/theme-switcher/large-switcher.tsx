import { Button } from "@skimr/ui/components/button";
import { ThemeSwitcherLargeProps } from "@skimr/ui/components/theme-switcher";
import { themes } from "@skimr/ui/lib/ui-data";
import { cn } from "@skimr/ui/lib/utils";

export default function LargeSwitcher({
	theme,
	setTheme,
}: ThemeSwitcherLargeProps) {
	return (
		<div className="flex w-full items-center justify-between gap-1">
			{themes.map(({ key, icon: Icon, label }) => (
				<Button
					key={key}
					aria-label={label}
					className={cn(
						"hover:bg-accent text-foreground flex h-6 w-5 items-center justify-center rounded-full bg-transparent p-1",
						theme === key && "bg-secondary text-secondary-foreground ring-border ring-1 hover:bg-secondary",
					)}
					onClick={() => setTheme(key)}
				>
					<Icon className="size-4" />
				</Button>
			))}
		</div>
	);
}

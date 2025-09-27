import type { Icon } from "@tabler/icons-react";
import { IconChartBar, IconDashboard } from "@tabler/icons-react";

export const sidebarData: { title: string; url: string; icon: Icon }[] = [
	{
		title: "Dashboard",
		url: "/",
		icon: IconDashboard,
	},
	{
		title: "Analytics",
		url: "/analytics",
		icon: IconChartBar,
	},
];

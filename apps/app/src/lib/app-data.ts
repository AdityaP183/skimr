import type { Icon } from "@tabler/icons-react";
import { IconChartBar, IconDashboard } from "@tabler/icons-react";

export const sidebarData = {
	navMain: [
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
	],
	navFooter: [
		{
			title: "Settings",
			url: "/settings",
			icon: IconDashboard,
		},
	],
};

export type SidebarDataType = (typeof sidebarData)["navMain"][number];

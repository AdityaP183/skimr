import {
	IconChartBar,
	IconDashboard,
	IconSettings2,
} from "@tabler/icons-react";

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
		{
			title: "Settings",
			url: "/settings",
			icon: IconSettings2,
		},
	],
	navFooter: [],
};

export type SidebarDataType = (typeof sidebarData)["navMain"][number];

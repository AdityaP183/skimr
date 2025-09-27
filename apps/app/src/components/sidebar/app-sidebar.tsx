"use client";

import { sidebarData } from "@/lib/app-data";
import { Button } from "@skimr/ui/components/button";
import { LogoStyled } from "@skimr/ui/components/logo";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@skimr/ui/components/sidebar";
import {
	IconLayoutSidebarLeftExpand,
	IconLayoutSidebarRightExpand,
} from "@tabler/icons-react";
import * as React from "react";
import { NavMain } from "./nav-main";
import NavPinnedTags from "./nav-pinned-tags";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export default function AppSidebar({ ...props }: AppSidebarProps) {
	const { open, toggleSidebar } = useSidebar();

	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu className="flex-row items-center justify-between">
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<a href="#">
								<LogoStyled width={25} height={25} />
								<span className="text-xl font-semibold">
									Skimr
								</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<Button
							onClick={toggleSidebar}
							variant={"ghost"}
							size={"icon"}
						>
							{open ? (
								<IconLayoutSidebarLeftExpand className="size-5" />
							) : (
								<IconLayoutSidebarRightExpand className="size-5" />
							)}
						</Button>
					</SidebarMenuItem>
				</SidebarMenu>
				<NavMain items={sidebarData} className="px-0 py-2" />
			</SidebarHeader>
			<SidebarContent>
				<NavPinnedTags />
			</SidebarContent>
			<SidebarFooter>
				Footer
				{/* <NavUser user={data.user} /> */}
			</SidebarFooter>
		</Sidebar>
	);
}

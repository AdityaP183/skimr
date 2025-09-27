"use client";

import { Button } from "@skimr/ui/components/button";
import { ScrollArea } from "@skimr/ui/components/scroll-area";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@skimr/ui/components/sidebar";
import { IconPinnedOff } from "@tabler/icons-react";

const TAGS = [
	{ name: "Work", color: "cyan" },
	{ name: "Personal", color: "magenta" },
	{ name: "Home", color: "green" },
	{ name: "School", color: "yellow" },
	{ name: "Travel", color: "orange" },
	{ name: "Health", color: "pink" },
	{ name: "Finance", color: "violet" },
	{ name: "Shopping", color: "indigo" },
];

export default function NavPinnedTags() {
	return (
		<ScrollArea>
			<SidebarGroup className="group-data-[collapsible=icon]:hidden">
				<SidebarGroupLabel>Tags</SidebarGroupLabel>
				<SidebarMenu>
					{TAGS.map((tag) => (
						<SidebarMenuItem key={tag.name}>
							<SidebarMenuButton tooltip={tag.name} asChild>
								<div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium group-navbar">
									<div className="flex flex-1 items-center gap-2">
										<div
											className="h-2 w-2 rounded-full"
											style={{
												backgroundColor: tag.color,
											}}
										/>
										<span>{tag.name}</span>
									</div>
									<div className="opacity-0 transition-opacity group-navbar-hover:opacity-100">
										<Button size="icon" variant="ghost">
											<IconPinnedOff />
										</Button>
									</div>
								</div>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroup>
		</ScrollArea>
	);
}

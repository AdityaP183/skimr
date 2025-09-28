"use client";

import { ScrollArea } from "@skimr/ui/components/scroll-area";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@skimr/ui/components/sidebar";
import NavTagItem from "./nav-tag-item";

const TAGS = [
	{ id: 1, name: "Work", isPinned: true },
	{ id: 2, name: "Personal", isPinned: true },
	{ id: 3, name: "Home", isPinned: false },
	{ id: 4, name: "School", isPinned: false },
	{ id: 5, name: "Travel", isPinned: false },
	{ id: 6, name: "Health", isPinned: false },
	{ id: 7, name: "Finance", isPinned: false },
	{ id: 8, name: "Shopping", isPinned: false },
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
								<NavTagItem tag={tag} key={tag.id} />
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroup>
		</ScrollArea>
	);
}

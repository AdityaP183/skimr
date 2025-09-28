"use client";

import type { SidebarDataType } from "@/lib/app-data";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@skimr/ui/components/sidebar";
import { cn } from "@skimr/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavFooterProps {
	items: SidebarDataType[];
	className?: string;
}

export default function NavFooter({ items, className }: NavFooterProps) {
    const pathname = usePathname();

	return (
		<SidebarGroup className={className}>
			<SidebarGroupContent className="flex flex-col gap-2">
				{/* Footer Items */}
				<SidebarGroupContent>
					<SidebarMenu>
						{items.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton tooltip={item.title} asChild>
									<Link
										href={item.url}
										className={cn(
											pathname === item.url
												? "bg-sidebar-accent-active text-sidebar-accent-foreground"
												: "hover:bg-accent hover:text-accent-foreground active:bg-accent active:text-accent-foreground",
											"flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
										)}
									>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroupContent>

				{/* <SidebarMenu>
					<SidebarMenuItem className="flex items-center gap-2">
						<SidebarMenuButton
							tooltip="Quick Create"
							className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
						>
							<IconCirclePlusFilled />
							<span>Quick Create</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu> */}
			</SidebarGroupContent>
		</SidebarGroup>
	);
}

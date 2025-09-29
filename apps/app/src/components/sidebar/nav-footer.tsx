"use client";

import type { SidebarDataType } from "@/lib/app-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@skimr/ui/components/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@skimr/ui/components/dropdown-menu";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@skimr/ui/components/sidebar";
import ThemeSwitcher from "@skimr/ui/components/theme-switcher";
import { useIsMobile } from "@skimr/ui/hooks/use-mobile";
import { cn } from "@skimr/ui/lib/utils";
import { IconCreditCard, IconDotsVertical, IconLogout, IconNotification, IconUserCircle } from "@tabler/icons-react";
import { ThemeSwitcherOff } from "../ui/shadcn-io/theme-switcher";


interface NavFooterProps {
	items: SidebarDataType[];
	className?: string;
}

interface User {
	name: string;
	email: string;
	avatar: string;
}

export default function NavFooter({ items, className }: NavFooterProps) {
	const pathname = usePathname();
	const isMobile = useIsMobile();
	const user: User = {
		name: "Cameron Nelson",
		email: "3M4mO@example.com",
		avatar: "https://github.com/camnelson.png",
	};

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

						{/* Theme Switcher */}
						<SidebarMenuItem className="flex items-center justify-between">
							<span>Theme:</span>
							<ThemeSwitcher />
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>

				<SidebarMenu>
					<SidebarMenuItem className="bg-accent/50 hover:bg-accent data-[state=open]:bg-accent active:bg-accent text-accent-foreground rounded-md">
						<NavFooterUser user={user} isMobile={isMobile} />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}

interface NavFooterUserProps {
	user: User;
	isMobile?: boolean;
}

function NavFooterUser({ user, isMobile }: NavFooterUserProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<Avatar className="h-8 w-8 rounded-lg grayscale">
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback className="rounded-lg">
							CN
						</AvatarFallback>
					</Avatar>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium">
							{user.name}
						</span>
						<span className="text-muted-foreground truncate text-xs">
							{user.email}
						</span>
					</div>
					<IconDotsVertical className="ml-auto size-4" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
				side={isMobile ? "bottom" : "right"}
				align="end"
				sideOffset={4}
			>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar className="h-8 w-8 rounded-lg">
							<AvatarImage src={user.avatar} alt={user.name} />
							<AvatarFallback className="rounded-lg">
								CN
							</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-medium">
								{user.name}
							</span>
							<span className="text-muted-foreground truncate text-xs">
								{user.email}
							</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<IconUserCircle />
						Account
					</DropdownMenuItem>
					<DropdownMenuItem>
						<IconCreditCard />
						Billing
					</DropdownMenuItem>
					<DropdownMenuItem>
						<IconNotification />
						Notifications
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<IconLogout />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

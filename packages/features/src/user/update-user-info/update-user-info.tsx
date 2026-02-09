"use client"

import { cn } from "@skimr/ui/lib/utils";
import Image from "next/image";

interface UpdateUserInfoProps {
	className?: string;
}

export function UpdateUserInfo({ className }: UpdateUserInfoProps) {
	return (
		<div className={cn("w-full", className)}>
			{/* Profile Image */}

			{/* Workspace Icon */}
			<div className="space-y-2">
                hello
			</div>
			{/* Workspace Name */}
			{/* Workspace Url */}
		</div>
	);
}

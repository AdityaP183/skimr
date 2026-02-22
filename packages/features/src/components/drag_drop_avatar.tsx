"use client";

import { cn } from "@skimr/ui/lib/utils";

export interface UploadedFile {
	imgFile: File;
	img: string;
	name: string;
}

interface DragNDropImageProps {
	className?: string;
	file: UploadedFile | null;
	setFile: (file: UploadedFile | null) => void;
	ratio?: "square" | "rectangle";
	width?: string;
	height?: string;
	fill?: "contain" | "cover";
}

export function DragNDropImage({
    className,
	setFile,
	ratio,
	width,
	height,
	fill = "cover",
}: DragNDropImageProps) {
	return (
		<div className={cn("w-full", className)}>
			<div className=""></div>
		</div>
	);
}

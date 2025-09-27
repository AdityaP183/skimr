import Image from "next/image";
import React from "react";

interface BaseLogoProps {
	className?: string;
	width?: number;
	height?: number;
}

interface LogoStyledProps
	extends BaseLogoProps,
		React.HTMLAttributes<HTMLDivElement> {
	divClassName?: string;
}

export function Logo({ className, width = 50, height = 50 }: BaseLogoProps) {
	return (
		<Image
			src="/logo.svg"
			alt="Skimr"
			width={width}
			height={height}
			className={className}
			priority
		/>
	);
}
Logo.displayName = "Logo";

export function LogoStyled({
	divClassName,
	className,
	width = 50,
	height = 50,
	...divProps
}: LogoStyledProps) {
	return (
		<div className={divClassName} {...divProps}>
			<Image
				src="/logo.svg"
				alt="Skimr"
				width={width}
				height={height}
				className={className}
				priority
			/>
		</div>
	);
}
LogoStyled.displayName = "LogoStyled";

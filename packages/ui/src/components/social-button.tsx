import { Button, buttonVariants } from "@skimr/ui/components/button";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@skimr/ui/lib/utils";
import { Apple, Google } from "@skimr/ui/components/svg-icons";

type Socials = "google" | "apple";

type SocialButtonProps = ButtonPrimitive.Props &
	VariantProps<typeof buttonVariants> & { text?: string; socials?: Socials };

function SocialButton({
	className,
	text,
	socials = "google",
	variant = "outline",
	size = "default",
	...props
}: SocialButtonProps) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(
				"flex items-center gap-3",
				buttonVariants({ variant, size, className }),
			)}
			{...props}
		>
			<span>
				{socials === "google" ? (
					<Google className="size-4" />
				) : (
					<Apple className="size-4.5"/>
				)}
			</span>
			<span className="font-semibold">{text}</span>
		</ButtonPrimitive>
	);
}

export { SocialButton };

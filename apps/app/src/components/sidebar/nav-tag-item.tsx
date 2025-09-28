import { Button } from "@skimr/ui/components/button";
import { IconPinnedFilled, IconPinnedOff, IconTag } from "@tabler/icons-react";

interface Tag {
	id: number;
	name: string;
	isPinned?: boolean;
}

interface NavTagItemProps {
	tag: Tag;
}

export default function NavTagItem({ tag }: NavTagItemProps) {
	return (
		<div className="group/item flex items-center gap-2 text-sm font-medium">
			<div className="flex flex-1 items-center gap-2 hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-full">
				<IconTag className="text-primary h-4 w-4" />
				<span>{tag.name}</span>
			</div>

			{tag.isPinned ? (
				<Button size="icon" variant="ghost">
					<IconPinnedFilled />
				</Button>
			) : (
				<div className="opacity-0 group-hover/item:opacity-100">
					<Button size="icon" variant="ghost">
						<IconPinnedOff />
					</Button>
				</div>
			)}
		</div>
	);
}

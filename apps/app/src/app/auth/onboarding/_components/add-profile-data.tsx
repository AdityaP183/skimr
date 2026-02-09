"use client";

import { generateRandomSuffix, slugify } from "@/utils/tool";
import type { onBoardingForm, UserSessionData } from "@/utils/types";
import { DragNDropImage } from "@skimr/features/components";
import { Button } from "@skimr/ui/components/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@skimr/ui/components/form";
import { Input } from "@skimr/ui/components/input";
import { toast } from "@skimr/ui/components/sonner";
import { LoaderPinwheel } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

export default function AddProfileData({ info }: { info: UserSessionData }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [suffix] = useState(() => generateRandomSuffix());

	const form = useForm<onBoardingForm>({
		defaultValues: {
			workspace_name: "",
			workspace_url: "",
			avatar: "",
		},
	});

	const workspaceName = useWatch({
		control: form.control,
		name: "workspace_name",
	});

	useEffect(() => {
		if (!workspaceName) {
			form.setValue("workspace_url", "");
			return;
		}

		const slug = slugify(workspaceName);
		form.setValue("workspace_url", `${slug}-${suffix}`);
	}, [workspaceName, suffix, form]);

	function onSubmit(values: onBoardingForm) {
		toast.message(JSON.stringify(values));
	}

	return (
		<div className="w-md">
			<div className="text-center">
				<h2 className="my-10 text-xl">
					<span className="font-bold">
						{info.user.name.split(" ")[0]}
					</span>
					, please complete your onboarding before moving on.
				</h2>
			</div>

			{/* <DragNDropImage className="my-5" /> */}

			<div className="w-full px-2">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<FormField
							control={form.control}
							name="workspace_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Workspace Name{" "}
										<span className="text-muted-foreground">
											(default)
										</span>
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription className="text-sm">
										Workspaces are like folders to organise
										content.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="workspace_url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Workspace URL{" "}
										<span className="text-muted-foreground">
											(auto-generated)
										</span>
									</FormLabel>
									<FormControl>
										<Input {...field} disabled />
									</FormControl>
									<FormDescription className="text-sm">
										This is the unique URL for your
										workspace.
									</FormDescription>
								</FormItem>
							)}
						/>

						<div className="w-full flex items-center justify-end">
							<Button
								type="submit"
								size="lg"
								className="w-40"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<LoaderPinwheel className="animate-spin" />
								) : (
									"Submit"
								)}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}

"use client";

import { Button } from '@/shared/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/shared/ui/form';
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { coursesRepository } from '../courses.repository';
import { CreateCourseListElementCommand } from '../model/types';
import { Textarea } from "@/shared/ui/textarea";
import { createCourseAction } from '../actions';
import { cn } from '@/shared/ui/utils';

const createCourseFormSchema = z.object({
	name: z.string(),
	description: z.string(),
});

const CreateCourseForm = ({
	className,
	revalidatePagePath,
}: {
	className?: string;
	revalidatePagePath: string;
}) => {
	const [isCreateTransition, startCreateTransition] = useTransition();

	const form = useForm<z.infer<typeof createCourseFormSchema>>({
		resolver: zodResolver(createCourseFormSchema),
		defaultValues: {
			description: "",
			name: ""
		},
	})

	const onSubmit = async (data: CreateCourseListElementCommand) => {
		startCreateTransition(async () => {
			createCourseAction(data, revalidatePagePath);
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn(className, "space-y-4")}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Название </FormLabel>
							<FormControl>
								<Input placeholder="название..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Описание</FormLabel>
							<FormControl>
								<Textarea placeholder="описание..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className="mt-8"
					type="submit"
					disabled={isCreateTransition}
				>
					Добавить
				</Button>
			</form>
		</Form>
	)
}

export default CreateCourseForm;
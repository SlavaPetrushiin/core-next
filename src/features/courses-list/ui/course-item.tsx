"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card"
import { CourseListElement } from "../model/types"
import { FunctionComponent, useTransition } from "react";
import { Button } from "@/shared/ui/button";

interface ICourseItemProps {
	course: CourseListElement;
	onDelete: () => Promise<void>;
}

export const CourseItem: FunctionComponent<ICourseItemProps> = ({ course, onDelete }) => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = () => {
		startTransition(async () => {
			await onDelete();
		})
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>{course.name}</CardTitle>
				<CardDescription>{course.description}</CardDescription>
			</CardHeader>
			<CardFooter>
				<Button disabled={isPending} onClick={handleDelete}>Удалить</Button>
			</CardFooter>
		</Card>
	)
}
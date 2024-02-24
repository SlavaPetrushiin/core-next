
import React from 'react'
import { coursesRepository } from '../courses.repository';
import { CourseItem } from '../ui/course-item';
import { revalidatePath } from 'next/cache';
import { deleteCourseAction } from '../actions';

const CoursesList = async ({
	revalidatePagePath,
}: {
	revalidatePagePath: string;
}) => {
	const coursesList = await coursesRepository.getCoursesList();

	const handleDeleteAction = async (courseId: string) => {
		"use server"
		deleteCourseAction({id: courseId}, revalidatePagePath)
	};

	return (
		<div className="flex flex-col gap-3">
			{coursesList.map(course => (
				<CourseItem
					key={course.id}
					course={course}
					onDelete={handleDeleteAction.bind(null, course.id)}
				/>
			))}
		</div>
	)
}

export default CoursesList;
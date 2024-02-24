import { Course } from "@prisma/client";

export type CourseListElement = Course;
export type CreateCourseListElementCommand = Pick<CourseListElement, "name" | "description">;
export type DeleteCourseListElementCommand = Pick<CourseListElement, "id">;
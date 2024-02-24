"use server";

import { revalidatePath } from "next/cache";
import { coursesRepository } from "./courses.repository";
import { CreateCourseListElementCommand, DeleteCourseListElementCommand } from "./model/types";

export const createCourseAction = async (
  command: CreateCourseListElementCommand,
  revalidatePagePath: string,
) => {
 const res =  await coursesRepository.createCourseElement(command);
 console.log({res});
  revalidatePath(revalidatePagePath);
};

export const deleteCourseAction = async (
  command: DeleteCourseListElementCommand,
  revalidatePagePath: string,
) => {
  await coursesRepository.deleteCourseElement(command);
  revalidatePath(revalidatePagePath);
};
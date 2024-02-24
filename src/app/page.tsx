import { dbClient } from "@/shared/lib/db";
import { Button } from "../shared/ui/button";
import CreateCourseForm from "@/features/courses-list/pub/create-course-form";
import CoursesList from "@/features/courses-list/pub/courses-list";


export default async function Home() {
  const courses = await dbClient.course.findMany();
  console.log({courses});
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateCourseForm className=""  revalidatePagePath="/"/>
      <CoursesList revalidatePagePath="/"/>
    </main>
  );
}

import coursesConfig from "../../config/courses.json";
import type { Course } from "./types";

export function getCourses(): Course[] {
  return coursesConfig.courses as Course[];
}

export function getCourseBySlug(slug: string): Course | undefined {
  return getCourses().find((c) => c.slug === slug);
}

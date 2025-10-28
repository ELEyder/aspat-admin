import type { CourseContent } from "./CourseContent";

export interface CourseModule {
  id: number;
  course_id: number;
  order: number;
  created_at: string;
  updated_at: string;
  translations: CourseModuleTranslation[];
  contents: CourseContent[];
}

export interface CourseModuleTranslation {
  id: number;
  course_module_id: number;
  locale: string;
  title: string;
  summary: string;
  description: string;
  created_at: string;
  updated_at: string;
}
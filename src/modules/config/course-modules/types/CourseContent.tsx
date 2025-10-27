import type { Forum } from "../../courses/types/Forum";
import type { Quiz } from "../../courses/types/Quiz";

export interface CourseContent {
  id: number;
  course_module_id: number;
  type: "page" | "video" | "pdf" | "quiz"  | "ppt" | string;
  url: string;
  order: number;
  created_at: string;
  updated_at: string;
  quiz?: Quiz;
  forum?: Forum;
  translations: CourseContentTranslation[];
}

export interface CourseContentTranslation {
  id: number;
  course_content_id: number;
  locale: string;
  title: string | null;
  content: string | null;
  created_at: string;
  updated_at: string;
}
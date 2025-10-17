import type { Forum } from "./Forum";
import type { Quiz } from "./Quiz";
import type { Category } from "./Category";
import type { CourseLevel } from "./CourseLevel";

export interface Course {
  id: number;
  category_id: number;
  course_level_id: number;
  image_url: string;
  date: string;
  is_premium: boolean | number;
  price: string;
  currency: string;
  slug: string;
  created_at: string;
  updated_at: string;
  translations: CourseTranslation[];
  category: Category;
  level: CourseLevel;
  modules: CourseModule[];
  has_course : boolean;
  has_request : boolean;
  progress : number;
}

export interface CourseTranslation {
  id: number;
  course_id: number;
  locale: string;
  title: string;
  summary: string;
  description: string;
  created_at: string;
  updated_at: string;
}

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
  summary: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

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
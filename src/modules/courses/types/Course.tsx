import type { Category } from "./Category";
import type { CourseLevel } from "./CourseLevel";
import type { CourseModule } from "../../course-modules/types/CourseModule";

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
  is_active : boolean;
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






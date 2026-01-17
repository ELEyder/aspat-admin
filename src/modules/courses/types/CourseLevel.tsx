export interface CourseLevel {
  id: number;
  translations: CourseLevelTranslation[];
}

export interface CourseLevelTranslation {
  course_level_id: number;
  locale: string;
  name: string;
}

export interface TranslatedCourseLevel {
  id: number;
  name: string;
}

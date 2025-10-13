import type { QuizAttempt } from "./QuizAttempt";

export interface Quiz {
  id: number;
  course_id: number;
  course_content_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  max_attempts : number;
  user_attempts : number;
  score : number | null;
  attempts : QuizAttempt[];
  translations: QuizTranslation[];
  questions: QuizQuestion[];
}

export interface QuizTranslation {
  id: number;
  quiz_id: number;
  locale: string;
  title: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
}

export interface QuizQuestionTranslation {
  id: number;
  question_id: number;
  locale: string;
  text: string;
  created_at: string;
  updated_at: string;
}

export interface QuizOptionTranslation {
  id: number;
  quiz_option_id: number;
  locale: string;
  text: string;
  created_at: string;
  updated_at: string;
}

export interface QuizOption {
  id: number;
  quiz_question_id: number;
  is_correct: boolean;
  order: number;
  created_at: string;
  updated_at: string;
  translations?: QuizOptionTranslation[];
}

export interface QuizQuestion {
  id: number;
  quiz_id: number;
  type: "multiple_choice" | "text" | string;
  order: number;
  created_at: string;
  updated_at: string;
  translations: QuizQuestionTranslation[];
  options?: QuizOption[];
}

export interface QuizAttempt {
  id: number;
  quiz_id: number;
  user_id: number;
  grade: number | null;
  is_passed: 0 | 1;
  attempt_number: number;
  created_at: string;
  updated_at: string;
}
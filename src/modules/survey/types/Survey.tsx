export interface Survey {
  id: number;
  translations: SurveyTranslation[];
}

export interface SurveyTranslation {
  id: number;
  title : string;
}

export interface SurveyQuestion {
  id: number;
  survey_id: number;
  question_type: string;
}

export interface SurveyResponse {
  id: number;
  survey_id: number;
  user_id: number;
}
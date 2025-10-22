export interface StatusTranslation {
  id: number;
  status_id: number;
  locale: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Status {
  id: number;
  slug: string;
  bg_color: string;
  text_color: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  translations: StatusTranslation[];
}
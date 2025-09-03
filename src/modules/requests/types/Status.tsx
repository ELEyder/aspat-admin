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
  color: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
  translations: StatusTranslation[];
}

export interface TranslatedStatus {
  id: number;
  slug: string;
  name: string;
  color: string | null;
  is_active: number;
}
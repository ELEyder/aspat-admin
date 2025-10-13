export interface Category {
  slug: string;
  created_at: string;
  updated_at: string;
  translations : CategoryTranslation[]
}

export interface CategoryTranslation {
  locale: string;
  name: string;
  created_at: string;
  updated_at : string
}

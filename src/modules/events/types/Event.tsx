export interface Event {
  id: string;
  translations: EventTranslation[];
  description: string;
  datetime: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventTranslation {
  id: string;
  title: string;
  description: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}
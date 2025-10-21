import type { Status } from "./Status";

export interface ServiceRequest {
  id: string;
  first_name: string;
  last_name: string;
  dni: string;
  phone: string;
  email: string;
  service_id: string;
  status_id: number;
  status: Status;
  service: Service;
}

export interface Service {
  id: string;
  image_url: string;
  order: number;
  translations: ServiceTranslation[];
}

export interface ServiceTranslation {
  locale: string;
  title: string;
  description: string;
}

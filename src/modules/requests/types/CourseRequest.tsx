import type { Status } from "./Status";

export interface CourseRequest {
  id: string;
  first_name: string;
  last_name: string;
  dni: string;
  phone: string;
  email: string;
  service_id: string;
  status: Status;
}

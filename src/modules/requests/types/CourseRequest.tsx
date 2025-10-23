import type { User } from "@/types/User";
import type { Status } from "./Status";
import type { Course } from "@/modules/config/courses/types/Course";

export interface CourseRequest {
  id: string;
  course_id: string;
  status_id: string;
  service_id: string;
  user_id: string;
  message: string;
  course: Course;
  user: User;
  status: Status;
  is_active: boolean;
}

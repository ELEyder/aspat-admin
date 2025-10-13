import type { User } from "@/types/User";

export interface Forum {
  id: number;
  slug: string;
  course_content_id: number;
  title: string;
  description: string;
  threads: Thread[];
  user: User;
  created_at: string;
  updated_at: string;
}

export interface Thread {
  id: number;
  slug: string;
  title: number;
  user: User;
  posts: Post[];
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: number;
  slug: string;
  content : string;
  user : User;
  created_at: string;
  updated_at: string;
}
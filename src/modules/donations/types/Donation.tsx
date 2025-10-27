import type { Status } from "@/modules/requests/types/Status";

export interface Donation {
  id: number;
  status_id: number;
  token: string;
  first_name: string;
  last_name: string;
  dni: string;
  phone: string;
  email: string;
  donation_type: "money" | "goods" | string;
  email_verified: boolean;
  phone_verified: boolean;
  verification_code: string | null;
  code_expires_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  status: Status;
}
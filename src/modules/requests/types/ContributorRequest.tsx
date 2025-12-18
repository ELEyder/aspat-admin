export interface ContributorRequest {
  id: string;
  first_name: string;
  last_name: string;
  dni: string | null;
  phone: string | null;
  email: string;
  is_active: boolean;
}

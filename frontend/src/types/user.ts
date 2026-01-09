export interface User {
  id: string;
  name: string;
  lastname: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFormData {
  name: string;
  lastname: string;
}

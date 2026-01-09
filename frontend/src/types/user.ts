export interface User {
  id: string;
  name: string;
  dob?: Date;
  lastname: string;
  email: string;
  age?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFormData {
  name: string;
  lastname: string;
  dob?: Date;
  email: string;
}

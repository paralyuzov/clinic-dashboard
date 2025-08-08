export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  doctorId?: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  registrationToken: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UserResponse {
  message: string;
  user: User;
  accessToken: string;
}

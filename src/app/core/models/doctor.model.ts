
export interface Doctor {
  _id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  bio: string;
  specialization: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDoctorDto {
  name: string;
  age: number;
  email: string;
  phone: string;
  bio: string;
  specialization: string;
}

export interface DoctorResponse {
  message: string;
  doctor: Doctor;
}


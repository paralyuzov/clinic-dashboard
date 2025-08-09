export interface Address {
  country: string;
  city: string;
  street: string;
}

export interface MedicalHistoryEntry {
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  doctorId: string;
}

export type PatientStatus = 'Active' | 'Inactive' | 'New';

export interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  ucn: string;
  address: Address;
  status: PatientStatus;
  medicalHistory: MedicalHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface PatientDto {
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  ucn: string;
  address: Address;
}

export interface PatientResponse {
  patient: Patient;
  message: string;
}

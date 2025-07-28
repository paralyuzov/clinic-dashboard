import { Doctor } from './doctor.model';
import { Patient } from './patient.model';
export interface Appointment {
  _id: number;
  patient: string;
  doctor: string;
  date: string;
  hours: string;
  reason: string;
  notes: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentFull {
  _id: string;
  patient: Patient;
  doctor: Doctor;
  date: string;
  hours: string;
  reason: string;
  notes: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentResponse {
  message: string;
  appointment: Appointment;
}

export interface AppointmentDto {
  patient: string;
  doctor: string;
  date: string;
  hours: string;
  reason: string;
  notes: string;
}

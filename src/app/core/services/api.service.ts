import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CreateDoctorDto,
  Doctor,
  DoctorResponse,
} from '../models/doctor.model';
import { Patient, PatientDto, PatientResponse } from '../models/patient.model';
import {
  Appointment,
  AppointmentDto,
  AppointmentFull,
  AppointmentResponse,
} from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:3000';
  private http = inject(HttpClient);

  getDoctors() {
    return this.http.get<Doctor[]>(`${this.baseUrl}/doctors`);
  }

  getDoctorById(id: string) {
    return this.http.get<Doctor>(`${this.baseUrl}/doctors/${id}`);
  }

  createDoctor(doctorData: CreateDoctorDto) {
    return this.http.post<DoctorResponse>(
      `${this.baseUrl}/doctors/create`,
      doctorData
    );
  }

  editDoctorById(id: string, doctorData: CreateDoctorDto) {
    return this.http.put<DoctorResponse>(
      `${this.baseUrl}/doctors/${id}`,
      doctorData
    );
  }

  deleteDoctorById(id: string) {
    return this.http.delete<{ message: string }>(
      `${this.baseUrl}/doctors/${id}`
    );
  }

  getPatients() {
    return this.http.get<Patient[]>(`${this.baseUrl}/patients`);
  }

  getPatientById(id: string) {
    return this.http.get<Patient>(`${this.baseUrl}/patients/${id}`);
  }

  createPatient(patientData: PatientDto) {
    return this.http.post<PatientResponse>(
      `${this.baseUrl}/patients`,
      patientData
    );
  }

  updatePatientById(id: string, patientData: PatientDto) {
    return this.http.put<PatientResponse>(
      `${this.baseUrl}/patients/${id}`,
      patientData
    );
  }

  deletePatientById(id: string) {
    return this.http.delete<{ message: string }>(
      `${this.baseUrl}/patients/${id}`
    );
  }


  getAppointments() {
    return this.http.get<AppointmentFull[]>(`${this.baseUrl}/appointments`);
  }

  createAppointment(appointmentData: AppointmentDto) {
    return this.http.post<AppointmentResponse>(
      `${this.baseUrl}/appointments`,
      appointmentData
    );
  }

  getAppointmentsByDoctorAndDate(doctorId: string, date: string) {
    return this.http.get<Appointment[]>(
      `${this.baseUrl}/appointments/${doctorId}/${date}`
    );
  }

  getFullDaysByDoctor(doctorId: string) {
    return this.http.get<string[]>(
      `${this.baseUrl}/appointments/${doctorId}/full-days`
    );
  }

  changeAppointmentStatus(
    appointmentId: string,
    status: 'Scheduled' | 'Completed' | 'Cancelled'
  ) {
    return this.http.put<AppointmentResponse>(
      `${this.baseUrl}/appointments/${appointmentId}/status`,
      { status }
    );
  }
}

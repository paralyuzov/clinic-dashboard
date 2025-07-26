import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CreateDoctorDto,
  Doctor,
  DoctorResponse,
} from '../models/doctor.model';

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
}

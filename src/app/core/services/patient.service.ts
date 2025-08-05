import { inject, Injectable } from '@angular/core';
import { Patient, PatientDto } from '../models/patient.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ApiService } from './api.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiService = inject(ApiService);
  private currentPatient$$ = new BehaviorSubject<Patient | null>(null);
  public readonly currentPatient$ = this.currentPatient$$.asObservable();
  private patients$$ = new BehaviorSubject<Patient[]>([]);
  public readonly patients$ = this.patients$$.asObservable();
  private loading$$ = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loading$$.asObservable();
  private error$$ = new BehaviorSubject<string | null>(null);
  public readonly error$ = this.error$$.asObservable();
  private toastService = inject(ToastService);

  onGetPatients() {
    this.loading$$.next(true);
    this.apiService.getPatients().subscribe({
      next: (response) => {
        this.patients$$.next(response);
        this.error$$.next(null);
        this.loading$$.next(false);
      },
      error: (error) => {
        console.error('Failed to fetch patients:', error);
        this.error$$.next(error.message);
        this.loading$$.next(false);
      },
    });
  }

  onGetPatientById(id: string) {
    this.loading$$.next(true);
    this.apiService.getPatientById(id).subscribe({
      next: (response) => {
        this.currentPatient$$.next(response);
        this.error$$.next(null);
        this.loading$$.next(false);
      },
      error: (error) => {
        console.error('Failed to fetch patient:', error);
        this.error$$.next(error.message);
        this.loading$$.next(false);
      },
    });
  }

  onCreatePatient(patientData: PatientDto) {
    this.loading$$.next(true);
    this.apiService.createPatient(patientData).subscribe({
      next: (response) => {
        this.onGetPatients();
        this.loading$$.next(false);
        this.toastService.success('Patient created successfully.');
      },
      error: (error) => {
        this.error$$.next(error);
        this.loading$$.next(false);
        this.toastService.error('Failed to create patient', error.message);
      },
    });
  }

  onUpdatePatientById(id: string, patientData: PatientDto) {
    this.loading$$.next(true);
    this.apiService.updatePatientById(id, patientData).subscribe({
      next: (response) => {
        this.onGetPatients();
        this.loading$$.next(false);
        this.toastService.success('Patient updated successfully.');
      },
      error: (error) => {
        this.error$$.next(error);
        this.loading$$.next(false);
        this.toastService.error('Failed to update patient', error.message);
      },
    });
  }

  onDeletePatientById(id: string) {
    this.loading$$.next(true);
    this.apiService.deletePatientById(id).subscribe({
      next: (response) => {
        this.onGetPatients();
        this.loading$$.next(false);
        this.toastService.success('Patient deleted successfully.');
      },
      error: (error) => {
        console.error('Failed to delete patient:', error);
        this.error$$.next(error.message);
        this.loading$$.next(false);
        this.toastService.error('Failed to delete patient', error.message);
      },
    });
  }

  numberOfPatients(): number {
    return this.patients$$.getValue()?.length || 0;
  }

  numberPatientByMonth(): number[] {
  const patients = this.patients$$.getValue();
  const counts = Array(12).fill(0);
  patients.forEach(patient => {
    const month = new Date(patient.createdAt).getMonth();
    counts[month]++;
  });
  return counts;
}

}

import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { CreateDoctorDto, Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiService = inject(ApiService);

  private doctors$$ = new BehaviorSubject<Doctor[] | null>(null);
  public readonly doctors$ = this.doctors$$.asObservable();
  private currentDoctor$$ = new BehaviorSubject<Doctor | null>(null);
  public readonly currentDoctor$ = this.currentDoctor$$.asObservable();
  private loading$$ = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loading$$.asObservable();
  private error$$ = new BehaviorSubject<string | null>(null);
  public readonly error$ = this.error$$.asObservable();

  onGetDoctors() {
    this.loading$$.next(true);
    this.apiService.getDoctors().subscribe({
      next: (response) => {
        this.doctors$$.next(response);
        this.error$$.next(null);
        this.loading$$.next(false);
      },
      error: (error) => {
        console.error('Failed to fetch doctors:', error);
        this.error$$.next(error.message);
        this.loading$$.next(false);
      },
    });
  }

  onGetDoctorById(id: string) {
    this.loading$$.next(true);
    this.apiService.getDoctorById(id).subscribe({
      next: (response) => {
        this.currentDoctor$$.next(response);
        this.error$$.next(null);
        this.loading$$.next(false);
      },
      error: (error) => {
        console.error('Failed to fetch doctor by ID:', error);
        this.error$$.next(error.message);
        this.loading$$.next(false);
      },
    });
  }

  onCreateDoctor(doctorData: CreateDoctorDto) {
    this.loading$$.next(true);
    this.apiService.createDoctor(doctorData).subscribe({
      next: (response) => {
        const currentDoctors = this.doctors$$.value || [];
        this.doctors$$.next([...currentDoctors, response.doctor]);
        this.error$$.next(null);
        this.loading$$.next(false);
      },
      error: (error) => {
        console.error('Failed to create doctor:', error);
        this.error$$.next(error.message);
        this.loading$$.next(false);
      },
    });
  }

  onEditDoctorById(id: string, doctorData: CreateDoctorDto) {
    this.loading$$.next(true);
    this.apiService.editDoctorById(id, doctorData).subscribe({
      next: (response) => {
        this.onGetDoctors();
        this.currentDoctor$$.next(response.doctor);
        this.error$$.next(null);
        this.loading$$.next(false);
      },
      error: (error) => {
        console.error('Failed to edit doctor:', error);
        this.error$$.next(error.message);
        this.loading$$.next(false);
      },
    });
  }

  onDeleteDoctorById(id: string) {
    this.loading$$.next(true);
    this.apiService.deleteDoctorById(id).subscribe({
      next: (response) => {
        this.onGetDoctors();
        this.currentDoctor$$.next(null);
        this.error$$.next(null);
        this.loading$$.next(false);
      },
      error: (error) => {
        console.error('Failed to delete doctor:', error);
        this.error$$.next(error.message);
        this.loading$$.next(false);
      },
    });
  }
}

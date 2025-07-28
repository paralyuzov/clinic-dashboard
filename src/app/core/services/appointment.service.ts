import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {
  Appointment,
  AppointmentDto,
  AppointmentFull,
} from '../models/appointment.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiService = inject(ApiService);

  private appointments$$ = new BehaviorSubject<AppointmentFull[]>([]);
  public readonly appointments$ = this.appointments$$.asObservable();
  private loading$$ = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loading$$.asObservable();
  private error$$ = new BehaviorSubject<string | null>(null);
  public readonly error$ = this.error$$.asObservable();
  private appointmentsByDate$$ = new BehaviorSubject<Appointment[]>([]);
  public readonly appointmentsByDate$ = this.appointmentsByDate$$.asObservable();
  private fullDays$$ = new BehaviorSubject<Date[]>([]);
  public readonly fullDays$ = this.fullDays$$.asObservable();

  onCreateAppointment(appointmentData: AppointmentDto) {
    this.loading$$.next(true);
    this.apiService.createAppointment(appointmentData).subscribe({
      next: (response) => {
        this.fetchAppointments();
        this.loading$$.next(false);
      },
      error: (error) => {
        this.error$$.next(error.message);
        this.loading$$.next(false);
      },
    });
  }

  fetchAppointments() {
    this.loading$$.next(true);
    this.apiService.getAppointments().subscribe({
      next: (appointments) => {
        console.log('Fetched appointments:', appointments);
        this.appointments$$.next(appointments);
        this.loading$$.next(false);
      },
      error: (error) => {
        this.error$$.next(error.message);
        this.loading$$.next(false);
      },
    });
  }

  fetchAppointmentsByDoctorAndDate(doctorId: string, date: string) {
    this.loading$$.next(true);
    this.apiService.getAppointmentsByDoctorAndDate(doctorId, date).subscribe({
      next: (appointments) => {
        this.appointmentsByDate$$.next(appointments);
        this.loading$$.next(false);
      },
      error: (error) => {
        this.error$$.next(error.message);
        this.loading$$.next(false);
      },
    });
  }

  fetchFullDaysByDoctor(doctorId: string) {
    this.loading$$.next(true);
    this.apiService.getFullDaysByDoctor(doctorId).subscribe({
      next: (fullDays) => {
        const fullDaysAsDates = fullDays.map((d: string) => new Date(d));
        this.fullDays$$.next(fullDaysAsDates);
        this.loading$$.next(false);
      },
      error: (error) => {
        this.error$$.next(error.message);
        this.loading$$.next(false);
      },
    });
  }

  resetAppointmentsByDate() {
    this.appointmentsByDate$$.next([]);
  }
}

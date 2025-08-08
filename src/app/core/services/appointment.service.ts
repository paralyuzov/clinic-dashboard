import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {
  Appointment,
  AppointmentDto,
  AppointmentFull,
} from '../models/appointment.model';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from './toast.service';
import { MedicalHistoryEntry } from '../models/patient.model';

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
  public readonly appointmentsByDate$ =
    this.appointmentsByDate$$.asObservable();
  private fullDays$$ = new BehaviorSubject<Date[]>([]);
  public readonly fullDays$ = this.fullDays$$.asObservable();
  private toastService = inject(ToastService);
  private appointmentsByDoctor$$ = new BehaviorSubject<AppointmentFull[]>([]);
  public readonly appointmentsByDoctor$ = this.appointmentsByDoctor$$.asObservable();

  onCreateAppointment(appointmentData: AppointmentDto) {
    this.loading$$.next(true);
    this.apiService.createAppointment(appointmentData).subscribe({
      next: (response) => {
        this.fetchAppointments();
        this.loading$$.next(false);
        this.toastService.success('Appointment created successfully.');
      },
      error: (error) => {
        this.error$$.next(error.message);
        this.loading$$.next(false);
        this.toastService.error('Failed to create appointment', error.message);
      },
    });
  }

  fetchAppointments() {
    this.loading$$.next(true);
    this.apiService.getAppointments().subscribe({
      next: (appointments) => {
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

  appointmentsToday() {
    const today = new Date();
    return this.appointments$$.getValue().filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return (
        appointmentDate.getFullYear() === today.getFullYear() &&
        appointmentDate.getMonth() === today.getMonth() &&
        appointmentDate.getDate() === today.getDate()
      );
    });
  }

  numberOfAppointmentsToday(): number {
    return this.appointmentsToday().length;
  }

  numberOfAppointmentsByMonth(): number[] {
    const appointments = this.appointments$$.getValue();
    const counts = Array(12).fill(0);
    appointments.forEach((appointment) => {
      const month = new Date(appointment.date).getMonth();
      counts[month]++;
    });
    return counts;
  }

  onChangeAppointmentStatus(
    appointmentId: string,
    status: 'Scheduled' | 'Completed' | 'Cancelled',
    medicalHistory?: MedicalHistoryEntry
  ) {
    this.loading$$.next(true);
    this.apiService.changeAppointmentStatus(appointmentId, status, medicalHistory).subscribe({
      next: (response) => {
        this.fetchAppointments();
        this.loading$$.next(false);
        this.toastService.success('Appointment status updated successfully.');
      },
      error: (error) => {
        this.error$$.next(error.message);
        this.loading$$.next(false);
        this.toastService.error(
          'Failed to update appointment status',
          error.message
        );
      },
    });
  }

  onGetAppointmentsByDoctorId(doctorId: string) {
    this.loading$$.next(true);
    this.apiService.getAppointmentsByDoctorId(doctorId).subscribe({
      next: (appointments) => {
        this.appointmentsByDoctor$$.next(appointments);
        this.loading$$.next(false);
      },
      error: (error) => {
        this.error$$.next(error.message);
        this.loading$$.next(false);
      },
    });
  }
}

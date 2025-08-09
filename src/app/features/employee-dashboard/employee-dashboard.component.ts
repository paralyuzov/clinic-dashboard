import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationComponent } from '../../shared/ui/navigation/navigation.component';
import { UserService } from '../../core/services/user.service';
import { AppointmentService } from '../../core/services/appointment.service';
import { AppointmentTableComponent } from '../../shared/ui/appointment-table/appointment-table.component';
import { AsyncPipe } from '@angular/common';
import { SpinnerComponent } from '../../shared/ui/spinner/spinner.component';
import { PatientTableComponent } from '../../shared/ui/patient-table/patient-table.component';
import { PatientService } from '../../core/services/patient.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Subject } from 'rxjs/internal/Subject';
import { filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-employee-dashboard',
  imports: [
    NavigationComponent,
    AppointmentTableComponent,
    AsyncPipe,
    SpinnerComponent,
    PatientTableComponent,
  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDashboardComponent implements OnInit, OnDestroy {
  userService = inject(UserService);
  appointmentService = inject(AppointmentService);
  patientService = inject(PatientService);
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();
  doctorId: string | null = null;

  patients$ = this.patientService.patientsByMedicalHistory$;
  appointments$ = this.appointmentService.appointmentsByDoctor$;
  appointmentsLoading$ = this.appointmentService.loading$;
  patientsLoading$ = this.patientService.loading$;

  ngOnInit(): void {
    this.userService.user$
      .pipe(
        filter(
          (user): user is NonNullable<typeof user> =>
            user !== null && !!user.doctorId
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((user) => {
        this.doctorId = user.doctorId;
        this.fetchDashboardData();
        this.cdr.markForCheck();
      });
  }

  private fetchDashboardData(): void {
    if (this.doctorId) {
      this.appointmentService.onGetAppointmentsByDoctorId(this.doctorId);
      this.patientService.fetchPatientsByMedicalHistoryDoctorId(this.doctorId);
    }
  }

  getTodaysAppointments$() {
    return this.doctorId
      ? this.appointmentService.getAppointmentsTodayByDoctor$(this.doctorId)
      : null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AppointmentTableComponent } from '../../shared/ui/appointment-table/appointment-table.component';
import { PatientChartComponent } from '../../shared/ui/patient-chart/patient-chart.component';
import { PatientTableComponent } from '../../shared/ui/patient-table/patient-table.component';
import { DocTableComponent } from '../../shared/ui/doc-table/doc-table.component';
import { NavigationComponent } from '../../shared/ui/navigation/navigation.component';
import { AppointmentService } from '../../core/services/appointment.service';
import { Subscription } from 'rxjs';
import { PatientService } from '../../core/services/patient.service';
import { DoctorService } from '../../core/services/doctor.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    AppointmentTableComponent,
    PatientChartComponent,
    PatientTableComponent,
    DocTableComponent,
    NavigationComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  appointmentService = inject(AppointmentService);
  doctorService = inject(DoctorService);
  patientService = inject(PatientService);
  appointmentsToday: number = 0;
  numberOfPatients: number = 0;
  numberOfDoctors: number = 0;
  private subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.appointmentService.appointments$.subscribe(() => {
        this.appointmentsToday =
          this.appointmentService.numberOfAppointmentsToday();
      })
    );
    this.subscriptions.add(
      this.doctorService.doctors$.subscribe(() => {
        this.numberOfDoctors = this.doctorService.numberOfDoctors();
      })
    );
    this.subscriptions.add(
      this.patientService.patients$.subscribe(() => {
        this.numberOfPatients = this.patientService.numberOfPatients();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

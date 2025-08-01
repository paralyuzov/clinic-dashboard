import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { PatientService } from '../../../core/services/patient.service';
import { Subscription } from 'rxjs';
import { DoctorService } from '../../../core/services/doctor.service';
import { AppointmentService } from '../../../core/services/appointment.service';

@Component({
  selector: 'app-patient-chart',
  imports: [ChartModule],
  templateUrl: './patient-chart.component.html',
  styleUrl: './patient-chart.component.css',
})
export class PatientChartComponent implements OnInit, OnDestroy {
  patientService = inject(PatientService);
  doctorService = inject(DoctorService);
  appointmentService = inject(AppointmentService);
  subscription = new Subscription();
  data: any;
  options: any;

  platformId = inject(PLATFORM_ID);
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.initChart();
    this.subscription.add(
      this.patientService.patients$.subscribe(() => this.updateChartData())
    );
    this.subscription.add(
      this.doctorService.doctors$.subscribe(() => this.updateChartData())
    );
    this.subscription.add(
      this.appointmentService.appointments$.subscribe(() => this.updateChartData())
    );
  }

  private updateChartData() {
    if (!this.data || !this.data.datasets) return;
    const patientData = this.patientService.numberPatientByMonth();
    const doctorData = this.doctorService.numberOfDoctorsByMonth();
    const appointmentData = this.appointmentService.numberOfAppointmentsByMonth();
    this.data = {
      ...this.data,
      datasets: [
        { ...this.data.datasets[0], data: patientData },
        { ...this.data.datasets[1], data: doctorData },
        { ...this.data.datasets[2], data: appointmentData }
      ]
    };

    this.cd.markForCheck();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color'
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color'
      );

      this.data = {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        datasets: [
          {
            label: 'Patients',
            backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
            borderColor: documentStyle.getPropertyValue('--p-green-500'),
            data: Array(12).fill(0),
          },
          {
            label: 'Doctors',
            backgroundColor: documentStyle.getPropertyValue('--p-blue-500'),
            borderColor: documentStyle.getPropertyValue('--p-blue-500'),
            data: Array(12).fill(0),
          },
          {
            label: 'Appointments',
            backgroundColor: documentStyle.getPropertyValue('--p-yellow-400'),
            borderColor: documentStyle.getPropertyValue('--p-yellow-400'),
            data: Array(12).fill(0),
          },
        ],
      };

      this.options = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColorSecondary,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 100,
              },
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
        },
      };
      this.cd.markForCheck();
    }
  }
}

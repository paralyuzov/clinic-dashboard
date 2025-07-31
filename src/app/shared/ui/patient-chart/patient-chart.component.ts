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
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-patient-chart',
  imports: [ChartModule, SpinnerComponent],
  templateUrl: './patient-chart.component.html',
  styleUrl: './patient-chart.component.css',
})
export class PatientChartComponent implements OnInit, OnDestroy {
  loading = true;
  patientService = inject(PatientService);
  doctorService = inject(DoctorService);
  appointmentService = inject(AppointmentService);
  subscription = new Subscription();
  patientByMonth?: { [key: string]: number };
  doctorsByMonth?: { [key: string]: number };
  appointmentsByMonth?: { [key: string]: number };
  data: any;
  options: any;

  platformId = inject(PLATFORM_ID);
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    let appointmentsLoaded = false;
    let doctorsLoaded = false;
    let patientsLoaded = false;
    this.initChart();
    this.subscription.add(
      this.patientService.patients$.subscribe(() => {
        const patientData = this.patientService.numberPatientByMonth();
        if (this.data && this.data.datasets && this.data.datasets[0]) {
          this.data.datasets[0].data = patientData;
        }
        patientsLoaded = true;
        this.checkAllLoaded(patientsLoaded, doctorsLoaded, appointmentsLoaded);
        this.cd.markForCheck();
      })
    );
    this.subscription.add(
      this.doctorService.doctors$.subscribe(() => {
        const doctorData = this.doctorService.numberOfDoctorsByMonth();
        if (this.data && this.data.datasets && this.data.datasets[1]) {
          this.data.datasets[1].data = doctorData;
        }
        doctorsLoaded = true;
        this.checkAllLoaded(patientsLoaded, doctorsLoaded, appointmentsLoaded);
        this.cd.markForCheck();
      })
    );
    this.subscription.add(
      this.appointmentService.appointments$.subscribe(() => {
        const appointmentData =
          this.appointmentService.numberOfAppointmentsByMonth();
        if (this.data && this.data.datasets && this.data.datasets[2]) {
          this.data.datasets[2].data = appointmentData;
        }
        appointmentsLoaded = true;
        this.checkAllLoaded(patientsLoaded, doctorsLoaded, appointmentsLoaded);
        this.cd.markForCheck();
      })
    );
  }

  checkAllLoaded(patientsLoaded: boolean, doctorsLoaded: boolean, appointmentsLoaded: boolean) {
    this.loading = !(patientsLoaded && doctorsLoaded && appointmentsLoaded);
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

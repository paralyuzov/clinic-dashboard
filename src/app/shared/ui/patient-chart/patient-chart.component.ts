import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-patient-chart',
  imports: [ChartModule],
  templateUrl: './patient-chart.component.html',
  styleUrl: './patient-chart.component.css',
})
export class PatientChartComponent {
  data: any;

  options: any;

  platformId = inject(PLATFORM_ID);
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.initChart();
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
        ],
        datasets: [
          {
            label: 'Patients',
            backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
            borderColor: documentStyle.getPropertyValue('--p-green-500'),
            data: [120, 135, 150, 160, 145, 170, 180],
          },
          {
            label: 'Doctors',
            backgroundColor: documentStyle.getPropertyValue('--p-blue-500'),
            borderColor: documentStyle.getPropertyValue('--p-blue-500'),
            data: [15, 16, 17, 18, 17, 19, 20],
          },
          {
            label: 'Appointments',
            backgroundColor: documentStyle.getPropertyValue('--p-yellow-400'),
            borderColor: documentStyle.getPropertyValue('--p-yellow-400'),
            data: [30, 45, 50, 60, 55, 70, 80],
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

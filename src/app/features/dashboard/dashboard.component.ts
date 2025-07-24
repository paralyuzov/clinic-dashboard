import { Component, inject } from '@angular/core';
import { AppointmentTableComponent } from '../../shared/ui/appointment-table/appointment-table.component';
import { PatientChartComponent } from '../../shared/ui/patient-chart/patient-chart.component';
import { PatientTableComponent } from '../../shared/ui/patient-table/patient-table.component';
import { DocTableComponent } from '../../shared/ui/doc-table/doc-table.component';
import { AuthService } from '../../core/services/auth.service';
import { NavigationComponent } from "../../shared/ui/navigation/navigation.component";

@Component({
  selector: 'app-dashboard',
  imports: [
    AppointmentTableComponent,
    PatientChartComponent,
    PatientTableComponent,
    DocTableComponent,
    NavigationComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent  {
  authService = inject(AuthService);



}

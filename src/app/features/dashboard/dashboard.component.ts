import { Component } from '@angular/core';
import { NavigationComponent } from "../../shared/ui/navigation/navigation.component";
import { AppointmentTableComponent } from "../../shared/ui/appointment-table/appointment-table.component";
import { PatientChartComponent } from "../../shared/ui/patient-chart/patient-chart.component";
import { PatientTableComponent } from "../../shared/ui/patient-table/patient-table.component";
import { DocTableComponent } from "../../shared/ui/doc-table/doc-table.component";

@Component({
  selector: 'app-dashboard',
  imports: [AppointmentTableComponent, PatientChartComponent, PatientTableComponent, DocTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}

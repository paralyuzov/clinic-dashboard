import { Component, inject, input, ViewChild } from '@angular/core';
import { TableModule, Table } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CountryCodePipe } from '../../../core/pipes/country-code.pipe';
import { DialogService } from 'primeng/dynamicdialog';
import { PatientDetailsComponent } from '../../../features/patient-details/patient-details.component';
import { Patient } from '../../../core/models/patient.model';

@Component({
  selector: 'app-patient-table',
  imports: [
    TableModule,
    MessageModule,
    ButtonModule,
    InputTextModule,
    CountryCodePipe,
  ],
  templateUrl: './patient-table.component.html',
  styleUrl: './patient-table.component.css',
  providers: [DialogService],
})
export class PatientTableComponent {
  @ViewChild('dt') dt: Table | undefined;
  patients = input<Patient[]>([]);
  dialogService = inject(DialogService)
  openPatientDetails(id: string) {
     const ref = this.dialogService.open(PatientDetailsComponent, {
            modal: true,
            breakpoints: { '1199px': '75vw', '575px': '90vw' },
            draggable: false,
            resizable: false,
            focusOnShow: false,
            width: '30vw',
            data:{
              patientId: id
            }
          });
  }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}

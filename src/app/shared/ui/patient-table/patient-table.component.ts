import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TableModule, Table } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PatientService } from '../../../core/services/patient.service';
import { AsyncPipe } from '@angular/common';
import { CountryCodePipe } from '../../../core/pipes/country-code.pipe';
import { DialogService } from 'primeng/dynamicdialog';
import { PatientDetailsComponent } from '../../../features/patient-details/patient-details.component';

export interface Patient {
  id: number;
  name: string;
  code: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  doctor: string;
  status: 'Active' | 'Inactive' | 'New';
  lastVisit: string;
}

@Component({
  selector: 'app-patient-table',
  imports: [
    TableModule,
    MessageModule,
    ButtonModule,
    InputTextModule,
    AsyncPipe,
    CountryCodePipe,
  ],
  templateUrl: './patient-table.component.html',
  styleUrl: './patient-table.component.css',
  providers: [DialogService],
})
export class PatientTableComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  patientService = inject(PatientService);
  patients$ = this.patientService.patients$;
  loading$ = this.patientService.loading$;
  error$ = this.patientService.error$;
  dialogService = inject(DialogService)

  ngOnInit(): void {
    this.patientService.onGetPatients();
  }

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

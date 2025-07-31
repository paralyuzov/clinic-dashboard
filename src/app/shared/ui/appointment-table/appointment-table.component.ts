export interface Appointment {
  id: number;
  patient: {
    name: string;
    code: string;
  };
  doctor: {
    name: string;
    id: string;
  };
  date: string;
  time: string;
  department: string;
  reason: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Pending';
}
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { AppointmentService } from '../../../core/services/appointment.service';
import { AsyncPipe } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { SelectItem } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-table',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    MessageModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    AsyncPipe,
    SelectModule,
    TagModule,
    FormsModule,
  ],
  templateUrl: './appointment-table.component.html',
  styleUrl: './appointment-table.component.css',
})
export class AppointmentTableComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  appointmentService = inject(AppointmentService);
  appointments$ = this.appointmentService.appointments$;
  editing = false;

  statuses!: SelectItem[];

  ngOnInit() {
    this.appointmentService.fetchAppointments();
    this.statuses = [
      { label: 'Scheduled', value: 'Scheduled' },
      { label: 'Completed', value: 'Completed' },
      { label: 'Cancelled', value: 'Cancelled' },
    ];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Scheduled':
        return 'warn';
      case 'Completed':
        return 'success';
      case 'Cancelled':
        return 'danger';
      default:
        return 'info';
    }
  }

  onRowEditInit(appointment: Appointment) {
    this.editing = true;
  }

  onRowEditCancel(appointment: Appointment, index: number) {

    this.editing = false;
  }

   onRowEditSave(appointment: Appointment) {
    this.editing = false;
      console.log(appointment)
    }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}

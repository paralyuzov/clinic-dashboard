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
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { AppointmentService } from '../../../core/services/appointment.service';
import { AsyncPipe } from '@angular/common';

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
  ],
  templateUrl: './appointment-table.component.html',
  styleUrl: './appointment-table.component.css',
})
export class AppointmentTableComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  appointmentService = inject(AppointmentService);
  appointments$ = this.appointmentService.appointments$;

  ngOnInit() {
    this.appointmentService.fetchAppointments();
  }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}

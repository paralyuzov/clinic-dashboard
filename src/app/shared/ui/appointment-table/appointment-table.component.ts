import { Component, inject, input, OnInit, signal, ViewChild } from '@angular/core';
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
import { AppointmentFull } from '../../../core/models/appointment.model';

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
  appointments = input<AppointmentFull[]>([]);
  editing = false;
  clonedAppointments: { [s: string]: AppointmentFull } = {};

  statuses!: SelectItem[];

  ngOnInit() {
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

  onRowEditInit(appointment: AppointmentFull) {
    this.editing = true;
    this.clonedAppointments[appointment._id] = { ...appointment };
  }

  onRowEditCancel(appointment: AppointmentFull, index: number) {
    this.editing = false;
    const originalAppointment = this.clonedAppointments[appointment._id];
    if (originalAppointment) {
      appointment.status = originalAppointment.status;
      delete this.clonedAppointments[appointment._id];
    }
  }

  onRowEditSave(appointment: AppointmentFull) {
    this.editing = false;
    this.appointmentService.onChangeAppointmentStatus(
      appointment._id,
      appointment.status
    );
  }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}

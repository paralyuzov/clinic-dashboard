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
import { Component, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';




@Component({
  selector: 'app-appointment-table',
  imports: [CommonModule, TableModule, ButtonModule, MessageModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './appointment-table.component.html',
  styleUrl: './appointment-table.component.css',
})
export class AppointmentTableComponent {
   @ViewChild('dt') dt: Table | undefined;
  appointments: Appointment[] = [
    {
      id: 1,
      patient: { name: 'John Doe', code: 'P001' },
      doctor: { name: 'Dr. Smith', id: 'D101' },
      date: '2023-10-01',
      time: '10:00 AM',
      department: 'Cardiology',
      reason: 'Routine checkup',
      status: 'Scheduled'
    },
    {
      id: 2,
      patient: { name: 'Jane Smith', code: 'P002' },
      doctor: { name: 'Dr. Brown', id: 'D102' },
      date: '2023-10-02',
      time: '11:30 AM',
      department: 'Pediatrics',
      reason: 'Fever and cough',
      status: 'Completed'
    },
    {
      id: 3,
      patient: { name: 'Alice Johnson', code: 'P003' },
      doctor: { name: 'Dr. Lee', id: 'D103' },
      date: '2023-10-03',
      time: '02:00 PM',
      department: 'Dermatology',
      reason: 'Skin rash',
      status: 'Cancelled'
    },
    {
      id: 4,
      patient: { name: 'Michael Brown', code: 'P004' },
      doctor: { name: 'Dr. Patel', id: 'D104' },
      date: '2023-10-04',
      time: '09:00 AM',
      department: 'Orthopedics',
      reason: 'Knee pain',
      status: 'Scheduled'
    },
    {
      id: 5,
      patient: { name: 'Emily Davis', code: 'P005' },
      doctor: { name: 'Dr. Kim', id: 'D105' },
      date: '2023-10-05',
      time: '01:30 PM',
      department: 'Neurology',
      reason: 'Headache',
      status: 'Pending'
    },
    {
      id: 6,
      patient: { name: 'Chris Wilson', code: 'P006' },
      doctor: { name: 'Dr. Carter', id: 'D106' },
      date: '2023-10-06',
      time: '03:00 PM',
      department: 'Gastroenterology',
      reason: 'Stomach pain',
      status: 'Completed'
    },
    {
      id: 7,
      patient: { name: 'Sophia Martinez', code: 'P007' },
      doctor: { name: 'Dr. Evans', id: 'D107' },
      date: '2023-10-07',
      time: '10:45 AM',
      department: 'Ophthalmology',
      reason: 'Vision check',
      status: 'Scheduled'
    },
    {
      id: 8,
      patient: { name: 'David Lee', code: 'P008' },
      doctor: { name: 'Dr. Green', id: 'D108' },
      date: '2023-10-08',
      time: '12:15 PM',
      department: 'ENT',
      reason: 'Ear pain',
      status: 'Cancelled'
    },
    {
      id: 9,
      patient: { name: 'Olivia Harris', code: 'P009' },
      doctor: { name: 'Dr. White', id: 'D109' },
      date: '2023-10-09',
      time: '11:00 AM',
      department: 'Cardiology',
      reason: 'Follow-up',
      status: 'Scheduled'
    },
    {
      id: 10,
      patient: { name: 'Liam Walker', code: 'P010' },
      doctor: { name: 'Dr. Scott', id: 'D110' },
      date: '2023-10-10',
      time: '09:30 AM',
      department: 'Pediatrics',
      reason: 'Routine vaccination',
      status: 'Completed'
    }
  ];

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}

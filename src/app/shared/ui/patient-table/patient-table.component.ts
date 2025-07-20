import { Component, ViewChild } from '@angular/core';
import { TableModule,Table } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

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
    InputTextModule
  ],
  templateUrl: './patient-table.component.html',
  styleUrl: './patient-table.component.css'
})
export class PatientTableComponent {
   @ViewChild('dt') dt: Table | undefined;

  patients: Patient[] = [
    {
      id: 1,
      name: 'John Doe',
      code: 'P001',
      age: 34,
      gender: 'Male',
      phone: '555-1234',
      email: 'john.doe@example.com',
      address: '123 Main St, City',
      doctor: 'Dr. Smith',
      status: 'Active',
      lastVisit: '2023-07-10'
    },
    {
      id: 2,
      name: 'Jane Smith',
      code: 'P002',
      age: 29,
      gender: 'Female',
      phone: '555-5678',
      email: 'jane.smith@example.com',
      address: '456 Oak Ave, City',
      doctor: 'Dr. Brown',
      status: 'Active',
      lastVisit: '2023-07-12'
    },
    {
      id: 3,
      name: 'Alice Johnson',
      code: 'P003',
      age: 41,
      gender: 'Female',
      phone: '555-8765',
      email: 'alice.johnson@example.com',
      address: '789 Pine Rd, City',
      doctor: 'Dr. Lee',
      status: 'Inactive',
      lastVisit: '2023-06-30'
    },
    {
      id: 4,
      name: 'Michael Brown',
      code: 'P004',
      age: 37,
      gender: 'Male',
      phone: '555-4321',
      email: 'michael.brown@example.com',
      address: '321 Maple St, City',
      doctor: 'Dr. Patel',
      status: 'Active',
      lastVisit: '2023-07-15'
    },
    {
      id: 5,
      name: 'Emily Davis',
      code: 'P005',
      age: 26,
      gender: 'Female',
      phone: '555-2468',
      email: 'emily.davis@example.com',
      address: '654 Cedar Ave, City',
      doctor: 'Dr. Kim',
      status: 'New',
      lastVisit: '2023-07-18'
    },
    {
      id: 6,
      name: 'Chris Wilson',
      code: 'P006',
      age: 52,
      gender: 'Male',
      phone: '555-1357',
      email: 'chris.wilson@example.com',
      address: '987 Spruce Rd, City',
      doctor: 'Dr. Carter',
      status: 'Active',
      lastVisit: '2023-07-11'
    },
    {
      id: 7,
      name: 'Sophia Martinez',
      code: 'P007',
      age: 31,
      gender: 'Female',
      phone: '555-9753',
      email: 'sophia.martinez@example.com',
      address: '246 Willow St, City',
      doctor: 'Dr. Evans',
      status: 'Active',
      lastVisit: '2023-07-14'
    },
    {
      id: 8,
      name: 'David Lee',
      code: 'P008',
      age: 45,
      gender: 'Male',
      phone: '555-8642',
      email: 'david.lee@example.com',
      address: '135 Elm St, City',
      doctor: 'Dr. Green',
      status: 'Inactive',
      lastVisit: '2023-06-28'
    },
    {
      id: 9,
      name: 'Olivia Harris',
      code: 'P009',
      age: 39,
      gender: 'Female',
      phone: '555-7531',
      email: 'olivia.harris@example.com',
      address: '864 Birch Ave, City',
      doctor: 'Dr. White',
      status: 'Active',
      lastVisit: '2023-07-13'
    },
    {
      id: 10,
      name: 'Liam Walker',
      code: 'P010',
      age: 28,
      gender: 'Male',
      phone: '555-1597',
      email: 'liam.walker@example.com',
      address: '753 Aspen Rd, City',
      doctor: 'Dr. Scott',
      status: 'New',
      lastVisit: '2023-07-19'
    }
  ];

    applyFilterGlobal($event: Event, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }



}

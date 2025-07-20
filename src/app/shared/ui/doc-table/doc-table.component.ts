import { Component, Input, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule,Table } from 'primeng/table';
export interface Doctor {
  id: number;
  name: string;
  code: string;
  specialty: string;
  phone: string;
  email: string;
  status: 'Active' | 'On Leave' | 'Retired';
  experience: number;
  qualifications: string;
  office: string;
  patients: number;
}

@Component({
  selector: 'app-doc-table',
  imports: [TableModule, InputTextModule],
  templateUrl: './doc-table.component.html',
  styleUrl: './doc-table.component.css'
})
export class DocTableComponent {
  @ViewChild('dt') dt: Table | undefined;
  doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. John Smith',
      code: 'D101',
      specialty: 'Cardiology',
      phone: '555-1001',
      email: 'john.smith@clinic.com',
      status: 'Active',
      experience: 15,
      qualifications: 'MD, FACC',
      office: '101A',
      patients: 34
    },
    {
      id: 2,
      name: 'Dr. Emily Brown',
      code: 'D102',
      specialty: 'Pediatrics',
      phone: '555-1002',
      email: 'emily.brown@clinic.com',
      status: 'Active',
      experience: 10,
      qualifications: 'MD',
      office: '102B',
      patients: 28
    },
    {
      id: 3,
      name: 'Dr. Alice Lee',
      code: 'D103',
      specialty: 'Dermatology',
      phone: '555-1003',
      email: 'alice.lee@clinic.com',
      status: 'On Leave',
      experience: 8,
      qualifications: 'MD, FAAD',
      office: '103C',
      patients: 19
    },
    {
      id: 4,
      name: 'Dr. Michael Patel',
      code: 'D104',
      specialty: 'Orthopedics',
      phone: '555-1004',
      email: 'michael.patel@clinic.com',
      status: 'Active',
      experience: 12,
      qualifications: 'MD, FAAOS',
      office: '104D',
      patients: 22
    },
    {
      id: 5,
      name: 'Dr. Susan Kim',
      code: 'D105',
      specialty: 'Neurology',
      phone: '555-1005',
      email: 'susan.kim@clinic.com',
      status: 'Active',
      experience: 9,
      qualifications: 'MD',
      office: '105E',
      patients: 25
    },
    {
      id: 6,
      name: 'Dr. David Carter',
      code: 'D106',
      specialty: 'Gastroenterology',
      phone: '555-1006',
      email: 'david.carter@clinic.com',
      status: 'Retired',
      experience: 30,
      qualifications: 'MD',
      office: '106F',
      patients: 0
    },
    {
      id: 7,
      name: 'Dr. Linda Evans',
      code: 'D107',
      specialty: 'Ophthalmology',
      phone: '555-1007',
      email: 'linda.evans@clinic.com',
      status: 'Active',
      experience: 11,
      qualifications: 'MD',
      office: '107G',
      patients: 17
    },
    {
      id: 8,
      name: 'Dr. Mark Green',
      code: 'D108',
      specialty: 'ENT',
      phone: '555-1008',
      email: 'mark.green@clinic.com',
      status: 'Active',
      experience: 13,
      qualifications: 'MD',
      office: '108H',
      patients: 21
    },
    {
      id: 9,
      name: 'Dr. Olivia White',
      code: 'D109',
      specialty: 'Cardiology',
      phone: '555-1009',
      email: 'olivia.white@clinic.com',
      status: 'Active',
      experience: 7,
      qualifications: 'MD',
      office: '109I',
      patients: 15
    },
    {
      id: 10,
      name: 'Dr. Liam Scott',
      code: 'D110',
      specialty: 'Pediatrics',
      phone: '555-1010',
      email: 'liam.scott@clinic.com',
      status: 'Active',
      experience: 6,
      qualifications: 'MD',
      office: '110J',
      patients: 13
    }
  ];

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }


}

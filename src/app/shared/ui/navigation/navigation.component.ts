import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { UserService } from '../../../core/services/user.service';
import { AsyncPipe } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { DoctorFormComponent } from '../../../features/doctor-form/doctor-form.component';
import { PatientFormComponent } from '../../../features/patient-form/patient-form.component';
import { AppointmentFormComponent } from '../../../features/appointment-form/appointment-form.component';
import { ThemeService } from '../../../core/services/theme.service';
@Component({
  selector: 'app-navigation',
  imports: [
    CommonModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    MenubarModule,
    ButtonModule,
    Menu,
    AsyncPipe,
  ],
  providers: [DialogService],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  options: MenuItem[] | undefined;
  userService = inject(UserService);
  user$ = this.userService.user$;
  theme = inject(ThemeService)

  dialogService = inject(DialogService);

  openDoctorForm() {
    const ref = this.dialogService.open(DoctorFormComponent, {
      header: 'Create Doctor',
      modal: true,
      breakpoints: { '1199px': '75vw', '575px': '90vw' },
      style: { width: '50vw' },
      draggable: false,
      resizable: false,
    });
  }

  openPatientForm() {
    const ref = this.dialogService.open(PatientFormComponent, {
      header: 'Create Patient',
      modal: true,
      breakpoints: { '1199px': '75vw', '575px': '90vw' },
      style: { width: '50vw' },
      draggable: false,
      resizable: false,
    });
  }

  openAppointmentForm() {
    const ref = this.dialogService.open(AppointmentFormComponent, {
      header: 'Create Appointment',
      modal: true,
      breakpoints: { '1199px': '75vw', '575px': '90vw' },
      draggable: false,
      resizable: false,
      dismissableMask: true,
    });
  }

  ngOnInit() {

    this.options = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => {
          ('Profile clicked');
        },
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => {
          ('Settings clicked');
        },
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.userService.onLogout();
        },
      },
    ];
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { DoctorService } from '../../core/services/doctor.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SpinnerComponent } from "../../shared/ui/spinner/spinner.component";


@Component({
  selector: 'app-doctor-details',
  imports: [AsyncPipe, ButtonModule, SpinnerComponent],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.css',
})
export class DoctorDetailsComponent implements OnInit {
  doctorService = inject(DoctorService);
  currentDoctor$ = this.doctorService.currentDoctor$;
  loading$ = this.doctorService.loading$;
  error$ = this.doctorService.error$;
  dialogConfig = inject(DynamicDialogConfig);
  dialogRef = inject(DynamicDialogRef);

  ngOnInit() {
    const doctorId = this.dialogConfig.data.doctorId;
    if (doctorId) {
      this.doctorService.onGetDoctorById(doctorId);
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}

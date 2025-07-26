import { Component, inject, OnInit } from '@angular/core';
import { DoctorService } from '../../core/services/doctor.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SpinnerComponent } from '../../shared/ui/spinner/spinner.component';
import { TooltipModule } from 'primeng/tooltip';
import { DoctorEditComponent } from '../doctor-edit/doctor-edit.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService,MessageService } from 'primeng/api';


@Component({
  selector: 'app-doctor-details',
  imports: [AsyncPipe, ButtonModule, SpinnerComponent, TooltipModule,ConfirmDialog],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.css',
  providers: [DialogService, ConfirmationService, MessageService],
})
export class DoctorDetailsComponent implements OnInit {
  doctorService = inject(DoctorService);
  currentDoctor$ = this.doctorService.currentDoctor$;
  loading$ = this.doctorService.loading$;
  error$ = this.doctorService.error$;
  dialogConfig = inject(DynamicDialogConfig);
  dialogRef = inject(DynamicDialogRef);
  dialogService = inject(DialogService);
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);
  doctordId: string | null = null;

  ngOnInit() {
    const doctorId = this.dialogConfig.data.doctorId;
    if (doctorId) {
      this.doctordId = doctorId;
      this.doctorService.onGetDoctorById(doctorId);
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  openEditDoctor() {
    this.onClose();
    this.dialogRef = this.dialogService.open(DoctorEditComponent, {
      header: 'Edit Doctor',
      modal: true,
      breakpoints: { '1199px': '75vw', '575px': '90vw' },
      draggable: false,
      resizable: false,
      focusOnShow: false,
      width: '30vw',
      data: { id: this.doctordId },
    });
  }

  onDelete(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this doctor?',
            header: 'Danger Zone',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger',
            },

            accept: () => {
                if (this.doctordId) {
                    this.doctorService.onDeleteDoctorById(this.doctordId);
                    this.doctorService.loading$.subscribe(loading => {
                        if (!loading) {
                            this.dialogRef.close();
                        }
                    });
                }
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            },
        });
    }
}

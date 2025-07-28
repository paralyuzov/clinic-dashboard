import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PatientService } from '../../core/services/patient.service';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SpinnerComponent } from '../../shared/ui/spinner/spinner.component';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { PatientEditComponent } from '../patient-edit/patient-edit.component';

@Component({
  selector: 'app-patient-details',
  imports: [
    AsyncPipe,
    ButtonModule,
    SpinnerComponent,
    TooltipModule,
    ConfirmDialog,
    DatePipe,
  ],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css',
  providers: [DialogService, ConfirmationService, MessageService],
})
export class PatientDetailsComponent implements OnInit {
  patientService = inject(PatientService);
  currentPatient$ = this.patientService.currentPatient$;
  loading$ = this.patientService.loading$;
  error$ = this.patientService.error$;
  dialogConfig = inject(DynamicDialogConfig);
  dialogRef = inject(DynamicDialogRef);
  dialogService = inject(DialogService);
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);
  patientId: string | null = null;

  ngOnInit(): void {
    const patientId = this.dialogConfig.data.patientId;
    if (patientId) {
      this.patientId = patientId;
      this.patientService.onGetPatientById(patientId);
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  openEditPatient() {
    this.onClose();
    this.dialogRef = this.dialogService.open(PatientEditComponent, {
      header: 'Edit Patient',
      modal: true,
      breakpoints: { '1199px': '75vw', '575px': '90vw' },
      draggable: false,
      resizable: false,
      focusOnShow: false,
      width: '30vw',
      data: { id: this.patientId },
    });
  }

  onDelete(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this patient?',
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
                if (this.patientId) {
                    this.patientService.onDeletePatientById(this.patientId);
                    this.patientService.loading$.subscribe(loading => {
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

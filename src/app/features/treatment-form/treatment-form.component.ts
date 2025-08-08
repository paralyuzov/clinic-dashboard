import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppointmentService } from '../../core/services/appointment.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-treatment-form',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    ButtonModule,
    MessageModule,
    InputTextModule,
    TextareaModule,
  ],
  templateUrl: './treatment-form.component.html',
  styleUrl: './treatment-form.component.css',
})
export class TreatmentFormComponent {
  treatmentForm: FormGroup;
  formSubmitted = false;
  dialogRef = inject(DynamicDialogRef);
  dialogConfig = inject(DynamicDialogConfig);
  appointmentService = inject(AppointmentService);
  userService = inject(UserService);
  currentUserId = this.userService.currentUser?._id;

  constructor(fb: FormBuilder) {
    this.treatmentForm = fb.group({
      date: [new Date().toISOString().substring(0, 10), [Validators.required]],
      diagnosis: ['', [Validators.required]],
      treatment: ['', [Validators.required]],
      notes: ['', [Validators.required]],
    });
  }

  isInvalid(controlName: string) {
    const control = this.treatmentForm.get(controlName);
    return control?.invalid && (control.touched || this.treatmentForm.dirty);
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.treatmentForm.valid) {
      const treatmentData = this.treatmentForm.value;
      const { appointmentId, status } = this.dialogConfig.data;
      this.appointmentService.onChangeAppointmentStatus(appointmentId, status,{...treatmentData, doctorId: this.currentUserId});
      this.dialogRef.close(treatmentData);
    }
  }
}

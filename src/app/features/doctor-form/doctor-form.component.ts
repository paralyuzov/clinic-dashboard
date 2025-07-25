import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';
import { DoctorService } from '../../core/services/doctor.service';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-doctor-form',
  imports: [
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabel,
    ButtonModule,
    MessageModule,
    TextareaModule,
  ],
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.css',
})
export class DoctorFormComponent {
  doctorService = inject(DoctorService);
  router = inject(Router);
  doctorForm: FormGroup;
  formSubmitted = false;
  loading$ = this.doctorService.loading$;

  dialogRef = inject(DynamicDialogRef);

  constructor(private fb: FormBuilder) {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]],
      specialization: ['', Validators.required],
      bio: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  isInvalid(controlName: string) {
    const control = this.doctorForm.get(controlName);
    return control?.invalid && (control.touched || this.doctorForm.dirty);
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.doctorForm.valid) {
      this.doctorService.onCreateDoctor(this.doctorForm.value);
      this.doctorForm.reset();
      this.formSubmitted = false;
      this.dialogRef.close();
    }
  }
}

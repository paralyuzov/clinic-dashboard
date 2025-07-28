import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup , ReactiveFormsModule, Validators} from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PatientService } from '../../core/services/patient.service';



@Component({
  selector: 'app-patient-form',
  imports: [ReactiveFormsModule, FloatLabel, ButtonModule, MessageModule, InputTextModule],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css',
})
export class PatientFormComponent {
  patientForm: FormGroup;
  formSubmitted = false;
  dialogRef = inject(DynamicDialogRef);
  patientService = inject(PatientService);

  constructor(fb: FormBuilder) {
    this.patientForm = fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      ucn: ['', [Validators.required]],
      address: fb.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        country: ['', [Validators.required]],
      }),
    });
  }

  isInvalid(controlName:string) {
    const control = this.patientForm.get(controlName);
    return control?.invalid && (control.touched || this.patientForm.dirty);
  }

  onSubmit() {
    if(this.patientForm.valid) {
      const patientData = this.patientForm.value;
      this.patientService.onCreatePatient(patientData);
      this.patientForm.reset();
      this.formSubmitted = true;
      this.dialogRef.close();
    }
  }
}

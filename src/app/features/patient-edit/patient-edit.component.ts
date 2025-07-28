import { Component, inject, OnInit } from '@angular/core';
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
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { take } from 'rxjs';
import { PatientService } from '../../core/services/patient.service';
import { Patient } from '../../core/models/patient.model';

@Component({
  selector: 'app-patient-edit',
  imports: [
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabel,
    ButtonModule,
    MessageModule,
    TextareaModule,
  ],
  templateUrl: './patient-edit.component.html',
  styleUrl: './patient-edit.component.css',
})
export class PatientEditComponent implements OnInit {
  patientEditForm: FormGroup;
  formSubmitted = false;
  dialogRef = inject(DynamicDialogRef);
  dialogConfig = inject(DynamicDialogConfig);
  patientService = inject(PatientService);
  patientId: string | null = null;
  loading$ = this.patientService.loading$;

  constructor(private fb: FormBuilder) {
    this.patientEditForm = fb.group({
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

  ngOnInit(): void {
    this.patientId = this.dialogConfig.data.id;
    if (this.patientId) {
      this.patientService.onGetPatientById(this.patientId);
      this.patientService.currentPatient$.pipe(take(1)).subscribe((patient) => {
        if (patient) {
          this.patientEditForm.patchValue(patient);
        }
      });
    }
  }

  isInvalid(controlName: string) {
    const control = this.patientEditForm.get(controlName);
    return control?.invalid && (control.touched || this.patientEditForm.dirty);
  }

  onSubmit() {
  this.formSubmitted = true;
    if (this.patientEditForm.valid && this.patientId) {
      const patientData: Patient = this.patientEditForm.value;
      this.patientService.onUpdatePatientById(this.patientId, patientData);
      this.dialogRef.close();
    }
  }
}

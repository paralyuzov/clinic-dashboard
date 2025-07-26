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
import { DoctorService } from '../../core/services/doctor.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { take } from 'rxjs';

@Component({
  selector: 'app-doctor-edit',
  imports: [
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabel,
    ButtonModule,
    MessageModule,
    TextareaModule,
  ],
  templateUrl: './doctor-edit.component.html',
  styleUrl: './doctor-edit.component.css',
})
export class DoctorEditComponent implements OnInit {
  doctorEditForm: FormGroup;
  formSubmitted = false;
  dialogRef = inject(DynamicDialogRef);
  dialogConfig = inject(DynamicDialogConfig);
  doctorService = inject(DoctorService);

  currentDoctor$ = this.doctorService.currentDoctor$;
  loading$ = this.doctorService.loading$;
  error$ = this.doctorService.error$;

  constructor(private fb: FormBuilder) {
    this.doctorEditForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]],
      specialization: ['', Validators.required],
      bio: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  ngOnInit(): void {
    const doctorId = this.dialogConfig.data.id;
    if (doctorId) {
      this.doctorService.onGetDoctorById(doctorId);
      this.currentDoctor$.pipe(take(1)).subscribe(doctor => {
        if (doctor) {
          this.doctorEditForm.patchValue(doctor);
        }
      });
    }
  }

  isInvalid(controlName: string) {
    const control = this.doctorEditForm.get(controlName);
    return control?.invalid && (control.touched || this.doctorEditForm.dirty);
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.doctorEditForm.valid) {
      const doctorId = this.dialogConfig.data.id;
      if (doctorId) {
        this.doctorService.onEditDoctorById(doctorId, this.doctorEditForm.value);
        this.doctorService.loading$.subscribe(loading => {
          if (!loading) {
            this.dialogRef.close();
          }
        });
      }
    }
  }

}

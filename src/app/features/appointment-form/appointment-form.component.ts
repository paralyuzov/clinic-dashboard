import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DoctorService } from '../../core/services/doctor.service';
import { AsyncPipe } from '@angular/common';
import { PatientService } from '../../core/services/patient.service';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppointmentService } from '../../core/services/appointment.service';
import { AppointmentDto } from '../../core/models/appointment.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { AVAILABLE_HOURS } from '../../constants/slots';

@Component({
  selector: 'app-appointment-form',
  imports: [
    DatePicker,
    FormsModule,
    ButtonModule,
    SelectModule,
    AsyncPipe,
    FloatLabelModule,
    TextareaModule,
    ReactiveFormsModule,
  ],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentFormComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  appoitmentForm: FormGroup;
  unavailableSlots: string[] = [];
  formSubmitted = false;
  minDate: Date = new Date();
  availableSlots: string[] = [];
  doctorService = inject(DoctorService);
  patientService = inject(PatientService);
  appointmentService = inject(AppointmentService);
  dialogRef = inject(DynamicDialogRef);
  patients$ = this.patientService.patients$;
  doctors$ = this.doctorService.doctors$;
  fullDays$ = this.appointmentService.fullDays$;
  allSlots: string[] = AVAILABLE_HOURS;
  private cdr = inject(ChangeDetectorRef);

  constructor(fb: FormBuilder) {
    const today = new Date();
    this.appoitmentForm = fb.group({
      doctor: [null, [Validators.required]],
      patient: [null, [Validators.required]],
      date: [today, [Validators.required]],
      time: [null, [Validators.required]],
      reason: ['', [Validators.required]],
      notes: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.doctorService.onGetDoctors();
    this.patientService.onGetPatients();
    this.subs.add(
      this.appoitmentForm.get('doctor')!.valueChanges.subscribe((doctorId) => {
        this.fetchSlots();
        if (doctorId) {
          this.appointmentService.fetchFullDaysByDoctor(doctorId);
          this.cdr.markForCheck();
        }
      })
    );
    this.subs.add(
      this.appoitmentForm
        .get('date')!
        .valueChanges.subscribe(() => this.fetchSlots())
    );
    this.cdr.markForCheck();
    this.subs.add(
      this.appointmentService.appointmentsByDate$.subscribe((appointments) => {
        this.unavailableSlots = appointments.map((a) => a.hours);
        this.cdr.markForCheck();
      })
    );
  }

  onSubmit() {
    if (this.appoitmentForm.valid) {
      this.formSubmitted = true;
      const appointmentData: AppointmentDto = {
        doctor: this.appoitmentForm.value.doctor,
        patient: this.appoitmentForm.value.patient,
        date: this.formatDate(this.appoitmentForm.value.date),
        hours: this.appoitmentForm.value.time,
        reason: this.appoitmentForm.value.reason,
        notes: this.appoitmentForm.value.notes,
      };
      this.appointmentService.onCreateAppointment(appointmentData);
      this.appoitmentForm.reset();
      this.formSubmitted = false;
      this.appointmentService.resetAppointmentsByDate();
    }
  }

  onClose() {
    this.appoitmentForm.reset();
    this.formSubmitted = false;
    this.appointmentService.resetAppointmentsByDate();
    this.dialogRef.close();
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  fetchSlots() {
    const doctorId = this.appoitmentForm.get('doctor')!.value;
    const date = this.appoitmentForm.get('date')!.value;
    if (doctorId && date) {
      const formattedDate = this.formatDate(date);
      this.appointmentService.fetchAppointmentsByDoctorAndDate(
        doctorId,
        formattedDate
      );
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

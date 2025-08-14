import { Component, inject } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../core/services/user.service';


@Component({
  selector: 'app-reset-password',
  imports: [InputText, FloatLabel, FormsModule, ReactiveFormsModule, MessageModule, ButtonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  formSubmitted: boolean = false;
  userService = inject(UserService);

  constructor(fb: FormBuilder) {
    this.resetForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.resetForm.valid) {
      const email = this.resetForm.value.email;
      this.userService.onResetPassword(email);
    }
  }

  isInvalid(controlName: string) {
    const control = this.resetForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}

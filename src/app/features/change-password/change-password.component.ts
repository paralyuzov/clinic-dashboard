import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-change-password',
  imports: [
    ReactiveFormsModule,
    InputText,
    FloatLabel,
    MessageModule,
    ButtonModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  formSubmitted: boolean = false;
  private resetToken: string | null = null;
  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);

  constructor(fb: FormBuilder) {
    this.resetToken = this.activatedRoute.snapshot.queryParamMap.get('token');
    this.changePasswordForm = fb.group(
      {
        password: fb.control('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: fb.control('', [Validators.required]),
      },
      {
        validators: [this.passwordsMatchValidator],
      }
    );
  }

  isInvalid(controlName: string) {
    const control = this.changePasswordForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    } else {
      const confirmPasswordControl = form.get('confirmPassword');
      if (confirmPasswordControl?.errors) {
        delete confirmPasswordControl.errors['passwordsMismatch'];
        if (Object.keys(confirmPasswordControl.errors).length === 0) {
          confirmPasswordControl.setErrors(null);
        }
      }
      return null;
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.changePasswordForm.valid && this.resetToken) {
      const formData = this.changePasswordForm.value;
      const data = {
        token: this.resetToken,
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword,
      };
      this.userService.onChangePassword(data);
    }
  }
}

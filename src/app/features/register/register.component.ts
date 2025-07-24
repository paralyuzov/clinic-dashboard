import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    InputTextModule,
    FormsModule,
    FloatLabel,
    ButtonModule,
    MessageModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  formSubmitted = false;
  userService = inject(UserService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  isInvalid(controlName: string) {
    const control = this.registerForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    this.formSubmitted = true;
    (this.registerForm.value);
    if (this.registerForm.valid) {
      this.userService.onRegister(this.registerForm.value);
      this.userService.loading$.subscribe(loading => {
        if (!loading) {
          this.router.navigate(['']);
        }
      });
    }
  }
}

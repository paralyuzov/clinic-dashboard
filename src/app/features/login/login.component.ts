import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    InputTextModule,
    FormsModule,
    FloatLabel,
    ButtonModule,
    MessageModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm:FormGroup;
  formSubmitted = false;
  userService = inject(UserService);
  router = inject(Router);

  constructor(private fb:FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

   isInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.userService.onLogin(this.loginForm.value);
      this.userService.loading$.subscribe(loading => {
        if (!loading) {
          this.router.navigate(['']);
        }
      });
    }
  }
}

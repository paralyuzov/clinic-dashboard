import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginDto, RegisterDto, User } from '../models/user.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authService = inject(AuthService);
  private router = inject(Router);

  private user$$ = new BehaviorSubject<User | null>(null);
  public readonly user$ = this.user$$.asObservable();
  private loading$$ = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loading$$.asObservable();
  private error$$ = new BehaviorSubject<string | null>(null);
  public readonly error$ = this.error$$.asObservable();

  isLoggedIn(): boolean {
    return !!this.user$$.value || !!localStorage.getItem('accessToken');
  }

  onRegister(registerDto: RegisterDto) {
    this.loading$$.next(true);
    this.authService.register(registerDto).subscribe({
      next: (response) => {
        this.user$$.next(response.user);
        localStorage.setItem('accessToken', response.accessToken);
        this.error$$.next(null);
        this.loading$$.next(false);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.error$$.next(error.message);
        this.loading$$.next(false);
      },
    });
  }

  onLogin(loginDto:LoginDto) {
    this.loading$$.next(true);
    this.authService.login(loginDto).subscribe({
      next: (response) => {
        this.user$$.next(response.user);
        localStorage.setItem('accessToken', response.accessToken);
        this.error$$.next(null);
        this.loading$$.next(false);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.error$$.next(error.message);
        this.loading$$.next(false);
      },
    });
  }

  onLogout() {
    this.loading$$.next(true);
    this.authService.logout().subscribe({
      next: () => {
        this.user$$.next(null);
        localStorage.removeItem('accessToken');
        this.error$$.next(null);
        this.loading$$.next(false);
        this.router.navigate(['login']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
        this.error$$.next(error.message);
        this.loading$$.next(false);
      },
    });
  }

  verifyUser() {
    this.loading$$.next(true);
    this.authService.verify().subscribe({
      next: (user) => {
        this.user$$.next(user);
        this.error$$.next(null);
        this.loading$$.next(false);
      },
      error: (error) => {
        console.error('User verification failed:', error);
        this.error$$.next(error.message);
        this.loading$$.next(false);
      },
    });
  }


}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  RegisterDto,
  UserResponse,
  User,
  LoginDto,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/auth';
  private http = inject(HttpClient);

  register(registerDto: RegisterDto) {
    return this.http.post<UserResponse>(
      `${this.baseUrl}/register`,
      registerDto,
      {
        withCredentials: true,
      }
    );
  }

  login(loginDto: LoginDto) {
    return this.http.post<UserResponse>(`${this.baseUrl}/login`, loginDto, {
      withCredentials: true,
    });
  }

  logout() {
    return this.http.post(
      `${this.baseUrl}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  verify() {
    const token = localStorage.getItem('accessToken');
    return this.http.get<User>(`${this.baseUrl}/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  refreshToken() {
    return this.http.get<UserResponse>(`${this.baseUrl}/refresh-token`, {
      withCredentials: true,
    });
  }
}

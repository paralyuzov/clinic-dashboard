import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterDto, RegisterResponse, User } from '../models/user.model';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/auth';
  private http = inject(HttpClient);


  register(registerDto: RegisterDto) {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, registerDto, {
      withCredentials: true,
    });
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
    return this.http.get<RegisterResponse>(`${this.baseUrl}/refresh-token`, {
      withCredentials: true,
    });
  }


}

import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, BehaviorSubject, filter, take, finalize, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

let isRefreshing = false;
let refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const authEndpoints = ['/auth/register', '/auth/login', '/auth/logout', '/auth/refresh-token'];
  if (authEndpoints.some(endpoint => req.url.includes(endpoint))) {
    return next(req);
  }

  const accessToken = localStorage.getItem('accessToken');
  let authReq = req;

  if (accessToken) {
    authReq = addTokenToRequest(req, accessToken);
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && accessToken) {
        return handle401Error(req, next, authService, router);
      }
      return throwError(() => error);
    })
  );
};

function addTokenToRequest(request: HttpRequest<unknown>, token: string) {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function handle401Error(request: HttpRequest<unknown>, next: HttpHandlerFn, authService: AuthService, router: Router) {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((response: any) => {
        if (response && response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          refreshTokenSubject.next(response.accessToken);
          return next(addTokenToRequest(request, response.accessToken));
        }

        localStorage.removeItem('accessToken');
        router.navigate(['/login']);
        return throwError(() => new Error('Token refresh failed'));
      }),
      catchError((error) => {
        localStorage.removeItem('accessToken');
        router.navigate(['/login']);
        return throwError(() => error);
      }),
      finalize(() => {
        isRefreshing = false;
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => {
        if (token) {
          return next(addTokenToRequest(request, token));
        }
        return throwError(() => new Error('Token refresh failed'));
      })
    );
  }
}

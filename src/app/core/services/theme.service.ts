import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private key = 'theme';

  private isDarkSubject = new BehaviorSubject<boolean>(false);
  readonly isDark$ = this.isDarkSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem(this.key);
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const initial = saved ? saved === 'dark' : prefersDark;
    this.apply(initial);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.key)) {
        this.apply(e.matches);
      }
    });
  }

  toggle() {
    this.apply(!this.isDarkSubject.value);
  }

  private apply(isDark: boolean) {
    this.isDarkSubject.next(isDark);
    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark', isDark);

    localStorage.setItem(this.key, isDark ? 'dark' : 'light');
  }
}

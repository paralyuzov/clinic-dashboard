import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messageService = inject(MessageService);
  private defaultLife = 3000;

  success(summary: string, detail?: string, life: number = this.defaultLife) {
    this.messageService.add({ severity: 'success', summary, detail, life });
  }

  error(summary: string, detail?: string, life: number = this.defaultLife) {
    this.messageService.add({ severity: 'error', summary, detail, life });
  }

  info(summary: string, detail?: string, life: number = this.defaultLife) {
    this.messageService.add({ severity: 'info', summary, detail, life });
  }

  warn(summary: string, detail?: string, life: number = this.defaultLife) {
    this.messageService.add({ severity: 'warn', summary, detail, life });
  }
}

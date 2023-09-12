import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private readonly messageService: MessageService) {}

  success(msg: string, title: string = 'Success'): void {
    this.add('success', title, msg);
  }

  info(msg: string, title: string = 'Information'): void {
    this.add('info', title, msg);
  }

  warning(msg: string, title: string = 'Warning'): void {
    this.add('warn', title, msg);
  }

  error(msg: string, title: string = 'Error'): void {
    this.add('error', title, msg);
  }

  add(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }

  clear(): void {
    this.messageService.clear();
  }
}

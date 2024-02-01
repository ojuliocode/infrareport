import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Notification {
  title: string;
  color: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  private notification$ = new BehaviorSubject<Notification | null>(null);

  notify(title: string, color: string, message: string) {
    this.notification$.next({ title, color, message });
    setTimeout(() => {
      this.notification$.next(null);
    }, 3500);
  }

  getNotification() {
    return this.notification$.asObservable();
  }
}

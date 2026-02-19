import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  requestPermission() {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }

  showNotification(title: string, body: string) {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body: body,
        icon: 'assets/icon.png'
      });
    }
  }
}

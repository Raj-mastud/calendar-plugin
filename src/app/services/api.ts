import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private config: any = {};

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      this.config = (window as any).CalendarNotesPlugin || {};
    }
  }

  getNotes(date: string) {
    return this.http.get(
      `${this.config.apiBaseUrl}/notes?date=${date}`
    );
  }

  saveNote(date: string, content: string) {
    return this.http.post(
      `${this.config.apiBaseUrl}/notes`,
      { date, content }
    );
  }

  getDatesWithNotes() {
  if (!this.config.apiBaseUrl) {
    console.error('API Base URL not configured');
    return [];
  }

  return this.http.get(
    `${this.config.apiBaseUrl}/notes/dates`
  );
}

}

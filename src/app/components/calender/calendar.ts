import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar implements OnInit {

  @Output() dateSelected = new EventEmitter<string>();
  @Output() monthChanged = new EventEmitter<void>();

  @Input() notes: { [key: string]: any[] } = {};

  currentDate: Date = new Date();
  calendarDays: (number | null)[] = [];
  selectedDay: number | null = null;

  today = new Date();

isToday(day: number | null): boolean {
  if (!day) return false;

  return (
    day === this.today.getDate() &&
    this.currentDate.getMonth() === this.today.getMonth() &&
    this.currentDate.getFullYear() === this.today.getFullYear()
  );
}



ngOnInit() {
  
  this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    this.calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      this.calendarDays.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      this.calendarDays.push(day);
    }
  }

  selectDate(day: number | null) {
    if (!day) return;

    this.selectedDay = day;
    this.dateSelected.emit(this.formatDate(day));
  }

  isSelected(day: number | null) {
    return day === this.selectedDay;
  }

  formatDate(day: number): string {
    const y = this.currentDate.getFullYear();
    const m = this.currentDate.getMonth() + 1;

    const month = m < 10 ? '0' + m : m;
    const d = day < 10 ? '0' + day : day;

    return `${y}-${month}-${d}`;
  }

  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    this.selectedDay=null;
    this.generateCalendar();
    this.monthChanged.emit();
  }

  prevMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.selectedDay=null;
    this.generateCalendar();
    this.monthChanged.emit();
  }

    hasNotes(day: number |null): boolean {
  if (!day) return false;

  const month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  const year = this.currentDate.getFullYear();
  const dateString = `${year}-${month}-${dayStr}`;

  return this.notes[dateString] && this.notes[dateString].length > 0;
}

}

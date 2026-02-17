import { Component } from '@angular/core';
import { Calendar } from '../calender/calendar';
import { Notes } from '../notes/notes';

@Component({
  selector: 'app-widget',
  imports: [Calendar,Notes],
  templateUrl: './widget.html',
  styleUrl: './widget.css',
})
export class Widget {
      
  isOpen = false;
  selectedDate = '';

  toggle() {
    this.isOpen = !this.isOpen;
  }

  onDateSelected(date: string) {
    this.selectedDate = date;
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Calendar } from '../calender/calendar';
import { FormsModule } from '@angular/forms';
import { Notes } from '../notes/notes';

@Component({
  selector: 'app-panel',
  standalone:true,
  imports: [CommonModule,Calendar,Notes],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {

  
  selectedDate: string  | null=null;
  notes: { [key: string]: any[] } = {};

  onDateSelected(date: string) {
    this.selectedDate = date;
  }

  onNotesChanged(updatedNotes: { [key: string]: any[] }) {
  for (const key in updatedNotes) {
      if (!this.notes[key]) this.notes[key] = [];
      this.notes[key] = [...this.notes[key], ...updatedNotes[key]];
    }  
  }
  onMonthChanged() {
    console.log('Month changed');
  this.selectedDate = null;
  console.log('Selected date after clear:', this.selectedDate);
}

}

import { Component } from '@angular/core';
import { Panel } from '../panel/panel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Notes } from '../notes/notes';

@Component({
  selector: 'app-floating-button',
  imports: [CommonModule,FormsModule,Panel],
  templateUrl: './floating-button.html',
  styleUrl: './floating-button.css',
})
export class FloatingButton {

  selectedDate: string = '';
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  onDateSelected(date: string) {
  this.selectedDate = date;
}
}

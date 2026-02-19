import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Calendar } from '../calender/calendar';
import { FormsModule } from '@angular/forms';
import { Notes } from '../notes/notes';
import { SupabaseService } from '../../services/supabase';
import { ReminderService } from '../../services/notification';

@Component({
  selector: 'app-panel',
  standalone:true,
  imports: [CommonModule,Calendar,Notes],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {


  constructor(
              private supabaseService:SupabaseService,
              private reminderService:ReminderService
               
  ){}
  
  selectedDate: string  | null=null;
  notes: { [key: string]: any[] } = {};

  ngOnInit() {
  setInterval(() => {
    this.checkReminders();
  }, 10000); // every 1 min
}


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


  async checkReminders() {
  const now = new Date().toISOString();

  const { data } = await this.supabaseService.supabase
    .from('notes')
    .select('*')
    .lte('reminder_at', now)
    .is('notified', false);

    if (!data || data.length === 0) return;
    for (const note of data) {
    this.reminderService.showNotification(
      'Reminder',
      note.content
    );
  
    // Mark as notified
    const { error: updateError } =await  this.supabaseService.supabase
      .from('notes')
      .update({ notified: true })
      .eq('id', note.id);
  

  if (updateError) {
      console.error('Update error:', updateError);
    }
}
  }
}

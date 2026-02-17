import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-notes',
  imports: [FormsModule,CommonModule],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
})
export class Notes implements OnChanges ,OnInit{

  constructor(private supabaseService:SupabaseService,
              private ngzone:NgZone,
              private cd: ChangeDetectorRef

  ){

  let storedId = localStorage.getItem('testUserId');

  if (!storedId) {
    storedId = uuidv4();
    localStorage.setItem('testUserId', storedId);
  }
  this.userId = storedId;
  }
  
  @Input() selectedDate: string | null=null;
  @Output() notesChanged = new EventEmitter<{ [key: string]: any[] }>();


  noteTitle: string = '';
  noteContent: string = '';
  notes: { [key: string]: any[] } = {};  
  userId!: string;
  selectedNotes: any[] = [];

  async ngOnInit() {
  await this.loadAllNotes();
}

 ngOnChanges() {
    if (!this.selectedDate) {
    this.selectedNotes = [];
    return;
  }

  // If date exists → show notes for that date
  this.selectedNotes = this.notes[this.selectedDate] || [];
  }
async save() {
  if (!this.noteTitle || !this.noteContent) return;
  if (!this.selectedDate) return;
  const dateKey = this.selectedDate;

  // 1️⃣ Get or create userId
  let userId = localStorage.getItem('testUserId');

  if (!userId) {
    userId = uuidv4();
    localStorage.setItem('testUserId', userId);
  }

  try {

    // 2️⃣ Save to Supabase
    const savedNote = await this.supabaseService.saveNote({
      user_id: this.userId,                 
      note_date: this.selectedDate,
      title: this.noteTitle,
      content: this.noteContent
    });

    // 3️⃣ Instantly update UI (add at bottom)
    if (savedNote) {
      this.ngzone.run(() => {
      const dateKey = this.selectedDate!;

      if (!this.notes[dateKey]) this.notes[dateKey] = [];
      this.notes[dateKey].push(savedNote);

      this.selectedNotes = this.notes[dateKey];

      
      this.notesChanged.emit(this.notes);

            
    // 4️⃣ Clear input fields
    this.noteTitle = '';
    this.noteContent = '';

    this.cd.detectChanges();

      });
    }

  } catch (err) {
    console.error(err);
    alert('Error saving note');
  }
}

  
async loadAllNotes() {
  try {
    const data = await this.supabaseService.getAllNotes(this.userId);

    if (data) {
      for (const note of data) {
        const dateKey = note.note_date; // already yyyy-mm-dd

        if (!this.notes[dateKey]) this.notes[dateKey] = [];
        this.notes[dateKey].push(note);
      }

        this.notesChanged.emit(this.notes);

       if (this.selectedDate) {
        this.selectedNotes = this.notes[this.selectedDate] || [];
      }
    }

  } catch (err) {
    console.error('Load all notes error:', err);
  }
}


}


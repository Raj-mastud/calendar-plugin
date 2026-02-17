import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://gducpmpxpludvsizbgdy.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkdWNwbXB4cGx1ZHZzaXpiZ2R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNTY4OTIsImV4cCI6MjA4NjYzMjg5Mn0.7FVvOLV1PFTEEFhpJMQ7Skd5FsWh8S4jh-hSbTdZ0Hc'
    );
  }

  async saveNote(note: {
    user_id: string;
    note_date: string;
    title?: string;
    content: string;
  }) {
    const { data, error } = await this.supabase
      .from('notes')
      .insert([note])
      .select()
      .single();

    if (error) {
      console.error('Insert error:', error);
      throw error;
    }

    return data;
  }

  async getNotesByDate(date: string, userId: string) {
    const { data, error } = await this.supabase
      .from('notes')
      .select('*')
      .eq('note_date', date)
      .eq('user_id', userId);

    if (error) {
      console.error('Fetch error:', error);
      throw error;
    }

    return data;
  }
  
async getAllNotes(userId: string) {
  const { data, error } = await this.supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}

}

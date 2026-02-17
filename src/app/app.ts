import { CommonModule } from '@angular/common';
import { Component, signal, ViewEncapsulation } from '@angular/core';
import { FloatingButton } from './components/floating-button/floating-button';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [CommonModule,FloatingButton],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './app.html',
  styleUrl: './app.css',
   
})
export class App {
  protected readonly title = signal('notes_plugin');

}
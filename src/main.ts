import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

function mountWidget() {
  // Prevent double loading
  if ((window as any).CalendarNotesLoaded) return;
  (window as any).CalendarNotesLoaded = true;

  // Prevent duplicate DOM container
  if (document.getElementById('calendar-notes-root')) return;

  const container = document.createElement('div');
  container.id = 'calendar-notes-root';

  container.style.position = 'fixed';
  container.style.bottom = '20px';
  container.style.right = '20px';
  container.style.zIndex = '999999';

  document.body.appendChild(container);

  bootstrapApplication(App, appConfig)
    .catch((err: unknown) => console.error(err));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountWidget);
} else {
  mountWidget();
}

import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <main class="flex min-h-screen flex-col bg-[rgb(var(--color-bg))]">
      <app-header />
      <ng-content />
    </main>
  `,
})
export class AppShellComponent {}

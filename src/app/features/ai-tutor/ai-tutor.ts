import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header';
import { ChatWidgetComponent } from '../../shared/components/chat-widget/chat-widget';

@Component({
  selector: 'app-ai-tutor',
  standalone: true,
  imports: [HeaderComponent, ChatWidgetComponent],
  template: `
    <main class="flex min-h-screen flex-col bg-[rgb(var(--color-bg))]">
      <app-header />

      <!-- Chat Widget — fills ALL remaining space -->
      <section class="flex-1 px-4 pb-4">
        <div class="h-full w-full">
          <app-chat-widget class="h-full w-full" />
        </div>
      </section>
    </main>
  `,
})
export class AiTutorComponent {}

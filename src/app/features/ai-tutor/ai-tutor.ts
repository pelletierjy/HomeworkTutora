import { Component } from '@angular/core';
import { AppShellComponent } from '@shared/components/app-shell/app-shell';
import { ChatWidgetComponent } from '@shared/components/chat-widget/chat-widget';

@Component({
  selector: 'app-ai-tutor',
  standalone: true,
  imports: [AppShellComponent, ChatWidgetComponent],
  template: `
    <app-shell>
      <!-- Chat Widget — fills ALL remaining space -->
      <section class="flex-1 px-4 pb-4">
        <div class="h-full w-full">
          <app-chat-widget class="h-full w-full" />
        </div>
      </section>
    </app-shell>
  `,
})
export class AiTutorComponent {}

import { Component, CUSTOM_ELEMENTS_SCHEMA, afterNextRender, computed, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

const WIDGET_SCRIPT_SRC = 'https://pelletierjy.github.io/ConversiaCore/conversia-core-widget.js';
const CUSTOM_ELEMENT_TAG = 'conversia-app';

function loadConversiaWidgetScript(): void {
  if (customElements.get(CUSTOM_ELEMENT_TAG)) return;
  if (document.querySelector(`script[src="${WIDGET_SCRIPT_SRC}"]`)) return;
  const script = document.createElement('script');
  script.type = 'module';
  script.src = WIDGET_SCRIPT_SRC;
  document.head.appendChild(script);
}

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <aside
      class="flex h-full w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] shadow-xl"
    >
      <!-- Header -->
      <header class="flex items-center gap-3 bg-gradient-to-r from-primary-500 to-secondary-500 p-4 text-white">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl">
          🎓
        </div>
        <div>
          <h2 class="font-display text-lg font-semibold">Homework Tutora</h2>
          <p class="text-sm opacity-90">AI Tutor</p>
        </div>
      </header>

      <!-- ConversiaCore embedded tutor widget -->
      <div class="min-h-0 flex-1">
        <conversia-app context="HomeworkTutora" [attr.theme]="theme()" lang="en" class="block h-full w-full"></conversia-app>
      </div>
    </aside>
  `,
})
export class ChatWidgetComponent {
  private readonly themeService = inject(ThemeService);

  readonly theme = computed(() => (this.themeService.isDark() ? 'dark' : 'light'));

  constructor() {
    afterNextRender(() => loadConversiaWidgetScript());
  }
}

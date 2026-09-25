import { Component, CUSTOM_ELEMENTS_SCHEMA, afterNextRender, computed, inject, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { ThemeStore } from '@core/state/theme.store';
import { LocaleSwitchService } from '@core/services/locale-switch.service';

const WIDGET_SCRIPT_SRC = environment.conversiaCore.scriptUrl;
const CUSTOM_ELEMENT_TAG = 'conversia-app';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <aside
      class="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] shadow-xl"
    >
      <!-- Header -->
      <header class="flex items-center gap-3 bg-gradient-to-r from-primary-500 to-secondary-500 p-4 text-white">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl">
          🎓
        </div>
        <div>
          <h2 class="font-display text-lg font-semibold" i18n="@@chatWidget.brand">Homework Tutora</h2>
          <p class="text-sm opacity-90" i18n="@@chatWidget.subtitle">AI Tutor</p>
        </div>
      </header>

      <!-- ConversiaCore embedded tutor widget — fills remaining space -->
      @if (loadFailed()) {
        <div
          class="flex flex-1 items-center justify-center p-6 text-center text-sm text-[rgb(var(--color-text-secondary))]"
        >
          <p i18n="@@chatWidget.loadError">
            The AI Tutor widget couldn't load. Please check your connection and try refreshing the page.
          </p>
        </div>
      } @else {
        <div class="min-h-0 flex-1">
          <conversia-app
            [attr.context]="context"
            [attr.theme]="theme()"
            [attr.lang]="activeLocale"
            class="block h-full w-full"
          ></conversia-app>
        </div>
      }
    </aside>
  `,
})
export class ChatWidgetComponent {
  private readonly themeStore = inject(ThemeStore);
  private readonly localeSwitch = inject(LocaleSwitchService);

  readonly theme = computed(() => (this.themeStore.isDark() ? 'dark' : 'light'));
  readonly context = environment.conversiaCore.context;
  readonly activeLocale = this.localeSwitch.activeLocale;
  readonly loadFailed = signal(false);

  constructor() {
    afterNextRender(() => this.loadConversiaWidgetScript());
  }

  private loadConversiaWidgetScript(): void {
    if (customElements.get(CUSTOM_ELEMENT_TAG)) return;
    if (document.querySelector(`script[src="${WIDGET_SCRIPT_SRC}"]`)) return;
    const script = document.createElement('script');
    script.type = 'module';
    script.src = WIDGET_SCRIPT_SRC;
    script.onerror = () => this.loadFailed.set(true);
    document.head.appendChild(script);
  }
}

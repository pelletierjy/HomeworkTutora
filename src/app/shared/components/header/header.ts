import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';
import { LocaleSwitchService, SUPPORTED_LOCALES, type SupportedLocale } from '@core/services/locale-switch.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ThemeToggleComponent],
  template: `
    <header
      class="sticky top-0 z-10 border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))]/80 backdrop-blur-sm"
    >
      <nav class="container mx-auto flex h-16 items-center justify-between px-4">
        <div class="flex items-center gap-3">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-xl text-white shadow-lg"
          >
            🎓
          </div>
          <span i18n="@@header.brand" class="font-display text-xl font-bold text-[rgb(var(--color-text))]"
            >Homework Tutora</span
          >
        </div>

        <div class="flex items-center gap-4">
          <a
            i18n="@@header.nav.home"
            routerLink="/"
            routerLinkActive="text-[rgb(var(--color-text))]"
            class="text-sm text-[rgb(var(--color-text-secondary))] transition-colors hover:text-[rgb(var(--color-text))]"
            >Home</a
          >
          <a
            i18n="@@header.nav.aiTutor"
            routerLink="/ai-tutor"
            routerLinkActive="text-[rgb(var(--color-text))]"
            class="text-sm text-[rgb(var(--color-text-secondary))] transition-colors hover:text-[rgb(var(--color-text))]"
            >AI Tutor</a
          >
          <div
            class="flex items-center gap-1 text-sm"
            role="group"
            aria-label="Language"
            i18n-aria-label="@@header.langSwitch.groupLabel"
          >
            @for (locale of locales; track locale) {
              <button
                type="button"
                (click)="switchLocale(locale)"
                [attr.aria-pressed]="locale === activeLocale"
                [class.font-semibold]="locale === activeLocale"
                class="px-1 uppercase text-[rgb(var(--color-text-secondary))] transition-colors hover:text-[rgb(var(--color-text))]"
              >
                {{ locale }}
              </button>
            }
          </div>
          <app-theme-toggle />
        </div>
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  private readonly localeSwitch = inject(LocaleSwitchService);

  readonly activeLocale = this.localeSwitch.activeLocale;
  readonly locales = SUPPORTED_LOCALES;

  switchLocale(locale: SupportedLocale): void {
    this.localeSwitch.switchTo(locale);
  }
}

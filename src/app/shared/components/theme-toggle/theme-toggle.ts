import { Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Dispatcher } from '@ngrx/signals/events';
import { ThemeStore } from '@core/state/theme.store';
import { themeEvents } from '@core/state/theme.events';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    @if (isDark()) {
      <button
        (click)="toggle()"
        aria-label="Switch to light theme"
        i18n-aria-label="@@themeToggle.ariaLabel.toLight"
        class="relative isolate flex h-9 w-16 cursor-pointer items-center rounded-full p-1 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <ng-container *ngTemplateOutlet="buttonContent" />
      </button>
    } @else {
      <button
        (click)="toggle()"
        aria-label="Switch to dark theme"
        i18n-aria-label="@@themeToggle.ariaLabel.toDark"
        class="relative isolate flex h-9 w-16 cursor-pointer items-center rounded-full p-1 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <ng-container *ngTemplateOutlet="buttonContent" />
      </button>
    }

    <ng-template #buttonContent>
      <!-- Background track -->
      <span
        class="absolute inset-0 rounded-full transition-colors"
        [class.bg-slate-800]="isDark()"
        [class.bg-slate-200]="!isDark()"
      ></span>
      <!-- Sun / Moon icon -->
      <span
        class="absolute z-10 flex h-7 w-7 transform items-center justify-center rounded-full bg-white shadow-lg transition-all"
        [class.translate-x-3]="isDark()"
        [class.-translate-x-3]="!isDark()"
      >
        @if (!isDark()) {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-amber-400"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <path
              d="M12 1v2M12 21v2M4.24 4.24h2M17.76 17.76h2M4.24 19.76 5.66 18.34M18.34 5.66 19.76 4.24M4.24 4.24l1.42 1.42M18.34 18.34l1.42 1.42"
            ></path>
          </svg>
        } @else {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="text-yellow-400"
          >
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            ></path>
          </svg>
        }
      </span>
      <!-- Hidden label for accessibility -->
      <span class="sr-only" i18n="@@themeToggle.srOnlyLabel">Toggle theme</span>
    </ng-template>
  `,
})
export class ThemeToggleComponent {
  private readonly themeStore = inject(ThemeStore);
  private readonly dispatcher = inject(Dispatcher);

  readonly isDark = this.themeStore.isDark;

  toggle(): void {
    this.dispatcher.dispatch(themeEvents.toggled());
  }
}

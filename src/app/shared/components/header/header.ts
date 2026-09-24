import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ThemeToggleComponent],
  template: `
    <header class="sticky top-0 z-10 border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))]/80 backdrop-blur-sm">
      <nav class="container mx-auto flex h-16 items-center justify-between px-4">
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-xl text-white shadow-lg">
            🎓
          </div>
          <span class="font-display text-xl font-bold text-[rgb(var(--color-text))]">Homework Tutora</span>
        </div>

        <div class="flex items-center gap-4">
          <a
            routerLink="/"
            routerLinkActive="text-[rgb(var(--color-text))]"
            class="text-sm text-[rgb(var(--color-text-secondary))] transition-colors hover:text-[rgb(var(--color-text))]"
            >Home</a
          >
          <a
            routerLink="/subjects"
            routerLinkActive="text-[rgb(var(--color-text))]"
            class="text-sm text-[rgb(var(--color-text-secondary))] transition-colors hover:text-[rgb(var(--color-text))]"
            >Subjects</a
          >
          <a
            routerLink="/grades"
            routerLinkActive="text-[rgb(var(--color-text))]"
            class="text-sm text-[rgb(var(--color-text-secondary))] transition-colors hover:text-[rgb(var(--color-text))]"
            >Grades</a
          >
          <a
            routerLink="/knowledge-base"
            routerLinkActive="text-[rgb(var(--color-text))]"
            class="text-sm text-[rgb(var(--color-text-secondary))] transition-colors hover:text-[rgb(var(--color-text))]"
            >Knowledge Base</a
          >
          <app-theme-toggle />
        </div>
      </nav>
    </header>
  `,
})
export class HeaderComponent {}

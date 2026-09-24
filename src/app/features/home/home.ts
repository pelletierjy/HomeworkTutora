import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppShellComponent } from '@shared/components/app-shell/app-shell';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppShellComponent, RouterLink],
  template: `
    <app-shell>
      <!-- Hero -->
      <section class="container mx-auto flex-1 px-4 py-16 text-center md:py-24">
        <h1
          i18n="@@home.hero.heading"
          class="font-display text-4xl font-extrabold tracking-tight text-[rgb(var(--color-text))] sm:text-5xl md:text-6xl"
        >
          <span class="block">Homework made easier,</span>
          <span class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent"
            >one question at a time.</span
          >
        </h1>
        <p i18n="@@home.hero.subtitle" class="mx-auto mt-6 max-w-2xl text-lg text-[rgb(var(--color-text-secondary))]">
          Homework Tutora is your AI-powered tutor helper. Get step-by-step explanations,
          practice problems, and study guides across math, science, languages, and more.
        </p>
        <div class="mt-8 flex justify-center gap-4">
          <a
            i18n="@@home.cta.openAiTutor"
            routerLink="/ai-tutor"
            class="inline-block rounded-xl bg-primary-500 px-6 py-3 font-medium text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-600"
          >
            Open AI Tutor
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="border-t border-[rgb(var(--color-border))] py-4">
        <div class="container mx-auto px-4 text-center text-sm text-[rgb(var(--color-text-tertiary))]">
          <p i18n="@@home.footer.copyright">&copy; 2026 Homework Tutora &mdash; AI Tutor Helper</p>
        </div>
      </footer>
    </app-shell>
  `,
})
export class HomeComponent {}

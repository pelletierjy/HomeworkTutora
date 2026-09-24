import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header';
import { ChatWidgetComponent } from '../../shared/components/chat-widget/chat-widget';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ChatWidgetComponent, RouterLink],
  template: `
    <main class="flex min-h-screen flex-col bg-[rgb(var(--color-bg))]">
      <app-header />

      <!-- Hero -->
      <section class="container mx-auto px-4 py-16 text-center md:py-24">
        <h1 class="font-display text-4xl font-extrabold tracking-tight text-[rgb(var(--color-text))] sm:text-5xl md:text-6xl">
          <span class="block">Homework made easier,</span>
          <span class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent"
            >one question at a time.</span
          >
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-[rgb(var(--color-text-secondary))]">
          Homework Tutora is your AI-powered tutor helper. Get step-by-step explanations,
          practice problems, and study guides across math, science, languages, and more.
        </p>
        <div class="mt-8 flex justify-center gap-4">
          <button
            (click)="scrollToChat()"
            class="rounded-xl bg-primary-500 px-6 py-3 font-medium text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-600"
          >
            Try the Chat Tutor
          </button>
          <a
            routerLink="/subjects"
            class="rounded-xl border border-[rgb(var(--color-border))] px-6 py-3 font-medium text-[rgb(var(--color-text))] transition-colors hover:bg-[rgb(var(--color-bg-secondary))]"
          >
            Browse Subjects
          </a>
        </div>
      </section>

      <!-- Chat Widget Section — fills remaining viewport height -->
      <section
        id="chat"
        class="container mx-auto flex-1 px-4 pb-6"
      >
        <div class="h-[calc(100vh-280px)] w-full">
          <app-chat-widget class="h-full w-full" />
        </div>
      </section>

      <!-- Footer -->
      <footer class="border-t border-[rgb(var(--color-border))] py-6">
        <div class="container mx-auto px-4 text-center text-sm text-[rgb(var(--color-text-tertiary))]">
          <p>&copy; 2026 Homework Tutora &mdash; AI Tutor Helper</p>
        </div>
      </footer>
    </main>
  `,
})
export class HomeComponent {
  scrollToChat(): void {
    document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' });
  }
}

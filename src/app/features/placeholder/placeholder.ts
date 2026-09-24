import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [RouterLink, HeaderComponent],
  template: `
    <div class="min-h-screen bg-[rgb(var(--color-bg))]">
      <app-header />
      <main class="container mx-auto px-4 py-16 text-center">
        <div class="mb-6 text-6xl">🚧</div>
        <h1 class="font-display text-3xl font-bold text-[rgb(var(--color-text))]">
          {{ title }} — Coming Soon
        </h1>
        <p class="mx-auto mt-4 max-w-md text-[rgb(var(--color-text-secondary))]">
          This section is under construction. The {{ title }} feature will be available
          soon with full support for subjects, grades, and the knowledge base.
        </p>
        <a
          routerLink="/"
          class="mt-6 inline-block rounded-xl bg-primary-500 px-6 py-3 font-medium text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-600"
        >
          Back to Home
        </a>
      </main>
    </div>
  `,
})
export class PlaceholderComponent {
  private route = inject(ActivatedRoute);
  readonly title = this.route.snapshot.data['title'] as string || 'Feature';
}

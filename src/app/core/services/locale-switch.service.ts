import { Injectable, LOCALE_ID, inject } from '@angular/core';

export const SUPPORTED_LOCALES = ['en', 'fr', 'es'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const LOCALE_STORAGE_KEY = 'hw-tutora-locale';

@Injectable({ providedIn: 'root' })
export class LocaleSwitchService {
  private readonly localeId = inject(LOCALE_ID);

  readonly activeLocale: SupportedLocale = this.normalize(this.localeId);

  switchTo(locale: SupportedLocale): void {
    if (locale === this.activeLocale) return;
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);

    const segments = window.location.pathname.split('/').filter(Boolean);
    if ((SUPPORTED_LOCALES as readonly string[]).includes(segments[0])) {
      segments.shift();
    }
    const rest = segments.join('/');
    const target = `/${locale}${rest ? '/' + rest : '/'}`;
    window.location.href = `${target}${window.location.search}${window.location.hash}`;
  }

  private normalize(id: string): SupportedLocale {
    const base = id.split('-')[0].toLowerCase();
    return (SUPPORTED_LOCALES as readonly string[]).includes(base) ? (base as SupportedLocale) : 'en';
  }
}

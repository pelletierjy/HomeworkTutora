import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

const THEME_KEY = 'hw-tutora-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _themeMode = signal<ThemeMode>(this.readStoredPreference());
  readonly themeMode = this._themeMode.asReadonly();

  readonly isDark = signal(this.computeIsDark());

  constructor() {
    // React to theme changes and apply to DOM
    effect(() => {
      const mode = this._themeMode();
      const dark = this.computeIsDark();
      this.isDark.set(dark);

      const html = document.documentElement;
      if (dark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    });
  }

  toggleTheme(): void {
    const current = this._themeMode();
    const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  setTheme(mode: ThemeMode): void {
    this._themeMode.set(mode);
    localStorage.setItem(THEME_KEY, mode);
  }

  private computeIsDark(): boolean {
    const mode = this._themeMode();
    if (mode === 'dark') return true;
    if (mode === 'light') return false;
    // 'system' — defer to OS preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private readStoredPreference(): ThemeMode {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light') return 'light';
    if (stored === 'dark') return 'dark';
    return 'system';
  }
}

import { computed, effect, inject } from '@angular/core';
import { signalStore, withState, withComputed, withHooks } from '@ngrx/signals';
import { Dispatcher, withReducer, on } from '@ngrx/signals/events';
import { themeEvents } from './theme.events';
import type { ThemeMode } from './theme.types';

const THEME_KEY = 'hw-tutora-theme';

function readStoredPreference(): ThemeMode {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light') return 'light';
  if (stored === 'dark') return 'dark';
  return 'system';
}

interface ThemeState {
  mode: ThemeMode;
  systemPrefersDark: boolean;
}

const initialState: ThemeState = {
  mode: readStoredPreference(),
  systemPrefersDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
};

export const ThemeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ mode, systemPrefersDark }) => ({
    isDark: computed(() => {
      const m = mode();
      if (m === 'dark') return true;
      if (m === 'light') return false;
      return systemPrefersDark();
    }),
  })),
  withReducer(
    on(themeEvents.toggled, (_event, state) => ({
      mode: (state.mode === 'dark' ? 'light' : 'dark') as ThemeMode,
    })),
    on(themeEvents.modeChanged, (event) => ({ mode: event.payload })),
    on(themeEvents.systemPreferenceChanged, (event) => ({
      systemPrefersDark: event.payload,
    })),
  ),
  withHooks((store) => {
    let mediaQuery: MediaQueryList | undefined;
    let handleChange: ((e: MediaQueryListEvent) => void) | undefined;

    return {
      onInit() {
        effect(() => {
          localStorage.setItem(THEME_KEY, store.mode());
          document.documentElement.classList.toggle('dark', store.isDark());
        });

        const dispatcher = inject(Dispatcher);
        mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        handleChange = (e) => dispatcher.dispatch(themeEvents.systemPreferenceChanged(e.matches));
        mediaQuery.addEventListener('change', handleChange);
      },
      onDestroy() {
        if (mediaQuery && handleChange) {
          mediaQuery.removeEventListener('change', handleChange);
        }
      },
    };
  }),
);

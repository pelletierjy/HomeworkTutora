import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import type { ThemeMode } from './theme.types';

export const themeEvents = eventGroup({
  source: 'Theme',
  events: {
    toggled: type<void>(),
    modeChanged: type<ThemeMode>(),
    systemPreferenceChanged: type<boolean>(),
  },
});

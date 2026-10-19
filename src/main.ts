import { bootstrapApplication } from '@angular/platform-browser';
import { inject } from '@vercel/analytics';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Vercel Web Analytics. `inject()` loads /_vercel/insights/script.js in production
// (Vercel serves it when Web Analytics is enabled) or the debug script under `ng serve`.
inject();

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

# Homework Tutora

An Angular-based AI tutor helper application that provides on-demand homework assistance for students.

Built with **Angular 21** (standalone components, signals), **Tailwind CSS v4**, and a modern clean
architecture designed for future growth.

## Features

- **AI Chat Tutor** — Full-screen ConversiaCore widget (`<conversia-app>`) providing real-time, RAG-powered homework assistance
- **Light / Dark theme** — System-aware toggle with preference persistence
- **Clean landing page** — Simple intro with a hero and a button to open the AI Tutor

## Tech Stack

| Layer        | Technology          |
|--------------|---------------------|
| Framework    | Angular 21 (standalone, signals) |
| Styling      | Tailwind CSS v4 + custom OKLCH palette |
| Build        | Angular CLI (esbuild) |
| Testing      | Vitest + Angular testing |
| Package mgr  | npm 11              |

## Project Structure

```
src/app/
├── core/
│   └── services/
│       └── theme.service.ts        # Theme state (light/dark/system, localStorage)
├── features/
│   ├── home/
│   │   └── home.ts                 # Landing page — hero + intro
│   └── ai-tutor/
│       └── ai-tutor.ts             # Full-screen ConversiaCore chat widget
├── shared/
│   └── components/
│       ├── header/                 # Sticky header with nav + theme toggle
│       ├── theme-toggle/           # Sun/moon toggle button
│       └── chat-widget/            # Embeds ConversiaCore's <conversia-app> widget
├── app.ts            # Root component (router outlet)
├── app.config.ts     # DI / providers
├── app.routes.ts     # Route definitions
└── app.html          # Router outlet
```

## Routes

| Path       | Component      | Description                              |
|------------|----------------|------------------------------------------|
| `/`        | Home           | Landing page with hero and intro         |
| `/ai-tutor`| AI Tutor       | Full-screen chat bot (ConversiaCore)     |

## Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. Hot-reload is enabled.

## Building

```bash
ng build
```

Outputs to `dist/HomeworkTutora/`.

## Testing

```bash
ng test
```

## Theme Notes

- Dark mode uses the `class` strategy (CSS `dark` class on `<html>`)
- Theme preference is persisted in `localStorage` (`hw-tutora-theme`)
- CSS custom properties (`--color-bg`, `--color-text`, etc.) drive all theme colors
- `ThemeService` exposes an `isDark` signal for reactive consumption

## ConversiaCore Integration

The AI Tutor page loads the external chat bot via dynamic script injection:

```js
const script = document.createElement('script');
script.src = 'https://pelletierjy.github.io/ConversiaCore/conversia-core-widget.js';
document.head.appendChild(script);
```

The `<conversia-app>` web component receives:
- `context="HomeworkTutora"` — identifies this app instance
- `theme="light" | "dark"` — reactive theme prop
- `lang="en"` — language

## Next Steps

- Add `subject` and `grade-level` attributes to `<conversia-app>` to skip its built-in picker
- In ConversiaCore's admin panel (`/admin` → Host Apps), configure an `appConfig/HomeworkTutora` document with this app's system prompt and guardrails

# Homework Tutora

An Angular-based AI tutor helper application that provides on-demand homework assistance for students.

Built with **Angular 21** (standalone components, signals), **Tailwind CSS v4**, and a modern clean
architecture designed for future growth.

## Features

- **AI Chat Tutor** — Widget that embeds [ConversiaCore](https://github.com/pelletierjy/need-home-work) (`<conversia-app>`) for real-time, RAG-powered homework assistance
- **Light / Dark theme** — System-aware toggle with preference persistence
- **Subjects & Grades** — Planned sections for subject browsing and grade-level filtering
- **Knowledge Base** — Planned searchable library of solved problems and study guides

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
│   │   └── home.ts                 # Landing page — hero, chat widget, feature cards
│   └── placeholder/
│       └── placeholder.ts          # Reusable "coming soon" page
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

## Next Steps

- Implement Subjects and Knowledge Base features
- Add grade-level filtering and subject-specific routing, then pass `subject`/`grade-level` attributes to `<conversia-app>` to skip its built-in picker
- In ConversiaCore's admin panel (`/admin` → Host Apps), configure an `appConfig/HomeworkTutora` document with this app's system prompt and guardrails

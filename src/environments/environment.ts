export const environment = {
  production: true,
  conversiaCore: {
    scriptUrl: 'https://pelletierjy.github.io/ConversiaCore/conversia-core-widget.js',
    context: 'HomeworkTutora',
    // Operator-issued embedding credential (ConversiaCore feature 002-secure-embed-telemetry).
    // NEVER committed: values are injected at build time by scripts/inject-conversia-env.mjs
    // from the CONVERSIA_REMOTE_ID / CONVERSIA_CLIENT_KEY env vars (set them in Vercel →
    // Settings → Environment Variables, Production scope). Empty -> the widget degrades
    // with its friendly "not configured" message.
    remoteId: 'homeworktutora',
    clientKey: '',
  },
};

export const environment = {
  production: false,
  conversiaCore: {
    scriptUrl: 'https://pelletierjy.github.io/ConversiaCore/conversia-core-widget.js',
    context: 'HomeworkTutora',
    // Dev credential (ConversiaCore feature 002-secure-embed-telemetry): never committed.
    // For local testing, export CONVERSIA_REMOTE_ID / CONVERSIA_CLIENT_KEY and run
    // `node scripts/inject-conversia-env.mjs` before `ng build`, or paste values here
    // locally (keep them out of commits). Empty -> friendly "not configured" message.
    remoteId: 'homeworktutora',
    clientKey: '',
  },
};

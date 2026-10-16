export const environment = {
  production: true,
  conversiaCore: {
    scriptUrl: 'https://pelletierjy.github.io/ConversiaCore/conversia-core-widget.js',
    context: 'HomeworkTutora',
    // Operator-issued embedding credential (ConversiaCore feature 002-secure-embed-telemetry).
    // Issue once: node tools/conversia-admin/index.js client add --remote-id homeworktutora
    // Keep EMPTY until issued: the widget degrades with a friendly "not configured" message.
    // Must be filled BEFORE deploying a ConversiaCore worker that enforces the credential
    // gate (see ConversiaCore specs/002-secure-embed-telemetry/release-notes.md).
    // (Filled 2026-10-16 — rotate with: node tools/conversia-admin/index.js client rotate --remote-id homeworktutora)
    remoteId: 'homeworktutora',
    clientKey: 'cvk_homeworktutora_Pcg1b3wnNP1RHyLxcWnuw4qdM9SAUybWSjpFAqR3-8w',
  },
};

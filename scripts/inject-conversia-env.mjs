// Build-time injection of the ConversiaCore embedding credential
// (ConversiaCore feature 002-secure-embed-telemetry).
//
// The values come ONLY from the build environment (Vercel env vars / CI secrets) —
// never from the repository:
//   CONVERSIA_REMOTE_ID   = homeworktutora
//   CONVERSIA_CLIENT_KEY  = cvk_homeworktutora_...
// vercel.json runs this script before `npm run build:i18n`, patching the production
// environment file in the ephemeral build checkout; `ng build` then inlines it.
//
// Without the variables the file is left untouched (clientKey stays '' and the widget
// degrades to its friendly "not configured" message — safe default).
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'src/environments/environment.ts';
const remoteId = process.env.CONVERSIA_REMOTE_ID ?? '';
const clientKey = process.env.CONVERSIA_CLIENT_KEY ?? '';

if (!remoteId && !clientKey) {
  console.log('inject-conversia-env: CONVERSIA_REMOTE_ID / CONVERSIA_CLIENT_KEY unset — environment.ts untouched');
  process.exit(0);
}

const source = readFileSync(FILE, 'utf8');
const hasFields = /remoteId:\s*'/.test(source) && /clientKey:\s*'/.test(source);
if (!hasFields) {
  console.error(`inject-conversia-env: remoteId/clientKey fields not found in ${FILE}`);
  process.exit(1);
}

const patched = source
  .replace(/(remoteId:\s*')[^']*(')/, `$1${remoteId}$2`)
  .replace(/(clientKey:\s*')[^']*(')/, `$1${clientKey}$2`);

writeFileSync(FILE, patched);
console.log(`inject-conversia-env: injected remoteId="${remoteId}" (key set: ${Boolean(clientKey)})`);

import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const dest = 'dist/HomeworkTutora/browser/index.html';
mkdirSync(dirname(dest), { recursive: true });
copyFileSync('root-redirect/index.html', dest);
console.log('Copied root redirect ->', dest);

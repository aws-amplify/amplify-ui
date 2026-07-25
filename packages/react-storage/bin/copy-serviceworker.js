#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const SW_FILENAME = 'download-sw.js';
const SW_SOURCE = path.resolve(__dirname, '..', 'dist', SW_FILENAME);

const targetDir = process.argv[2];

if (!targetDir) {
  console.error(
    'Usage: npx @aws-amplify/ui-react-storage copy-serviceworker <target-dir>\n' +
      'Example: npx @aws-amplify/ui-react-storage copy-serviceworker public'
  );
  process.exit(1);
}

if (!fs.existsSync(SW_SOURCE)) {
  console.error(
    `Error: Service worker source not found at ${SW_SOURCE}\n` +
      'Make sure the package is properly installed.'
  );
  process.exit(1);
}

const resolvedTarget = path.resolve(targetDir, 'amplify-storage-download');

// `recursive: true` is a no-op when the directory already exists, so no
// existence check is needed (and skipping it avoids a TOCTOU window).
fs.mkdirSync(resolvedTarget, { recursive: true });

const dest = path.join(resolvedTarget, SW_FILENAME);
fs.copyFileSync(SW_SOURCE, dest);
console.log(`✅ Copied ${SW_FILENAME} → ${dest}`);

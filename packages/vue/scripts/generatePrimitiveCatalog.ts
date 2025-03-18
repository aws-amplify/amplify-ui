// This is a simplified version of the React primitive catalog generator
// It creates an empty catalog file since Vue may have different component structure

import fs from 'fs';
import path from 'path';

// Empty catalog object
const catalog = {};

// Ensure the dist directory exists before writing to it
const distDir = path.resolve(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Write the catalog to a file
fs.writeFileSync(
  path.resolve(distDir, 'primitives.json'),
  JSON.stringify(catalog, null, 2),
  { flag: 'w' }
);

console.log('Primitive catalog generated successfully');

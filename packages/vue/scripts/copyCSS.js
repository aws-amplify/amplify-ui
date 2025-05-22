import fs from 'fs-extra';

// Ensure the directory exists
fs.ensureDirSync('dist');

// Copy CSS files from the UI package
fs.copySync('../ui/dist/styles.css', 'dist/style.css', { overwrite: true });

console.log('CSS files copied successfully');

import fs from 'fs-extra';

// Ensure the directory exists
fs.ensureDirSync('dist');

// Copy CSS files from the UI package
fs.copySync('../ui/dist/styles.css', 'dist/style.css', { overwrite: true });

// Copy the primitive styles to the dist directory
const primitivesStylesPath = 'src/components/primitives/styles.css';
const destDir = 'dist/components/primitives';

// Ensure the destination directory exists
fs.ensureDirSync(destDir);

// Copy the CSS file
fs.copyFileSync(primitivesStylesPath, `${destDir}/styles.css`);

console.log('CSS files copied successfully');

import fs from 'fs-extra';

fs.ensureDirSync('dist/styles');
fs.copySync('../ui/dist/styles.css', 'dist/styles.css', { overwrite: true });
fs.copySync('../ui/dist/styles.layer.css', 'dist/styles.layer.css', {
  overwrite: true,
});
fs.copySync('../ui/dist/styles', 'dist/styles', { overwrite: true });

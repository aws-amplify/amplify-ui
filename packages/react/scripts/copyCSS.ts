import fs from 'fs-extra';

fs.ensureDirSync('dist/styles');
fs.copySync('../ui/dist/styles', 'dist/styles', { overwrite: true });

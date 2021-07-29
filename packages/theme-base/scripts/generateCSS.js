const sass = require('sass');
const fs = require('fs-extra');

const result = sass.renderSync({ file: `src/css/theme.scss` });
fs.writeFileSync(`dist/theme.css`, result.css);

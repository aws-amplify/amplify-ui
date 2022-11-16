import sass from 'sass';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import fs from 'fs-extra';
import { createTheme } from '../src/theme';

const CSS_VARIABLE_SCOPE = ':root, [data-amplify-theme]';

fs.ensureDirSync('dist/');
fs.writeFileSync(
  'dist/theme.css',
  // Note: replacing the default selector with the global variable scope
  // to be in line with what Style Dictionary was building previously
  createTheme().cssText.replace(
    '[data-amplify-theme="default-theme"]',
    CSS_VARIABLE_SCOPE
  )
);

const result = sass.renderSync({ file: `src/theme/css/styles.scss` });
postcss([autoprefixer])
  .process(result.css, { from: undefined })
  .then((result) => {
    result.warnings().forEach((warn) => {
      console.warn(warn.toString());
    });
    fs.writeFileSync(`dist/styles.css`, result.css);
  });

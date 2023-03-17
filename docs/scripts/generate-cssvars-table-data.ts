import { createTheme } from '@aws-amplify/ui';
import fs from 'fs';
import path from 'path';

const theme = createTheme();

/**
 * Theme css text sample:
 * [data-amplify-theme="default-theme"] {
        --amplify-components-alert-align-items: center;
        --amplify-components-alert-justify-content: space-between;
        --amplify-components-alert-color: var(--amplify-colors-font-primary);
 * 
 */
// regex to match each variable and its value in the theme css: text starting with -- and ending with ;
const cssVars = theme.cssText.match(/--[^;]*;/g).map((line) => {
  const [variable, value] = line.split(':');
  return {
    variable,
    value: value.trim().replace(';', ''),
  };
});

const sortedCssVars = cssVars.sort((a, b) =>
  a.variable.localeCompare(b.variable)
);

fs.writeFileSync(
  path.join(__dirname, '../../docs/src/data/', `./cssvars-table.json`),
  JSON.stringify(sortedCssVars, null, 4)
);

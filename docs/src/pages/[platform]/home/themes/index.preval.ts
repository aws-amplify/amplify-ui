import preval from 'next-plugin-preval';
import fs from 'fs';
import { Theme, createTheme } from '@aws-amplify/ui-react';
import flattenProperties from 'style-dictionary/lib/utils/flattenProperties';
import { isPlainObject } from 'lodash';
import terminalTheme from './terminalTheme';
import classicTheme from './classicTheme';
import defaultTheme from './defaultTheme';
import synthwaveTheme from './synthwaveTheme';

const terminalStr = fs.readFileSync(__dirname + '/terminalTheme.ts', {
  encoding: 'utf-8',
});
const classicStr = fs.readFileSync(__dirname + '/classicTheme.ts', {
  encoding: 'utf-8',
});
const defaultStr = fs.readFileSync(__dirname + '/defaultTheme.ts', {
  encoding: 'utf-8',
});
const synthwaveStr = fs.readFileSync(__dirname + '/synthwaveTheme.ts', {
  encoding: 'utf-8',
});

const themeCSSVars = (originalTheme, createdTheme, toRet = []) => {
  for (const name in originalTheme) {
    if (isPlainObject(originalTheme[name]) && 'value' in originalTheme[name]) {
      toRet.push(createdTheme[name]);
    } else if (isPlainObject(originalTheme[name])) {
      themeCSSVars(originalTheme[name], createdTheme[name], toRet);
    }
  }
  return toRet;
};

const themeToCSS = (theme: Theme) => {
  const createdTheme = createTheme(theme);

  const cssVars = themeCSSVars(theme.tokens, createdTheme.tokens);
  const selector = `:root, [data-amplify-theme]`;
  let cssText =
    `${selector} {\n` +
    cssVars.map((token) => `${token.name}: ${token.value};`).join('\n') +
    `\n}\n`;
  createdTheme.overrides.forEach((override) => {
    const customProperties = flattenProperties(override.tokens)
      .map((token) => `${token.name}: ${token.value};`)
      .join('\n');
    // Overrides can have a selector, media query, breakpoint, or color mode
    // for creating the selector
    if ('selector' in override) {
      cssText += `\n${override.selector} {\n${customProperties}\n}\n`;
    }
    if ('mediaQuery' in override) {
      cssText += `\n@media (${override.mediaQuery}) {
  ${selector} {
    ${customProperties}
  }
  }\n`;
    }
    if ('breakpoint' in override) {
      const breakpoint = createdTheme.breakpoints.values[override.breakpoint];
      cssText += `\n@media (min-width: ${breakpoint}px) {
  ${selector} {
    ${customProperties}
  }
  }\n`;
    }
    if ('colorMode' in override) {
      cssText += `\n@media (prefers-color-scheme: ${override.colorMode}) {
        ${selector}, [data-amplify-color-mode="system"] {\n${customProperties}\n}
      }\n`;
      cssText += `\n[data-amplify-color-mode="${override.colorMode}"] {\n${customProperties}\n}\n`;
    }
  });
  return cssText;
};

export default preval({
  terminal: {
    string: terminalStr,
    code: terminalTheme,
    css: themeToCSS(terminalTheme),
  },
  synthwave: {
    string: synthwaveStr,
    code: synthwaveTheme,
    css: themeToCSS(synthwaveTheme as Theme),
  },
  classic: {
    string: classicStr,
    code: classicTheme,
    css: themeToCSS(classicTheme),
  },
  default: {
    string: defaultStr,
    code: defaultTheme,
    css: `/* No code needed to get the default! */`,
  },
});

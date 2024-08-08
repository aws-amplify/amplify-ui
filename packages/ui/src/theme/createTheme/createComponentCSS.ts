import { DefaultTheme, WebTheme } from '../types';
import { propsToString } from './utils';
import { ComponentsTheme } from '../components';
import { isFunction, splitObject } from '../../utils';
import { BaseTheme } from '../components/utils';

function addVars(selector: string, vars: Record<string, unknown>) {
  if (!vars) return '';

  return `${selector} { ${Object.entries(vars)
    .map(([key, value]) => {
      return `--${key}:${value}; `;
    })
    .join(' ')}}\n`;
}

function recursiveComponentCSS(baseSelector: string, theme: BaseTheme) {
  let str = '';
  const { _modifiers = {}, _element = {}, _vars, ...props } = theme;

  // if there are no props, skip
  if (Object.keys(props).length) {
    // separate psuedo/attribute selectors
    const [selectors, other] = splitObject(
      props,
      (key) => key.startsWith(':') || key.startsWith('[')
    );

    Object.entries(selectors).forEach(([selector, value]) => {
      // need to remove nested things like vars and elements
      const {
        _modifiers = {},
        _element = {},
        _vars,
        ...props
      } = value as BaseTheme;
      str += `${baseSelector}${selector} { ${propsToString(props)} }\n`;
      str += addVars(`${baseSelector}${selector}`, _vars);
    });

    str += `${baseSelector} { ${propsToString(other)} }\n`;
  }

  str += addVars(baseSelector, _vars);

  Object.entries(_modifiers).forEach(([key, value]) => {
    if (value && Object.keys(value).length) {
      str += recursiveComponentCSS(`${baseSelector}--${key}`, value);
    }
  });

  Object.entries(_element).forEach(([key, value]) => {
    if (value && Object.keys(value).length) {
      str += recursiveComponentCSS(`${baseSelector}__${key}`, value);
    }
  });

  return str;
}

/**
 * This will take a component theme and create the appropriate CSS for it.
 *
 */
export function createComponentCSS(
  themeName: string,
  components: Array<ComponentsTheme>,
  tokens: WebTheme['tokens'],
  breakpoints: DefaultTheme['breakpoints']
) {
  let cssText = '';

  components.forEach(({ name, theme, overrides }) => {
    const baseComponentClassName = `amplify-${name}`;
    const componentClassName = `[data-amplify-theme="${themeName}"] .${baseComponentClassName}`;
    // unwrap the component theme
    // if it is a function: call it with the defaultTheme to get a static object
    const componentTheme: BaseTheme = isFunction(theme)
      ? (theme(tokens) as BaseTheme)
      : theme;

    cssText += recursiveComponentCSS(componentClassName, componentTheme);

    // if the component theme has overrides
    // generate the appropriate CSS for each of them
    if (overrides) {
      overrides.forEach((override) => {
        // unwrap the override component theme just like above
        const componentTheme: BaseTheme = isFunction(override.theme)
          ? (override.theme(tokens) as BaseTheme)
          : override.theme;

        if ('mediaQuery' in override) {
          cssText += `@media (${
            override.mediaQuery
          }) {\n ${recursiveComponentCSS(
            componentClassName,
            componentTheme
          )} \n}`;
        }
        if ('breakpoint' in override) {
          const breakpoint = breakpoints.values[override.breakpoint];
          cssText += `\n@media (min-width: ${breakpoint}px) {\n ${recursiveComponentCSS(
            componentClassName,
            componentTheme
          )} \n}`;
        }
        if ('selector' in override) {
          cssText += recursiveComponentCSS(
            `${override.selector} .${baseComponentClassName}`,
            componentTheme
          );
        }
        if ('colorMode' in override) {
          cssText += `\n@media (prefers-color-scheme: ${
            override.colorMode
          }) {\n${recursiveComponentCSS(
            `[data-amplify-theme="${themeName}"][data-amplify-color-mode="system"] .${baseComponentClassName}`,
            componentTheme
          )}\n}\n`;
          cssText += recursiveComponentCSS(
            `[data-amplify-theme="${themeName}"][data-amplify-color-mode="${override.colorMode}"] .${baseComponentClassName}`,
            componentTheme
          );
        }
      });
    }
  });

  return cssText;
}

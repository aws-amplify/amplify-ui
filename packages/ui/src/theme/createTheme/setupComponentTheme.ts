import kebabCase from 'lodash/kebabCase.js';
import { DefaultTheme, WebTheme } from '../types';
import { cssValue } from './cssValue';
import { ComponentsTheme } from '../components';
import { isFunction } from '../../utils';
import { isDesignToken } from './isDesignToken';
import { BaseThemeDefinition, CSSProperties } from '../components/utils';

// we need to handle psuedo elements like ::before

/**
 * This will take an object like:
 * {paddingTop:'20px',color:'{colors.font.primary}'}
 * and turn it into a CSS string:
 * `padding-top:20px; color: var(--colors-font-primary);`
 */
function propsToString(props: CSSProperties): string {
  return Object.entries(props)
    .map(([key, value]) => {
      const _value = isDesignToken(value)
        ? value.toString()
        : // @ts-ignore
          cssValue({ value });
      return `${kebabCase(key)}:${_value}; `;
    })
    .join(' ');
}

// function to split an object in 2 by a predicate on the keys
function splitObject(
  obj: Record<string, any>,
  predicate: (key: string) => boolean
) {
  const left = {};
  const right = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (predicate(key)) {
      left[key] = value;
    } else {
      right[key] = value;
    }
  });
  return [left, right] as const;
}

function createComponentCSS(baseSelector: string, theme: BaseThemeDefinition) {
  if (!theme) return '';
  let str = '';
  const { _modifier = {}, _element = {}, vars, ...props } = theme;

  // if there are no props, skip
  if (Object.keys(props).length) {
    // separate psuedo/attribute selectors
    const [selectors, other] = splitObject(
      props,
      (key) => key.startsWith(':') || key.startsWith('[')
    );

    Object.entries(selectors).forEach(([key, value]) => {
      str += `${baseSelector}${key} { ${propsToString(value)} }\n`;
    });

    str += `${baseSelector} { ${propsToString(other)} }\n`;
  }

  if (vars) {
    Object.entries(vars).forEach(([key, value]) => {
      str += `${baseSelector} { --${key}:${value}; }\n`;
    });
  }

  Object.entries(_modifier).forEach(([key, value]) => {
    if (value && Object.keys(value).length) {
      str += createComponentCSS(`${baseSelector}--${key}`, value);
    }
  });

  Object.entries(_element).forEach(([key, value]) => {
    if (value && Object.keys(value).length) {
      str += createComponentCSS(`${baseSelector}__${key}`, value);
    }
  });

  return str;
}

export function setupComponentTheme(
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
    const componentTheme: BaseThemeDefinition = isFunction(theme)
      ? (theme(tokens) as BaseThemeDefinition)
      : theme;

    cssText += createComponentCSS(componentClassName, componentTheme);

    // if the component theme has overrides
    // generate the appropriate CSS for each of them
    if (overrides) {
      overrides.forEach((override) => {
        // unwrap the override component theme just like above
        const componentTheme: BaseThemeDefinition = isFunction(override.theme)
          ? (override.theme(tokens) as BaseThemeDefinition)
          : override.theme;

        if ('mediaQuery' in override) {
          cssText += `@media (${override.mediaQuery}) {\n ${createComponentCSS(
            componentClassName,
            componentTheme
          )} \n}`;
        }
        if ('breakpoint' in override) {
          const breakpoint = breakpoints.values[override.breakpoint];
          cssText += `\n@media (min-width: ${breakpoint}px) {\n ${createComponentCSS(
            componentClassName,
            componentTheme
          )} \n}`;
        }
        if ('selector' in override) {
          cssText += createComponentCSS(
            `${override.selector} .${baseComponentClassName}`,
            componentTheme
          );
        }
        if ('colorMode' in override) {
          cssText += `
@media (prefers-color-scheme: ${override.colorMode}) {
  ${createComponentCSS(
    `[data-amplify-theme="${themeName}"][data-amplify-color-mode="system"] .${baseComponentClassName}`,
    componentTheme
  )}
}
`;
          cssText += createComponentCSS(
            `[data-amplify-theme="${themeName}"][data-amplify-color-mode="${override.colorMode}"] .${baseComponentClassName}`,
            componentTheme
          );
        }
      });
    }
  });

  return cssText;
}

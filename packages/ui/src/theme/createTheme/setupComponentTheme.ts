import kebabCase from 'lodash/kebabCase.js';
import { DefaultTheme } from '../types';
import { cssValue } from './cssValue';
import { BaseComponentTheme, ComponentsTheme } from '../components';
import { isFunction } from '../../utils';
import { isDesignToken } from './isDesignToken';
import { CSSProperties } from '../components/utils';

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

function createComponentCSS(baseSelector: string, theme: BaseComponentTheme) {
  if (!theme) return '';
  let str = '';
  const { modifier = {}, element = {}, vars, ...props } = theme;

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

  Object.entries(modifier).forEach(([key, value]) => {
    if (value && Object.keys(value).length) {
      str += createComponentCSS(`${baseSelector}--${key}`, value);
    }
  });

  Object.entries(element).forEach(([key, value]) => {
    if (value && Object.keys(value).length) {
      str += createComponentCSS(`${baseSelector}__${key}`, value);
    }
  });

  return str;
}

export function setupComponentTheme(
  str: string,
  components: ComponentsTheme,
  tokens: DefaultTheme['tokens']
) {
  let cssText = '';

  Object.entries(components).forEach(([key, component]) => {
    const baseComponentClassName = `amplify-${key}`;
    const componentClassName = `${str} .${baseComponentClassName}`;
    // unwrap the component theme
    // if it is a function: call it with the defaultTheme to get a static object
    const componentTheme: BaseComponentTheme = isFunction(component)
      ? (component(tokens) as BaseComponentTheme)
      : component;

    cssText += createComponentCSS(componentClassName, componentTheme);
  });

  return cssText;
}

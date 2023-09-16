import kebabCase from 'lodash/kebabCase.js';
import { DefaultTheme } from '../types';
import { cssValue } from './cssValue';
import { BaseComponentTheme, ComponentsTheme } from '../components';
import { isFunction } from '../../utils';
import { isDesignToken } from './isDesignToken';
import { CSSProperties } from '../components/utils';

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

export function setupComponentTheme(
  str: string,
  components: ComponentsTheme,
  tokens: DefaultTheme['tokens']
): {
  css: string;
  className: Record<
    string,
    (props: { modifier?: string; element?: string }) => string
  >;
} {
  let cssText = '';
  const className = {};
  // first we need to create the classname based on the key `.amplify-${key}`
  // we need to turn references into CSS vars
  // we need to turn prop names from camelCase into kebab-case (fontSize => font-size)
  // for modifiers (variant, size) we need to separate those out into separate classes
  // and create the classnames for those
  // for children do the same
  // and we need to handle states like :hover, :active

  Object.entries(components).forEach(([key, component]) => {
    const baseComponentClassName = `amplify-${key}`;
    const componentClassName = `${str} .${baseComponentClassName}`;
    const componentTheme: BaseComponentTheme = isFunction(component)
      ? (component(tokens) as BaseComponentTheme)
      : component;

    className[key] = ({ modifier, element }) => {
      if (element) {
        return `${baseComponentClassName}__${element}`;
      }
      if (modifier) {
        return `${baseComponentClassName}--${modifier}`;
      }
      return `${baseComponentClassName}`;
    };

    const {
      modifier = {},
      element = {},
      _hover,
      _active,
      _disabled,
      _focus,
      ...props
    } = componentTheme;

    // if there are no props, skip
    if (Object.keys(props).length) {
      cssText += `${componentClassName} { `;
      cssText += propsToString(props);
      cssText += ` }\n`;
    }

    Object.entries({ _hover, _active, _disabled, _focus }).forEach(
      ([key, value]) => {
        if (value && Object.keys(value).length) {
          cssText += `${componentClassName}:${key.replace('_', '')} { `;
          cssText += propsToString(value);
          cssText += ` }\n`;
        }
      }
    );

    Object.entries(modifier).forEach(([modifier, value]) => {
      const { _hover, _active, _disabled, _focus, ...props } = value;
      if (props && Object.keys(props).length) {
        cssText += `${componentClassName}--${modifier} { `;
        cssText += propsToString(props);
        cssText += ` }\n`;
      }

      Object.entries({ _hover, _active, _disabled, _focus }).forEach(
        ([state, props]) => {
          if (props && Object.keys(props).length) {
            cssText += `${componentClassName}--${modifier}:${state.replace(
              '_',
              ''
            )} { `;
            cssText += propsToString(props);
            cssText += ` }\n`;
          }
        }
      );
    });

    Object.entries(element).forEach(([key, value]) => {
      if (value && Object.keys(value).length) {
        cssText += `${componentClassName}__${key} { `;
        cssText += propsToString(value);
        cssText += ` }\n`;
      }
    });
  });

  return {
    css: cssText,
    className,
  };
}

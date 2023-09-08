import { DefaultTheme } from '../types';
import { BaseComponentTheme } from '../components';

export function createComponentTheme<
  ComponentTheme extends BaseComponentTheme = BaseComponentTheme
>(
  name: string,
  theme: (tokens: DefaultTheme['tokens']) => ComponentTheme
): {
  className: (props?: { modifier?: string; element?: string }) => string;
  theme: (tokens: DefaultTheme['tokens']) => BaseComponentTheme;
} {
  const baseComponentClassName = `amplify-${name}`;
  return {
    className: (props) => {
      if (props) {
        const { modifier, element } = props;
        if (element) {
          return `${baseComponentClassName}__${element}`;
        }
        if (modifier) {
          return `${baseComponentClassName}--${modifier}`;
        }
      }
      return `${baseComponentClassName}`;
    },
    theme,
  };
}

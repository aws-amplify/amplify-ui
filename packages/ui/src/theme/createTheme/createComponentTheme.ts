import { ComponentsTheme } from '../components';
import { createComponentClasses } from './createComponentClasses';

type ClassNameProp = undefined | (string | undefined)[];

export function createComponentTheme({
  name = '',
  theme,
  overrides,
}: ComponentsTheme): {
  className: (props?: {
    modifier?: ClassNameProp;
    element?: ClassNameProp;
  }) => string;
  theme: typeof theme;
  name: string;
  overrides?: typeof overrides;
} {
  const prefix = 'amplify-';
  const className = createComponentClasses({ name, prefix });
  return {
    className,
    theme,
    overrides,
    name,
  };
}

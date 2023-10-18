import { BaseComponentTheme, ComponentTheme } from '../components';
import { createComponentClasses } from './createComponentClasses';

type CreactComponentThemeProps<ThemeType> = {
  name?: string;
  prefix?: string;
  theme: ThemeType;
};

export function createComponentTheme<
  ThemeType extends ComponentTheme<BaseComponentTheme> = ComponentTheme<BaseComponentTheme>
>({
  name = '',
  prefix = 'amplify-',
  theme,
}: CreactComponentThemeProps<ThemeType>): {
  className: (props?: { modifier?: string[]; element?: string[] }) => string;
  theme: ThemeType;
} {
  const className = createComponentClasses({ name, prefix });
  return {
    className,
    theme,
  };
}

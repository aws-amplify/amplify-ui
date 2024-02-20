import type { ColorTheme, IsDisabled, Size } from './modifiers';
import { createComponentTheme } from './createComponentTheme';
import type { DefineThemeDefinition } from './defineThemeDefinition';

// NOTE THAT SHOULD BE DELETED: should be exported and consumed in `ButtonProps`
export type ButtonSize = Size;
export type ButtonVariation =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'warning'
  | 'menu'
  | 'link';

interface ButtonModifiers {
  colorTheme?: ColorTheme;
  isDisabled?: IsDisabled;
  size?: ButtonSize;
  variation?: ButtonVariation;
}

interface ButtonThemeDefinition
  extends DefineThemeDefinition<ButtonModifiers> {}

// example code
export const buttonThemeDefinition: ButtonThemeDefinition = {
  _modifiers: {
    size: { large: { alignContent: 'stretch' } },
    isDisabled: { opacity: 'initial' },
  },
};

// example code
const darkModeOverride: ButtonThemeDefinition = {
  _modifiers: { colorTheme: {}, isDisabled: {} },
};

// example code
const buttonTheme = createComponentTheme<ButtonThemeDefinition>({
  name: 'button',
  theme: (tokens) => ({}),
  overrides: { theme: darkModeOverride },
});

// example code
buttonTheme.classname({ modifiers: { colorTheme: 'error', isDisabled: true } });

import type * as CSS from 'csstype';
import { DefaultTheme, DesignToken } from '../types';

export type Variations = 'info' | 'warning' | 'success' | 'error';

export type Sizes = 'small' | 'large';

export type States = '_disabled' | '_hover' | '_active' | '_focus';

export type CSSProperties = {
  [key in keyof CSS.Properties]: DesignToken | string;
};

export type WithStates = {
  [key in States]?: CSS.Properties;
};

export type ComponentTheme<ThemeType extends CSSProperties = CSSProperties> =
  | ThemeType
  | ((tokens: DefaultTheme['tokens']) => ThemeType);

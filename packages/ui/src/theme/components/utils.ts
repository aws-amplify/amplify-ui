import type * as CSS from 'csstype';
import { DefaultTheme, DesignToken } from '../types';

export type ColorThemes = 'info' | 'warning' | 'success' | 'error' | 'overlay';

export type Sizes = 'small' | 'large';

export type States = '_disabled' | '_hover' | '_active' | '_focus';

export type CSSProperties = {
  [key in keyof CSS.Properties]: DesignToken | string;
};

export type WithStates = {
  [key in States]?: CSSProperties;
};

type BaseTheme = CSSProperties & {
  [key in States]?: CSSProperties;
};

export type ComponentTheme<ThemeType extends BaseTheme = BaseTheme> =
  | ThemeType
  | ((tokens: DefaultTheme['tokens']) => ThemeType);

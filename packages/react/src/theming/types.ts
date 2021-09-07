import { defaultTheme, defaultTokens } from './defaultTheming';

export type DeepPartial<T> = {
  [K in keyof T]?: DeepPartial<T[K]>;
};

export type Theme = typeof defaultTheme;
export type Tokens = typeof defaultTokens;

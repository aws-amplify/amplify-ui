import type { Breakpoints } from '../breakpoints';
import type { WebTokens } from '../tokens';

import type { ClassNameCallback } from './classname';
import { DefineThemeDefinition } from './defineThemeDefinition';

type ThemeCallback<T> = T | (<K extends WebTokens>(tokens: K) => T);
interface ComponentThemeOverride<T> {
  theme: T;
  colorMode?: 'light' | 'dark';
  breakpoint?: keyof Breakpoints['values'];
  mediaQuery?: string;
  selector?: string;
}

export const createComponentTheme = null as CreateComponentTheme;

interface CreateComponentThemeParams<
  T extends DefineThemeDefinition<unknown>,
  TCallback = ThemeCallback<T>,
> {
  name: string;
  prefix?: string;
  overrides?: ComponentThemeOverride<TCallback>;
  theme: TCallback;
}

export type CreateComponentTheme = <T>(
  params: CreateComponentThemeParams<T>
  // NOTE THAT SHOULD BE DELETED: return is potentially missing items
) => { classname: ClassNameCallback<T> };

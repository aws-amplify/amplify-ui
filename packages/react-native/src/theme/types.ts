import { PartialDeep } from 'type-fest';
import { ReactNativeTokens } from '@aws-amplify/ui';

import { ViewStyle } from 'react-native';

export interface Components {
  label?: { container: ViewStyle };
  // TODO: add components
}

type ColorMode = 'light' | 'dark' | 'system';
type Override = Omit<StrictTheme, 'overrides'>;

// re-name and export to align naming with BaseTheme
export type BaseTokens = ReactNativeTokens;

// BaseTokens but everything optional for custom themes
type Tokens = PartialDeep<BaseTokens>;

/**
 * A Theme just needs a name, all other properties are optional.
 */
export interface Theme {
  colorMode?: ColorMode;
  components?: Components;
  /**
   * The name of the theme.
   */
  name: string;
  /**
   * Component and component agnostic tokens.
   */
  tokens?: Tokens;
  /**
   * Overrides allows switching between design tokens in different contexts,
   * like light and dark mode.
   */
  overrides?: Override[];
}

/**
 * Base theme values including shared tokens from
 */
export interface BaseTheme extends Theme {
  colorMode: ColorMode;
  tokens: BaseTokens;
}

export const theme: Theme = {
  name: 'name!',
  components: { label: { container: { backgroundColor: 'red' } } },
  tokens: {
    colors: { red: { 10: 'red' } },
  },
};

/**
 * Fully built theme that has styling based
 * on the design tokens and all design tokens have added fields
 * to be used in Javascript/Typescript.
 */
export interface StrictTheme extends Theme {
  colorMode: ColorMode;
  tokens: BaseTokens;
}

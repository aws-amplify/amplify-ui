import { ViewStyle } from 'react-native';
import { ReactNativeTokens } from '@aws-amplify/ui';

// TODO: delete this example and update unit test
type BottomSheetStyle = { container: ViewStyle };
export interface Components {
  // TODO: add components
  bottomSheet: BottomSheetStyle;
}

export type ColorMode = 'light' | 'dark' | 'system';
type Override = Omit<Theme, 'overrides'> & {
  colorMode?: ColorMode;
};

// re-name and export to align naming with `StrictTheme`
export type StrictTokens = ReactNativeTokens<'required'>;

// `StrictTokens` but everything optional for custom themes
export type Tokens = ReactNativeTokens<'optional'>;

/**
 * A Theme just needs a name, all other properties are optional.
 */
export interface Theme {
  // colorMode?: ColorMode;
  /**
   * Custom component styles
   */
  components?: Components;
  /**
   * The name of the theme.
   */
  // name: string;
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

export interface DefaultTheme {
  tokens: ReactNativeTokens<'default'>;
  overrides?: Override[];
}

/**
 * Fully built theme that has styling based
 * on the design tokens and all design tokens have added fields
 * to be used in Javascript/Typescript.
 *
 * `components` remains an optional property, it is only populated
 * via custom themes.
 */
export interface StrictTheme {
  tokens: StrictTokens;
  components?: Components;
  overrides?: Override[];
}

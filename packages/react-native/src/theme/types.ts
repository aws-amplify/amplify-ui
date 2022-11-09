import { PartialDeep } from 'type-fest';
import { ReactNativeTokens } from '@aws-amplify/ui/src/theme/tokens';
import baseTokens from '@aws-amplify/ui/dist/react-native/tokens';

import {
  ButtonStyles,
  HeadingStyles,
  LabelStyles,
  RadioStyles,
} from '../primitives';

export interface Tokens extends ReactNativeTokens {
  components?: ComponentStyles;
}

type Override = Omit<StrictTheme, 'overrides'>;

export type ColorMode = 'light' | 'dark' | 'system';

/**
 * A Theme just needs a name.
 * Users can define any tokens they need, but they don't need a complete theme with all tokens.
 */
export interface Theme {
  colorMode?: ColorMode;
  /**
   * The name of the theme.
   */
  name: string;
  /**
   * Component and component agnostic tokens.
   */
  tokens?: PartialDeep<Tokens>;
  /**
   * Overrides allow you to change design tokens in different contexts, like
   * light and dark mode.
   */
  overrides?: Override[];
}

export interface ComponentStyles {
  // TODO: add components
  button: ButtonStyles;
  heading: HeadingStyles;
  label: LabelStyles;
  radio: RadioStyles;
}

/**
 * Fully built theme that has styling based
 * on the design tokens and all design tokens have added fields
 * to be used in Javascript/Typescript.
 */
export interface StrictTheme extends Theme {
  colorMode: ColorMode;
  tokens: Tokens;
}

export const tokens: ReactNativeTokens = {
  ...baseTokens,
};

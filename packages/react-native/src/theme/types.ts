import { Colors } from '@aws-amplify/ui/dist/types/theme/tokens/colors';
import { FontSizes } from '@aws-amplify/ui/dist/types/theme/tokens/fontSizes';
import { Space } from '@aws-amplify/ui/dist/types/theme/tokens/space';
import { ButtonStyles } from '../primitives/Button';

type Override = Omit<Theme, 'overrides'>;

export interface Theme {
  /**
   * The name of the theme.
   */
  name: string;
  tokens?: Tokens;
  /**
   * Overrides allow you to change design tokens in different contexts, like
   * light and dark mode.
   */
  overrides?: Array<Override>;
}

interface BaseTokens {
  colors: Colors;
  fontSizes: FontSizes;
  space: Space;
}

export interface Tokens extends BaseTokens {
  components: ComponentStyles;
}

export interface ComponentStyles {
  button: ButtonStyles;
  // TODO: add other components
}

import { Theme } from '../../theme';
import { ButtonStyles } from './types';

export const styles = (theme: Theme): ButtonStyles => {
  return {
    text: { alignSelf: theme.tokens?.components.button.text.alignSelf },
  };
};

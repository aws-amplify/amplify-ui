import { createComponentTheme } from '../createTheme';
import { BaseProperties } from './utils';

export type TextareaFieldTheme = BaseProperties;

export const textareaFieldTheme = createComponentTheme<TextareaFieldTheme>({
  name: 'textareafield',
  theme(tokens) {
    const {
      components: { textareafield },
    } = tokens;
    return {
      _vars: {
        'amplify-components-fieldcontrol-color': textareafield.color,
        'amplify-components-fieldcontrol-border-color':
          textareafield.borderColor,
        'amplify-components-fieldcontrol-focus-border-color':
          textareafield._focus.borderColor,
      },
      flexDirection: 'column',
    };
  },
});

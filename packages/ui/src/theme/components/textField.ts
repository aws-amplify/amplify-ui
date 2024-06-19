import { createComponentTheme } from '../createTheme';
import { BaseProperties } from './utils';

export type TextFieldTheme = BaseProperties;

export const textFieldTheme = createComponentTheme<TextFieldTheme>({
  name: 'textfield',
  theme(tokens) {
    const {
      components: { textfield },
    } = tokens;
    return {
      _vars: {
        'amplify-components-fieldcontrol-color': textfield.color,
        'amplify-components-fieldcontrol-border-color': textfield.borderColor,
        'amplify-components-fieldcontrol-font-size': textfield.fontSize,
        'amplify-components-fieldcontrol-focus-border-color':
          textfield._focus.borderColor,
      },
    };
  },
});

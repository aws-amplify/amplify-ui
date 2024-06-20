import { createComponentTheme, createTheme } from '../../createTheme';
import { TextFieldTheme } from '../textField';

const textFieldTheme = createComponentTheme<TextFieldTheme>({
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

const { cssText } = createTheme({
  name: 'test',
  components: [textFieldTheme],
});

describe('@aws-amplify/ui', () => {
  describe('component themes', () => {
    describe('textField', () => {
      it('should have default values', () => {
        expect(cssText).toBeDefined();
      });
    });
  });
});

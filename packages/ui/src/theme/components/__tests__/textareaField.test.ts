import { createComponentTheme, createTheme } from '../../createTheme';
import { TextareaFieldTheme } from '../textareaField';

const textareaFieldTheme = createComponentTheme<TextareaFieldTheme>({
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

const { cssText } = createTheme({
  name: 'test',
  components: [textareaFieldTheme],
});

describe('@aws-amplify/ui', () => {
  describe('component themes', () => {
    describe('textareaField', () => {
      it('should have default values', () => {
        expect(cssText).toBeDefined();
      });
    });
  });
});

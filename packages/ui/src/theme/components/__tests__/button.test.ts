import { createComponentTheme, createTheme } from '../../createTheme';
import { ButtonTheme } from '../button';

const buttonTheme = createComponentTheme<ButtonTheme<true>>({
  name: 'button',
  theme(tokens) {
    return {
      _element: {
        'loader-wrapper': {},
      },
      _modifiers: {
        // sizes
        small: {},
        large: {},

        // variations
        primary: {},
        secondary: {},
        link: {},
        menu: {},
        destructive: {},
        warning: {},

        // states and other stuff
        disabled: {},
        loading: {},
        fullwidth: {},

        // color-theme variations
        'link--error': {},
        'link--warning': {},
        'link--info': {},
        'link--success': {},
        'link--overlay': {},

        'primary--error': {},
        'primary--warning': {},
        'primary--info': {},
        'primary--success': {},
        'primary--overlay': {},

        'outlined--error': {},
        'outlined--warning': {},
        'outlined--info': {},
        'outlined--success': {},
        'outlined--overlay': {},
      },
    };
  },
});

const { cssText } = createTheme({
  name: 'test',
  components: [buttonTheme],
});

describe('@aws-amplify/ui', () => {
  describe('component themes', () => {
    describe('button', () => {
      it('should have default values', () => {
        expect(cssText).toBeDefined();
      });
    });
  });
});

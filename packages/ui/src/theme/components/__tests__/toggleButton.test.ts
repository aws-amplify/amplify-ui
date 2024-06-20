import { createComponentTheme, createTheme } from '../../createTheme';
import { ToggleButtonTheme, ToggleButtonGroupTheme } from '../toggleButton';

const toggleButtonTheme = createComponentTheme<ToggleButtonTheme<true>>({
  name: 'togglebutton',
  theme(tokens) {
    const {
      components: { togglebutton },
    } = tokens;
    return {
      _modifiers: {
        primary: {},
        pressed: {},
        link: {},
      },
    };
  },
});

const toggleButtonGroupTheme = createComponentTheme<
  ToggleButtonGroupTheme<true>
>({
  name: 'togglebutton',
  theme(tokens) {
    const {
      components: { togglebuttongroup },
    } = tokens;
    return {
      alignItems: togglebuttongroup.alignItems,
      alignContent: togglebuttongroup.alignContent,
      justifyContent: togglebuttongroup.justifyContent,
      gap: 0,
    };
  },
});

const { cssText } = createTheme({
  name: 'test',
  components: [toggleButtonTheme, toggleButtonGroupTheme],
});

describe('@aws-amplify/ui', () => {
  describe('component themes', () => {
    describe('toggleButton', () => {
      it('should have default values', () => {
        expect(cssText).toBeDefined();
      });
    });
  });
});

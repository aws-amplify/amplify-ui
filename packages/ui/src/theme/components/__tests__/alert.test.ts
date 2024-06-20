import { createComponentTheme, createTheme } from '../../createTheme';
import { AlertTheme } from '../alert';

const alertTheme = createComponentTheme<AlertTheme<true>>({
  name: 'alert',
  theme(tokens) {
    const {
      components: { alert },
    } = tokens;
    return {
      alignItems: alert.alignItems,
      backgroundColor: alert.backgroundColor,
      color: alert.color,
      _modifiers: {
        info: {
          color: alert.info.color,
          backgroundColor: alert.info.backgroundColor,
        },
        // Type error unless these are defined because they are in the alert theme definition
        // TODO: fill in these styles
        error: {},
        success: {},
        warning: {},
      },
      _element: {
        icon: {
          fontSize: alert.icon.size,
          lineHeight: 1,
        },
        heading: {
          display: 'block',
          fontSize: alert.heading.fontSize,
          fontWeight: alert.heading.fontSize,
        },
        body: {
          color: 'inherit',
          display: 'block',
        },
        dismiss: {
          color: 'inherit',
        },
      },
    };
  },
});

const { cssText } = createTheme({
  name: 'test',
  components: [alertTheme],
});

describe('@aws-amplify/ui', () => {
  describe('component themes', () => {
    describe('alert', () => {
      it('should have default values', () => {
        expect(cssText).toBeDefined();
      });
    });
  });
});

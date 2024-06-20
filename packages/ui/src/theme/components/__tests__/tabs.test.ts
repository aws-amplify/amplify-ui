import { createComponentTheme, createTheme } from '../../createTheme';
import { TabsTheme } from '../tabs';

const tabsTheme = createComponentTheme<TabsTheme<true>>({
  name: 'tabs',
  theme(tokens) {
    return {
      _element: {
        list: {
          _modifiers: {
            // equal: {},
            relative: {},
            top: {},
            bottom: {},
          },
        },
        panel: {
          _modifiers: {
            active: {},
          },
        },
        item: {
          _modifiers: {
            active: {},
          },
        },
      },
    };
  },
});

const { cssText } = createTheme({
  name: 'test',
  components: [tabsTheme],
});

describe('@aws-amplify/ui', () => {
  describe('component themes', () => {
    describe('tabs', () => {
      it('should have default values', () => {
        expect(cssText).toBeDefined();
      });
    });
  });
});

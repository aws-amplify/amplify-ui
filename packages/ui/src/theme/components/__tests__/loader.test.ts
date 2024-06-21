import { createComponentTheme, createTheme } from '../../createTheme';
import { LoaderTheme } from '../loader';

export const loaderTheme = createComponentTheme<LoaderTheme<true>>({
  name: 'loader',
  theme(tokens) {
    const {
      components: { loader },
    } = tokens;
    return {
      listStyleType: 'none',
      _modifiers: {
        large: {},
        small: {},
        linear: {},
        determinate: {},
      },
      _element: {
        label: {},
      },
    };
  },
});

const { cssText } = createTheme({
  name: 'test',
  components: [loaderTheme],
});

describe('@aws-amplify/ui', () => {
  describe('component themes', () => {
    describe('loader', () => {
      it('should have default values', () => {
        expect(cssText).toBeDefined();
      });
    });
  });
});

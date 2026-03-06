import { createTheme } from '../createTheme';
import { defineComponentTheme } from '../defineComponentTheme';

const theme = createTheme();
const customTheme = createTheme({
  name: 'test',
  tokens: {
    colors: {
      hotPink: {
        10: '#f90',
      },
    },
  },
});

describe('@aws-amplify/ui', () => {
  describe('defineComponentTheme', () => {
    it('should return a cssText function', () => {
      const testComponentTheme = defineComponentTheme({
        name: 'test',
        theme(tokens) {
          return {
            backgroundColor: 'pink',
            borderRadius: '{radii.small}',
            _modifiers: {
              small: {
                borderRadius: '0',
              },
            },
          };
        },
      });
      expect(testComponentTheme.cssText({ theme })).toMatchSnapshot();
    });

    it('should return a cssText function that works with custom tokens', () => {
      const testComponentTheme = defineComponentTheme({
        name: 'test',
        theme(tokens) {
          return {
            backgroundColor: tokens.colors.hotPink[10],
          };
        },
      });
      expect(
        testComponentTheme.cssText({ theme: customTheme })
      ).toMatchSnapshot();
    });
  });
});

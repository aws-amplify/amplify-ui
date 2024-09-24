import { createGlobalCSS } from '../createGlobalCSS';
import { createTheme } from '../createTheme';

const { tokens } = createTheme();

describe('@aws-amplify/ui', () => {
  describe('createGlobalCSS', () => {
    it('should work with regular styles', () => {
      expect(
        createGlobalCSS({
          '.foo': {
            backgroundColor: 'red',
          },
          'button > .icon': {
            color: 'blueviolet',
          },
        })
      ).toMatchSnapshot();
    });
    it('should handle psuedo-states', () => {
      expect(
        createGlobalCSS({
          '.bar': {
            backgroundColor: '#bada55',
            ':active': {
              backgroundColor: '#ff9900',
            },
          },
        })
      ).toMatchSnapshot();
    });
    it('should work with design tokens', () => {
      expect(
        createGlobalCSS({
          '.bar': {
            backgroundColor: tokens.colors.blue[20],
            ':active': {
              backgroundColor: tokens.colors.blue[40],
            },
          },
        })
      ).toMatchSnapshot();
    });
  });
});

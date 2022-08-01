import { pathToValue } from '../utils';
import { Theme } from '../types';

describe('@aws-amplify/ui', () => {
  describe('pathToValue', () => {
    const baseTheme: Theme = {
      name: 'baseTheme',
      tokens: {
        components: {
          button: {
            _hover: {
              color: { value: 'red' },
              backgroundColor: { value: 'blue' },
            },
            _focus: {
              color: { value: 'green' },
              backgroundColor: { value: '{colors.brand.primary.80}' },
            },
          },
        },
      },
    };

    it('should return the value of the given path', () => {
      const value = pathToValue(baseTheme, [
        'components',
        'button',
        '_hover',
        'color',
      ]);
      expect(value).toEqual({ value: 'red' });
    });

    it('should return undefined for incomplete paths', () => {
      const value = pathToValue(baseTheme, ['components', 'button', '_hover']);
      expect(value).toBeUndefined();
    });

    it('should return undefined for non existing paths', () => {
      const value = pathToValue(baseTheme, [
        'non-existent',
        'button',
        '_hover',
      ]);
      expect(value).toBeUndefined();
    });

    it('should return undefined for empty paths', () => {
      const value = pathToValue(baseTheme, []);
      expect(value).toBeUndefined();
    });
  });
});

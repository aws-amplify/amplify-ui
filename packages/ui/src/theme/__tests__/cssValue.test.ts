import { cssValue } from '../utils';

describe('@aws-amplify/ui', () => {
  describe('cssValue', () => {
    it('should pass through raw values', () => {
      expect(cssValue({ value: 'red' })).toEqual('red');
    });

    it('should turn references into CSS variables', () => {
      expect(cssValue({ value: '{colors.red.value}' })).toEqual(
        'var(--amplify-colors-red)'
      );
    });
  });
});

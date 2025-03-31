import { isCopyViewDisplayTextKey, isDeleteViewDisplayTextKey } from '../utils';

describe('display text utils', () => {
  describe('isCopyViewDisplayTextKey', () => {
    it('returns `true` when provided a valid key', () => {
      const output = isCopyViewDisplayTextKey('searchClearLabel');
      expect(output).toBe(true);
    });
    it('returns `false` when provided an invalid key', () => {
      const output = isCopyViewDisplayTextKey('invalid');
      expect(output).toBe(false);
    });
  });

  describe('isDeleteViewDisplayTextKey', () => {
    it('returns `true` when provided a valid key', () => {
      const output = isDeleteViewDisplayTextKey('statusDisplayCanceledLabel');
      expect(output).toBe(true);
    });
    it('returns `false` when provided an invalid key', () => {
      const output = isDeleteViewDisplayTextKey('invalid');
      expect(output).toBe(false);
    });
  });
});

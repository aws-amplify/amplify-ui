import { isCopyViewDisplayTextKey, isDeleteViewDisplayTextKey } from '../utils';

describe.skip('display text utils', () => {
  describe('isCopyViewDisplayTextKey', () => {
    it('returns `true` when provided `value` is a valid `CopyViewDisplayText` key', () => {
      const output = isCopyViewDisplayTextKey('fix_me');
      expect(output).toBe(true);
    });
  });

  describe('isDeleteViewDisplayTextKey', () => {
    it('returns `true` when provided `value` is a valid `DeleteViewDisplayText` key', () => {
      const output = isDeleteViewDisplayTextKey('fix_me');
      expect(output).toBe(true);
    });
  });
});

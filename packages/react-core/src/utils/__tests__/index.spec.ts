import { templateJoin } from '..';

describe('templateJoin', () => {
  it('returns the expected value', () => {
    const output = templateJoin(['one', 'two'], (value) => `^${value}^`);
    expect(output).toBe('^one^^two^');
  });
});

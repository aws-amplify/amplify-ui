import React from 'react';
import { MessageLayoutButtonModifier } from '../types';
import { getButtonModifier } from '../utils';

/**
 * Normally, we would mock out dependencies (tinycolor2) but this utility would be
 * trivial to test without it
 */
describe('getButtonModifier', () => {
  it('returns a dark button modifier', () => {
    const expected: MessageLayoutButtonModifier = 'dark';
    expect(getButtonModifier({ backgroundColor: 'black' })).toBe(expected);
  });

  it('returns a light button modifier', () => {
    const expected: MessageLayoutButtonModifier = 'light';
    expect(getButtonModifier({ backgroundColor: 'white' })).toBe(expected);
  });

  it('handles a missing background color', () => {
    let expected: MessageLayoutButtonModifier = 'light';
    // light by default
    expect(getButtonModifier({})).toBe(expected);
    expect(getButtonModifier(null as unknown as React.CSSProperties)).toBe(
      expected
    );
    expected = 'dark';
    // dark via default override
    expect(getButtonModifier({}, 'dark')).toBe(expected);
    expect(
      getButtonModifier(null as unknown as React.CSSProperties, 'dark')
    ).toBe(expected);
  });
});

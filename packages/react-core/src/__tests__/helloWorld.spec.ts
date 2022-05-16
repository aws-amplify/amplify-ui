import { helloWorld, useHelloWorld } from 'src/helloWorld';

import { renderHook } from '@testing-library/react-hooks';

const NAME = 'Chuck';

describe('helloWorld', () => {
  it('returns the expected output', () => {
    const output = helloWorld(NAME);
    expect(output).toBe(`Hello ${NAME}!`);
  });
});

describe('useHelloWorld', () => {
  it('returns the expected output', () => {
    const { result } = renderHook(() => useHelloWorld(NAME));
    const output = result.current();
    expect(output).toBe(`Hello ${NAME}!`);
  });
});

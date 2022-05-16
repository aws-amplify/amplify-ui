import { nestedHelloWorld } from './nested';

const NAME = 'Chuck';

describe('nestedHelloWorld', () => {
  it('returns the expected output', () => {
    const output = nestedHelloWorld(NAME);
    expect(output).toBe(`Hello ${NAME}!`);
  });
});

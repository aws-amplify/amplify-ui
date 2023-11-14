import { classNames } from '../classNames';

const falseyArray = [undefined, null, 0];

describe('classNames', () => {
  it('should work with objects that have truthy values', () => {
    expect(
      classNames({
        // truthy
        a: true,
        b: 1,
        c: 'string',

        // falsey
        d: false,
        e: null,
        f: undefined,
        g: 0,
      })
    ).toEqual('a b c');
  });

  it('should work with array arguments', () => {
    expect(classNames('a', 0, null, undefined, 7, 'c')).toEqual('a 7 c');
  });

  it('should work with nested arrays', () => {
    expect(classNames(['a', ['b', 'c', ...falseyArray]])).toEqual('a b c');
    expect(
      classNames(['a', ['b', 'c', ...falseyArray], ...falseyArray], 'd')
    ).toEqual('a b c d');
  });

  it('should work with an array of objects', () => {
    expect(classNames([{ a: true, b: false }, { c: true }])).toEqual('a c');

    expect(
      classNames([{ a: true, b: false }, { c: true }, ...falseyArray])
    ).toEqual('a c');
  });

  it('should work with .toString()', () => {
    const a = { toString: () => 'a' };
    expect(classNames(a, 'b')).toEqual('a b');
  });
});

import { resolveObject } from '../resolveObject';

describe('resolveObject', () => {
  it('should not mutate the original object', () => {
    const original = {
      test: '1',
      a: {
        b: {
          c: 1,
          d: '{e.f.g}',
        },
      },
      e: {
        f: {
          g: 2,
          h: '{a.b.c}',
        },
      },
      i: '{e.f.g}',
    };
    const test = resolveObject(original);
    expect(original).toHaveProperty('a.b.d', '{e.f.g}');
    expect(test).toHaveProperty('a.b.d', 2);
  });

  it('should do simple references', () => {
    const test = resolveObject({
      foo: 'bar',
      bar: '{foo}',
    });
    expect(test).toHaveProperty('bar', 'bar');
  });

  it('should do simple interpolation for both strings and numbers', () => {
    const test = resolveObject({
      a: 'test1 value',
      b: 123,
      c: '{a} text after',
      d: 'text before {a}',
      e: 'text before {a} text after',
      f: '{b} text after',
      g: 'text before {b}',
      h: 'text before {b} text after',
    });
    expect(test).toHaveProperty('c', 'test1 value text after');
    expect(test).toHaveProperty('d', 'text before test1 value');
    expect(test).toHaveProperty('e', 'text before test1 value text after');
    expect(test).toHaveProperty('f', '123 text after');
    expect(test).toHaveProperty('g', 'text before 123');
    expect(test).toHaveProperty('h', 'text before 123 text after');
  });

  it('should do nested references', () => {
    const obj = {
      test: '1',
      a: {
        b: {
          c: 1,
          d: '{e.f.g}',
        },
      },
      e: {
        f: {
          g: 2,
          h: '{a.b.c}',
        },
      },
      i: '{e.f.g}',
    };
    const test = resolveObject(obj);
    expect(test).toHaveProperty('i', 2);
    expect(test).toHaveProperty('a.b.d', 2);
    expect(test).toHaveProperty('e.f.h', 1);
  });

  it('should handle nested pointers', () => {
    const test = resolveObject({
      a: 1,
      b: '{a}',
      c: '{b}',
      d: '{e}',
      e: '{c}',
    });
    expect(test).toHaveProperty('b', 1);
    expect(test).toHaveProperty('c', 1);
  });

  it('should handle deep nested pointers', () => {
    const test = resolveObject({
      a: '{b}',
      b: '{c}',
      c: '{d}',
      d: '{e}',
      e: '{f}',
      f: '{g}',
      g: 1,
    });
    expect(test).toHaveProperty('a', 1);
    expect(test).toHaveProperty('b', 1);
    expect(test).toHaveProperty('c', 1);
    expect(test).toHaveProperty('d', 1);
    expect(test).toHaveProperty('e', 1);
    expect(test).toHaveProperty('f', 1);
    expect(test).toHaveProperty('g', 1);
  });

  it('should handle deep nested pointers with string interpolation', () => {
    const test = resolveObject({
      a: '{b} bar',
      b: '{c} baz',
      c: '{d} bla',
      d: '{e} boo',
      e: '{f} bae',
      f: '{g} bee',
      g: 'foo bon',
    });
    expect(test).toHaveProperty('a', 'foo bon bee bae boo bla baz bar');
    expect(test).toHaveProperty('b', 'foo bon bee bae boo bla baz');
    expect(test).toHaveProperty('c', 'foo bon bee bae boo bla');
    expect(test).toHaveProperty('d', 'foo bon bee bae boo');
    expect(test).toHaveProperty('e', 'foo bon bee bae');
    expect(test).toHaveProperty('f', 'foo bon bee');
    expect(test).toHaveProperty('g', 'foo bon');
  });

  it('should handle deep nested pointers and nested references', () => {
    const test = resolveObject({
      a: {
        a: {
          a: '{b.b.b}',
        },
      },
      b: {
        b: {
          b: '{c.c.c}',
        },
      },
      c: {
        c: {
          c: '{d.d.d}',
        },
      },
      d: {
        d: {
          d: '{e.e.e}',
        },
      },
      e: {
        e: {
          e: '{f.f.f}',
        },
      },
      f: {
        f: {
          f: '{g.g.g}',
        },
      },
      g: {
        g: {
          g: 1,
        },
      },
    });
    expect(test).toHaveProperty('a.a.a', 1);
    expect(test).toHaveProperty('b.b.b', 1);
    expect(test).toHaveProperty('c.c.c', 1);
    expect(test).toHaveProperty('d.d.d', 1);
    expect(test).toHaveProperty('e.e.e', 1);
    expect(test).toHaveProperty('f.f.f', 1);
    expect(test).toHaveProperty('g.g.g', 1);
  });

  it('should keep the type of the referenced property', () => {
    const referenceType = {
      a: 1,
      b: {
        c: 2,
      },
      d: '{a}',
      e: '{b}',
      f: [1, 2, 3],
      g: '{f}',
    };
    const test = resolveObject<typeof referenceType>(referenceType);
    expect(test).toHaveProperty('d', 1);
    expect(typeof test.d).toBe('number');
    expect(typeof test.e).toBe('object');
    expect(Array.isArray(test.f)).toBeTruthy();
    expect(test).toHaveProperty('e.c', 2);
  });

  it('should handle and evaluate items in an array', () => {
    const withArray = {
      a: 1,
      b: {
        c: 2,
      },
      d: ['{b.c}', '{a}'],
      e: [
        {
          a: '{a}',
        },
        {
          a: '{b.c}',
        },
      ],
    };
    const test = resolveObject<typeof withArray>(withArray);
    expect(test.d[0]).toBe(2);
    expect(test.d[1]).toBe(1);
    expect(test.e[0].a).toBe(1);
    expect(test.e[1].a).toBe(2);
  });

  it('should correctly replace multiple references without reference errors', function () {
    const obj = resolveObject({
      prop1: { value: 'test1 value' },
      prop2: { value: 'test2 value' },
      prop3: { value: '{prop1.value}' },
      prop4: { value: '{prop3.value}' },
      prop5: { value: 5 },
      prop6: { value: 6 },
      prop7: { value: '{prop5.value}' },
      prop8: { value: '{prop7.value}' },
      prop12: { value: '{prop1.value}, {prop2.value} and some extra stuff' },
      prop124: { value: '{prop1.value}, {prop2.value} and {prop4.value}' },
      prop15: { value: '{prop1.value}, {prop5.value} and some extra stuff' },
      prop156: { value: '{prop1.value}, {prop5.value} and {prop6.value}' },
      prop1568: {
        value: '{prop1.value}, {prop5.value}, {prop6.value} and {prop8.value}',
      },
    });
    expect(JSON.stringify(obj)).toBe(
      JSON.stringify({
        prop1: { value: 'test1 value' },
        prop2: { value: 'test2 value' },
        prop3: { value: 'test1 value' },
        prop4: { value: 'test1 value' },
        prop5: { value: 5 },
        prop6: { value: 6 },
        prop7: { value: 5 },
        prop8: { value: 5 },
        prop12: { value: 'test1 value, test2 value and some extra stuff' },
        prop124: { value: 'test1 value, test2 value and test1 value' },
        prop15: { value: 'test1 value, 5 and some extra stuff' },
        prop156: { value: 'test1 value, 5 and 6' },
        prop1568: { value: 'test1 value, 5, 6 and 5' },
      })
    );
  });

  it('should handle spaces', () => {
    const withSpaces = {
      foo: { value: 'bar' },
      bar: { value: '{ foo.value }' },
    };
    const test = resolveObject<typeof withSpaces>(withSpaces);
    expect(test).toHaveProperty('foo.value', test.bar.value);
  });

  it('should handle 0', () => {
    const withZero = {
      test: { value: '{zero.value}' },
      zero: { value: 0 },
    };
    const test = resolveObject<typeof withZero>(withZero);
    expect(test.test.value).toBe(0);
  });
});

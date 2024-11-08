import {
  isFile,
  getPercentValue,
  resolveClassName,
  compareStrings,
  compareNumbers,
  compareDates,
} from '../utils';

describe('view utils', () => {
  it('uses isFile util to discern between files and folders', () => {
    const file = new File(['file contents'], 'test file', {
      type: 'text/plain',
    });
    const folder = new File([], 'test folder');

    expect(isFile(file)).toBe(true);
    expect(isFile(folder)).toBe(false);
  });

  it('uses getPercentValue util to calculate the percentage of a number', () => {
    expect(getPercentValue(0.01)).toBe(1);
    expect(getPercentValue(0.5)).toBe(50);
    expect(getPercentValue(1)).toBe(100);
  });

  it('uses resolveClassName util to resolve a className', () => {
    const stringClassName = 'test-class';
    const resolvedStringClassName = resolveClassName(
      'default',
      stringClassName
    );

    expect(resolvedStringClassName).toBe('default test-class');

    const functionClassName = () => 'test-class';
    const resolvedFunctionClassName = resolveClassName(
      'default',
      functionClassName
    );

    expect(resolvedFunctionClassName).toBe('test-class');
  });

  it('uses compareStrings to determine how to sort strings', () => {
    const a = 'a';
    const b = 'b';

    expect(compareStrings(a, b)).toBe(-1);
    expect(compareStrings(b, a)).toBe(1);
    expect(compareStrings(a, a)).toBe(0);
  });

  it('uses compareNumbers to determine how to sort numbers', () => {
    const a = 1;
    const b = 2;

    expect(compareNumbers(a, b)).toBe(-1);
    expect(compareNumbers(b, a)).toBe(1);
    expect(compareNumbers(a, a)).toBe(0);
  });

  it('uses compareDates to determine difference between dates', () => {
    const a = new Date('2020-01-02');
    const b = new Date('2020-01-01');

    const oneDayInMilliseconds = 864e5;

    expect(compareDates(undefined, b)).toBe(1);
    expect(compareDates(a, undefined)).toBe(-1);
    expect(compareDates(a, b)).toBe(oneDayInMilliseconds);
  });
});
